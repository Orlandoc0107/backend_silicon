const express = require('express')
const morgan = require('morgan')
const http = require('node:http')
const path = require('node:path')
const cookieParser = require('cookie-parser')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = require('./config/swaggerOptions.js');
const swaggerDocs = swaggerJsdoc(swaggerOptions)
const dotenv = require('dotenv')
const testRouter = require('./routes/prueba')

dotenv.config()


const app = express()
app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs')
// midleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("trust proxy", true)

// Configurar EJS como motor de plantillas
app.use('/api-docs', swaggerUi.serve,
    swaggerUi.setup(swaggerDocs));
app.use('/', testRouter)
// Ruta base
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!'); // Mensaje simple para la ruta base
});
// Rutas


app.use((err, req, res , next)=> {
    console.log(err.stack);
    res.status(500).send('Algo salio mal')
})

console.log('Directorio actual:', __dirname);
console.log('Archivo actual:', __filename);

module.exports =  app;