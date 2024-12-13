const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (payload) => {
    const tokenPayload = {
        id: payload.id,
        email: payload.email
    };

    return jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { generateToken };
