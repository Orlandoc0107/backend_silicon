/*se encarga de verificar que el usuario esté autenticado mediante un token JWT. 
Si no hay token o el token es inválido, deniega el acceso.*/

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticate = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: 'No autenticado' });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.id = decoded.id;  // El id es extraído del token
        next(); // Si todo está bien, pasa al siguiente middleware o ruta
    });
};

module.exports = authenticate;
