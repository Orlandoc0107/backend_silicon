const MyPool = require('../config/connectionPostgres');

// ver todos los usuarios

const getAllUser = async (req, res) => {
    try {
        const users = await MyPool.query('SELECT * FROM usuarios');
        res.json(users.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

// ver usuario por ID

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        // Consulta para obtener el usuario, su carrito, órdenes y items de orden
        const userQuery = `
            SELECT u.*, 
                   c.id AS carrito_id, 
                   c.estado AS carrito_estado, 
                   c.fecha_actualizacion AS carrito_fecha,
                   o.id AS orden_id,
                   o.fecha_creacion AS orden_fecha,
                   o.estado AS orden_estado,
                   o.precio_total AS orden_precio_total,
                   oi.id AS item_id,
                   oi.cantidad AS item_cantidad,
                   oi.precio_unitario AS item_precio_unitario,
                   oi.preciototal AS item_precio_total,
                   p.nombre AS producto_nombre
            FROM usuarios u
            LEFT JOIN carrito c ON u.id = c.usuario_id
            LEFT JOIN orders o ON u.id = o.usuario_id
            LEFT JOIN orderItem oi ON o.id = oi.order_id
            LEFT JOIN productos p ON oi.producto_id = p.id
            WHERE u.id = $1
        `;

        const result = await MyPool.query(userQuery, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = result.rows[0];

        // Agrupar los datos de la respuesta
        const userDetails = {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
            estado: user.estado,
            carrito: {
                id: user.carrito_id,
                estado: user.carrito_estado,
                fecha_actualizacion: user.carrito_fecha,
                items: []
            },
            ordenes: []
        };

        // Agrupar órdenes y items
        result.rows.forEach(row => {
            // Si tiene una orden, agregarla
            if (row.orden_id && !userDetails.ordenes.some(order => order.id === row.orden_id)) {
                userDetails.ordenes.push({
                    id: row.orden_id,
                    fecha_creacion: row.orden_fecha,
                    estado: row.orden_estado,
                    precio_total: row.orden_precio_total,
                    items: []
                });
            }

            // Si tiene un item de orden, agregarlo a la orden correspondiente
            if (row.item_id) {
                const order = userDetails.ordenes.find(order => order.id === row.orden_id);
                if (order) {
                    order.items.push({
                        id: row.item_id,
                        cantidad: row.item_cantidad,
                        precio_unitario: row.item_precio_unitario,
                        preciototal: row.item_precio_total,
                        producto: row.producto_nombre
                    });
                }
            }

            // Si tiene un carrito, agregar el item
            if (row.carrito_id && !userDetails.carrito.items.some(item => item.producto === row.producto_nombre)) {
                userDetails.carrito.items.push({
                    producto: row.producto_nombre,
                    cantidad: row.item_cantidad,
                    precio_unitario: row.item_precio_unitario,
                    preciototal: row.item_precio_total
                });
            }
        });

        res.json(userDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los detalles del usuario' });
    }
};

module.exports = { getAllUser, getUserById };
