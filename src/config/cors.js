const corsOptions = {
    origin: [
        'http://localhost:8080'

    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Permitir el envío de cookies
    optionsSuccessStatus: 204, // Responde rápido a las solicitudes OPTIONS
    preflightContinue: false,
};

module.exports = corsOptions;