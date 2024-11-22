const MyPool = require('../config/connectionPostgres');

const crearOrden = async (req, res) => {
    const idUser = req.id;  // ID del usuario autenticado
    const carrito_id = req.params.id; // ID del carrito
    const { payment_id } = req.body;  // ID del pago

    try {
        // 1. Verificar que el carrito esté abierto
        const carritoQuery = await MyPool.query(
            `SELECT id, estado FROM carrito WHERE usuario_id = $1 AND estado = 'en_espera'`,
            [idUser]
        );
        const carrito = carritoQuery.rows[0];

        if (!carrito) {
            return res.status(400).json({ error: 'No tienes un carrito abierto o válido' });
        }

        // 2. Comprobar stock de los productos en el carrito
        const itemsCarrito = await MyPool.query(
            `SELECT oi.producto_id, oi.cantidad, p.stock
             FROM orderItem oi
             JOIN productos p ON p.id = oi.producto_id
             WHERE oi.carrito_id = $1`,
            [carrito.id]
        );

        for (const item of itemsCarrito.rows) {
            if (item.cantidad > item.stock) {
                return res.status(400).json({ 
                    error: `No hay suficiente stock para el producto ${item.producto_id}` 
                });
            }
        }

        // 3. Crear la orden
        const ordenQuery = await MyPool.query(
            `INSERT INTO orders (usuario_id, payment_id, estado, precio_total) 
             VALUES ($1, $2, 'pendiente', 
                 (SELECT SUM(preciototal) FROM orderItem WHERE carrito_id = $3)) 
             RETURNING id`,
            [idUser, payment_id, carrito.id]
        );

        const order_id = ordenQuery.rows[0].id;

        // 4. Actualizar los items del carrito y asociarlos con la nueva orden
        await MyPool.query(
            `UPDATE orderItem 
             SET order_id = $1 
             WHERE carrito_id = $2`,
            [order_id, carrito.id]
        );

        // 5. Actualizar el estado del carrito a "cerrado" después de crear la orden
        await MyPool.query(
            `UPDATE carrito SET estado = 'cerrado' WHERE id = $1`,
            [carrito.id]
        );

        // 6. Actualizar el stock de los productos después de la compra
        for (const item of itemsCarrito.rows) {
            await MyPool.query(
                `UPDATE productos SET stock = stock - $1 WHERE id = $2`,
                [item.cantidad, item.producto_id]
            );
        }

        // 7. Generar el recibo (puedes generar un recibo en formato PDF, o devolver un JSON con los detalles)
        const recibo = {
            orden_id: order_id,
            usuario_id: idUser,
            productos: itemsCarrito.rows,
            total: itemsCarrito.rows.reduce((sum, item) => sum + item.precio_unitario * item.cantidad, 0),
            estado: 'pendiente',
            fecha: new Date()
        };

        res.status(200).json({ 
            message: 'Orden creada exitosamente',
            recibo 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la orden' });
    }
};

module.exports = { crearOrden };