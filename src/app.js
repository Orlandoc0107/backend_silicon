const express = require('express')
const morgan = require('morgan')
const path = require('node:path')
const cookieParser = require('cookie-parser')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = require('./config/swaggerOptions.js');
const swaggerDocs = swaggerJsdoc(swaggerOptions)
const dotenv = require('dotenv')
const testRouter = require('./routes/prueba.routes.js')
const cors = require('cors')
const corsOptions = require('./config/cors.js')

dotenv.config()


const app = express();
// Middleware de CORS
app.use(cors(corsOptions));
// Configuración del motor de vistas
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')
// midleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("trust proxy", true)
// Rutas
app.get('/', (req, res) => {
	res.render('index') // Renderiza el archivo index.ejs
})
app.use('/doc', swaggerUi.serve,
    swaggerUi.setup(swaggerDocs));
app.use('/test', testRouter)
// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Loguea el error en la consola
    res.status(500).send('Algo salió mal'); // Mensaje de error genérico
});
// Manejo de errores 404
app.use((req, res) => {
    res.status(404).send('No encontrado'); // Mensaje para rutas no encontradas
});

module.exports =  app;