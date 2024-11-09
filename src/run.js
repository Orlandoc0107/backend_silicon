const app = require('./app');
const figlet = require('figlet');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const PORT = process.env.PORT;

// Configura el puerto en tu aplicación Express
app.set('port', PORT);

// Usar figlet para mostrar el mensaje en ASCII cuando se arranca el servidor
figlet(' BackEnd Silicon M.', (err, data) => {
    if (err) {
        console.log('Error al generar el arte ASCII:', err);
        return;
    }
    console.log(data);  // Imprime el arte ASCII en la consola
});

// Iniciar el servidor Express
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});
