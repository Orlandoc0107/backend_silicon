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
    const { id_usuario } = req.params;
    try {
        const user = await MyPool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        if (user.rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

module.exports = { getAllUser, getUserById };
