const dotenv = require('dotenv');
dotenv.config('./.env');

const swaggerOptions = {
    definition:{
    openapi: '3.0.0', // Asegúrate de que esta línea esté presente
    info: {
      title: 'Backend Silicon',
      version: '1.0.0',
      description: 'Project API documentation',
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:8080', // Usa variable de entorno si está disponible
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerOptions;
