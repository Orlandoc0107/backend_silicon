const dotenv = require('dotenv');
dotenv.config('./.env');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Asegúrate de que esta línea esté presente
    info: {
      title: 'Backend Silicon',
      version: '1.0.0',
      description: 'Project API documentation',
    },
    externalDocs: {
      description: 'Descargar colección de Postman',
      url: `${process.env.BASE_URL || 'http://localhost:8080'}/auth/download/postman-collection`,
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:8080', // Usa variable de entorno si está disponible
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie', // Especifica que la autenticación se realiza a través de cookies
          name: 'authToken', // Nombre de la cookie que contiene el token
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Rutas donde se encuentran tus archivos de documentación
};

module.exports = swaggerOptions;
