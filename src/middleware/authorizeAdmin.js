const jwt = require('jsonwebtoken');
const MyPool = require('../config/connectionPostgres.js');
const dotenv = require('dotenv');
dotenv.config()

const authorizeAdmin = (req, res, next) => {
    const token = req.cookies.authToken;

    // Verificar si el token existe
    if (!token) {
        return res.status(401).json({ error: 'No autenticado' });
    }

    // Verificar el token
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        
        // Guardamos la información decodificada del token en req.user
        req.user = decoded;

        // Verificar si el rol del usuario es 'Admin'
        if (!req.user || req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Acceso denegado, se requiere rol de administrador' });
        }

        req.id = decoded.id
        next();
    });
};

module.exports = authorizeAdmin