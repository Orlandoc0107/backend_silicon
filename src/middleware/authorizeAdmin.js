// Middleware para verificar que el usuario tenga el rol de Administrador (Admin).
const jwt = require('jsonwebtoken');
const MyPool = require('../config/connectionPostgres.js');
const dotenv = require('dotenv');
dotenv.config();

const authorizeAdmin = (req, res, next) => {
    const token = req.cookies.authToken;

    // Verificar si el token existe
    if (!token) {
        return res.status(401).json({ error: 'No autenticado: Token no encontrado' });
    }

    // Verificar el token
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido o expirado' });
        }

        // Guardamos la información decodificada del token en req.user
        req.user = decoded;

        // Verificar si el rol del usuario es 'Admin' en la base de datos
        try {
            const query = 'SELECT rol FROM usuarios WHERE id = $1';
            const result = await MyPool.query(query, [req.user.id]);

            if (result.rows.length > 0 && result.rows[0].rol === 'Admin') {
                // Si el rol es Admin, permite el acceso
                next();
            } else {
                return res.status(403).json({ error: 'Acceso denegado: Se requiere rol de administrador' });
            }
        } catch (error) {
            console.error('Error al verificar el rol en la base de datos:', error);
            return res.status(500).json({ error: 'Error al verificar el rol en la base de datos' });
        }
    });
};

module.exports = authorizeAdmin;
