const MyPool = require('../config/connectionPostgres');

const addProductCarrito = async (req, res) => {
    const idUser = req.id;
    const producto_id = req.params.id; // ID del producto desde la URL
    const { cantidad } = req.body; // Cantidad de producto a agregar

    try {
        await MyPool.query('BEGIN'); // Inicia la transacción

        // Comprobar si el usuario tiene un carrito abierto (estado = 'en_espera')
        let carritoQuery = await MyPool.query(
            `SELECT id FROM carrito WHERE usuario_id = $1 AND estado = 'en_espera'`,
            [idUser]
        );

        let carrito = carritoQuery.rows[0];

        if (!carrito) {
            // Si no tiene un carrito, crea uno
            const newCarrito = await MyPool.query(
                `INSERT INTO carrito (usuario_id, estado) VALUES ($1, 'en_espera') RETURNING id`,
                [idUser]
            );

            carrito = newCarrito.rows[0];
        }

        const carrito_id = carrito.id;

        // Comprobamos si el producto ya está en el carrito del usuario
        const itemQuery = await MyPool.query(
            `SELECT cantidad FROM orderItem WHERE carrito_id = $1 AND producto_id = $2`,
            [carrito_id, producto_id]
        );

        const item = itemQuery.rows[0];

        if (item) {
            // Si el producto ya está en el carrito, incrementa la cantidad
            await MyPool.query(
                `UPDATE orderItem SET cantidad = cantidad + $1 WHERE carrito_id = $2 AND producto_id = $3`,
                [cantidad, carrito_id, producto_id]
            );
        } else {
            // Si el producto no está en el carrito, lo inserta
            const productoData = await MyPool.query(
                `SELECT precio FROM productos WHERE id = $1`,
                [producto_id]
            );
            const precio_unitario = productoData.rows[0].precio;

            await MyPool.query(
                `INSERT INTO orderItem (carrito_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)`,
                [carrito_id, producto_id, cantidad, precio_unitario]
            );
        }

        // Actualiza el stock en la tabla de productos
        await MyPool.query(
            `UPDATE productos SET stock = stock - $1 WHERE id = $2`,
            [cantidad, producto_id]
        );

        await MyPool.query('COMMIT'); // Confirma la transacción

        res.status(200).json({ message: 'Producto agregado al carrito exitosamente' });
    } catch (error) {
        await MyPool.query('ROLLBACK'); // Revierte la transacción en caso de error
        console.error(error);
        res.status(500).json({ error: 'Error al agregar producto al carrito' });
    }
};


// Función para ver el carrito de un usuario
async function verCarrito(req, res) {
    const idUser = req.id;

    try {
        // Obtener la ID del carrito del usuario
        const carritoQuery = await MyPool.query(
            `SELECT id FROM carrito WHERE usuario_id = $1 AND estado = 'en_espera'`,
            [idUser]
        );

        // Si no existe un carrito en espera, retornar un error
        const carrito = carritoQuery.rows[0];
        if (!carrito) {
            return res.status(400).json({ error: 'No tienes un carrito abierto en espera' });
        }

        const carritoId = carrito.id;

        // Obtener los productos en el carrito
        const itemsQuery = await MyPool.query(
            `SELECT oi.producto_id, p.nombre, oi.cantidad, oi.precio_unitario, oi.preciototal
             FROM orderItem oi
             JOIN productos p ON oi.producto_id = p.id
             WHERE oi.carrito_id = $1`,
            [carritoId]
        );

        const items = itemsQuery.rows;

        // Calcular el total del carrito
        const totalQuery = await MyPool.query(
            `SELECT SUM(preciototal) as total FROM orderItem WHERE carrito_id = $1`,
            [carritoId]
        );
        const total = totalQuery.rows[0].total || 0;

        // Retornar la información del carrito con la ID incluida
        res.json({
            carritoId,
            items,
            total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
}


// Función para quitar un producto del carrito
async function quitarProducto(req, res) {
    const idUser = req.id; // ID del usuario
    const producto_id = req.params.id; // ID del producto desde los parámetros
    const { cantidad } = req.body; // Cantidad a eliminar

    try {
        // Verificar si el producto está en el carrito y obtener la cantidad actual
        const itemQuery = await MyPool.query(
            `SELECT cantidad FROM orderItem WHERE carrito_id = (SELECT id FROM carrito WHERE usuario_id = $1) AND producto_id = $2`,
            [idUser, producto_id]
        );

        const item = itemQuery.rows[0];
        if (!item) {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        }

        // Verificar si la cantidad solicitada a quitar es válida
        if (cantidad <= 0 || cantidad > item.cantidad) {
            return res.status(400).json({ error: 'Cantidad no válida para eliminar' });
        }

        await MyPool.query('BEGIN');

        // Si se quita toda la cantidad del producto, eliminar el registro del carrito
        if (cantidad === item.cantidad) {
            await MyPool.query(
                `DELETE FROM orderItem WHERE carrito_id = (SELECT id FROM carrito WHERE usuario_id = $1) AND producto_id = $2`,
                [idUser, producto_id]
            );
        } else {
            // Si solo se quita una parte, actualizar la cantidad en el carrito
            await MyPool.query(
                `UPDATE orderItem SET cantidad = cantidad - $1 WHERE carrito_id = (SELECT id FROM carrito WHERE usuario_id = $2) AND producto_id = $3`,
                [cantidad, idUser, producto_id]
            );
        }

        // Ajustar el stock del producto
        await MyPool.query(
            'UPDATE productos SET stock = stock + $1 WHERE id = $2',
            [cantidad, producto_id]
        );

        await MyPool.query('COMMIT');

        res.status(200).json({ message: 'Cantidad actualizada en el carrito' });
    } catch (error) {
        await MyPool.query('ROLLBACK');
        res.status(500).json({ error: 'Error al actualizar cantidad en el carrito' });
    }
}

module.exports = { addProductCarrito, verCarrito, quitarProducto };