const express = require('express')
const morgan = require('morgan')
const path = require('node:path')
const cookieParser = require('cookie-parser')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = require('./config/swaggerOptions.js');
const swaggerDocs = swaggerJsdoc(swaggerOptions)
const dotenv = require('dotenv')
const cors = require('cors')
const corsOptions = require('./config/cors.js')
const CreateTables = require('./sql/scriptBD.js')
const authRouter = require('./routes/auth.routes.js')
const adminRoutes = require('./routes/admin.routes.js');
const userRoutes = require('./routes/user.routes.js');
const productRoutes = require('./routes/product.routes.js');
const carritoRoutes = require('./routes/carrito.routes.js');
const RegisterAdmin = require('./sql/admin.js')
const ordenRoutes = require('./routes/orden.routes.js')

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
// ConectionBD()
CreateTables()
RegisterAdmin()
// Rutas

app.get('/', (req, res) => { res.render('index') })
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs,
    {
        swaggerOptions: {
            // Permitir la descarga de la colección de Postman
            defaultModels: false,
            docExpansion: 'none', // Opcional: controla cómo se expanden los modelos
            tagsSorter: 'alpha', // Opcional: ordenar etiquetas alfabéticamente
            operationsSorter: 'alpha', // Opcional: ordenar operaciones alfabéticamente
        },
    }
));

// Rutas de autenticación
app.use('/auth', authRouter);
// Rutas de usuarios
app.use('/user', userRoutes);
// Rutas de administración de usuarios
app.use('/admin', adminRoutes);
// Rutas de productos
app.use('/productos', productRoutes);
// Rutas del carrito de compras
app.use('/carrito', carritoRoutes);
// Rutas de ordenes
app.use('/orden', ordenRoutes);

// Manejo de errores (500 - Server Error)
app.use((err, req, res, next) => {
    console.error(err.stack); // Loguea el error en la consola
    res.status(500).send('Algo salió mal'); // Mensaje de error genérico
});
// Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
});


module.exports = app;



