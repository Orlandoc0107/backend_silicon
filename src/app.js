const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./config/swaggerOptions');
const dotenv = require('dotenv')
dotenv.config()


const app = express()
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// midleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("trust proxy", true)
const TestRouter = require('./routes/prueba.route')

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Ruta base
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!'); // Mensaje simple para la ruta base
});
// Rutas
app.use('/test', TestRouter)

app.use((err, req, res , next)=> {
    console.log(err.stack);
    res.status(500).send('Algo salio mal')
})

console.log('Directorio actual:', __dirname);
console.log('Archivo actual:', __filename);

module.exports =  app;