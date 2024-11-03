const jwt = require('jsonwebtoken');
const MyPool = require('../config/connectionPostgres.js');
const dotenv = require('dotenv');
dotenv.config()

const authenticate = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: 'No autenticado' });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.id = decoded.id
        next(); // Si prefieres continuar al siguiente middleware/ruta
    });
};

module.exports = authenticate;