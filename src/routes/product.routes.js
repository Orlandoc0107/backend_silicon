// routes/productRoutes.js
const express = require('express');
const { createProduct, updateProduct, getAllProducts, getProductById, deleteProducto, getAllCategories, getProductsByCategory } = require('../controllers/product.controllers');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const validation = require('../middleware/valitation');
const {schemaProduct_Create, schemaProduct_Update} = require('../schemas/zod');
const router = express.Router();


// Rutas para productos
// solo los admins pueden crear, actualizar y eliminar
/**
 * @swagger
 * /productos/categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     description: Retorna una lista de todas las categorías existentes en la base de datos.
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID único de la categoría
 *                     example: "3f69fe12-5b9c-4a65-a8bc-cf4c0a5ef72c"
 *                   nombre:
 *                     type: string
 *                     description: Nombre de la categoría
 *                     example: "Ropa Deportiva"
 *       500:
 *         description: Error al obtener las categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Error al obtener las categorías"
 */
router.get('/categorias', getAllCategories)
/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Crea un nuevo producto en la base de datos. Si la categoría especificada no existe, se crea una nueva categoría.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto
 *                 example: "Camiseta deportiva"
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto
 *                 example: "Camiseta de algodón para actividades deportivas"
 *               precio:
 *                 type: number
 *                 format: float
 *                 description: Precio del producto
 *                 example: 29.99
 *               stock:
 *                 type: integer
 *                 description: Cantidad de unidades en stock
 *                 example: 150
 *               tipo:
 *                 type: string
 *                 description: Nombre de la categoría del producto
 *                 example: "Ropa Deportiva"
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID único del producto
 *                   example: "f4a74d9b-12a5-4b0d-a67d-e3a87c2f5f43"
 *                 categorias_id:
 *                   type: string
 *                   description: ID de la categoría del producto
 *                   example: "c3f69fe2-9b6c-4f3c-8b9c-af4f0c72c0f5"
 *                 nombre:
 *                   type: string
 *                   description: Nombre del producto
 *                   example: "Camiseta deportiva"
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del producto
 *                   example: "Camiseta de algodón para actividades deportivas"
 *                 precio:
 *                   type: number
 *                   format: float
 *                   description: Precio del producto
 *                   example: 29.99
 *                 stock:
 *                   type: integer
 *                   description: Cantidad de unidades en stock
 *                   example: 150
 *       500:
 *         description: Error al crear el producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al crear el nuevo producto"
 */
router.post('/', authorizeAdmin, validation(schemaProduct_Create) , createProduct); 

/**
 * @swagger
 * /productos/{id}:
 *   patch:
 *     summary: Actualiza parcialmente un producto por ID
 *     description: Actualiza los campos de un producto si existe. Los campos `nombre`, `descripcion`, `precio`, `stock`, y `tipo` (categoría) son opcionales.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID del producto a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto (opcional)
 *                 example: "Nombre actualizado"
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto (opcional)
 *                 example: "Descripción actualizada"
 *               precio:
 *                 type: number
 *                 description: Precio del producto (opcional)
 *                 example: 100.00
 *               stock:
 *                 type: integer
 *                 description: Cantidad en stock (opcional)
 *                 example: 20
 *               tipo:
 *                 type: string
 *                 description: Nombre de la categoría del producto. Si no existe, se creará una nueva categoría.
 *                 example: "Electrónica"
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto:
 *                   type: integer
 *                   description: ID del producto
 *                 nombre:
 *                   type: string
 *                   description: Nombre actualizado del producto
 *                 descripcion:
 *                   type: string
 *                   description: Descripción actualizada
 *                 precio:
 *                   type: number
 *                   description: Precio actualizado
 *                 stock:
 *                   type: integer
 *                   description: Stock actualizado
 *                 categorias_id:
 *                   type: integer
 *                   description: ID de la categoría del producto
 *       400:
 *         description: No se proporcionaron campos para actualizar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se proporcionaron campos para actualizar"
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto no encontrado"
 *       500:
 *         description: Error en el servidor al actualizar el producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar el producto"
 *                 error:
 *                   type: string
 *                   description: Detalle del error
 */
router.patch('/:id', authorizeAdmin, validation(schemaProduct_Update) , updateProduct);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID
 *     description: Elimina un producto de la base de datos si existe.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID del producto a eliminar.
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto eliminado correctamente."
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto no encontrado."
 *       500:
 *         description: Error al eliminar el producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al eliminar el producto."
 *                 error:
 *                   type: string
 *                   description: Detalle del error.
 */
router.delete('/:id', authorizeAdmin, deleteProducto); 

// las rutas de consulta no requiere permisos de administrador, es accesible para todos.
/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtiene una lista de productos con paginación
 *     description: Retorna una lista de productos con su información, incluyendo la categoría asociada si existe. Permite controlar la cantidad de productos devueltos por página.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de la página que deseas ver (por defecto 1).
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de productos por página (por defecto 20).
 *         example: 10
 *     responses:
 *       200:
 *         description: Lista de productos paginada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   description: Página actual.
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   description: Límite de productos por página.
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   description: Total de páginas disponibles.
 *                   example: 5
 *                 totalCount:
 *                   type: integer
 *                   description: Total de productos en la base de datos.
 *                   example: 50
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_producto:
 *                         type: string
 *                         format: uuid
 *                         description: ID único del producto.
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       nombre:
 *                         type: string
 *                         description: Nombre del producto.
 *                         example: "Producto 1"
 *                       descripcion:
 *                         type: string
 *                         description: Descripción del producto.
 *                         example: "Descripción del producto 1"
 *                       precio:
 *                         type: number
 *                         description: Precio del producto.
 *                         example: 100.50
 *                       stock:
 *                         type: integer
 *                         description: Cantidad disponible en inventario.
 *                         example: 25
 *                       id_categoria:
 *                         type: string
 *                         format: uuid
 *                         description: ID de la categoría asociada al producto.
 *                         example: "223e4567-e89b-12d3-a456-426614174001"
 *                       categoria:
 *                         type: string
 *                         description: Nombre de la categoría del producto.
 *                         example: "Electrónica"
 *       400:
 *         description: Parámetros de solicitud no válidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Parámetros de solicitud no válidos."
 *       500:
 *         description: Error interno del servidor al obtener los productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al ver los productos."
 *                 error:
 *                   type: string
 *                   description: Detalle del error.
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtiene un producto específico por su ID
 *     description: Retorna la información de un producto incluyendo la categoría a la que pertenece.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID del producto a obtener.
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Información detallada del producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto:
 *                   type: string
 *                   format: uuid
 *                   description: ID único del producto.
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 nombre:
 *                   type: string
 *                   description: Nombre del producto.
 *                   example: "Producto 1"
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del producto.
 *                   example: "Descripción del producto 1"
 *                 precio:
 *                   type: number
 *                   description: Precio del producto.
 *                   example: 100.50
 *                 stock:
 *                   type: integer
 *                   description: Cantidad en inventario.
 *                   example: 25
 *                 id_categoria:
 *                   type: string
 *                   format: uuid
 *                   description: ID de la categoría asociada.
 *                   example: "223e4567-e89b-12d3-a456-426614174001"
 *                 categoria:
 *                   type: string
 *                   description: Nombre de la categoría del producto.
 *                   example: "Electrónica"
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto no encontrado."
 *       500:
 *         description: Error al obtener el producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se pudo encontrar el producto."
 *                 error:
 *                   type: string
 *                   description: Detalle del error.
 */
router.get('/:id', getProductById);               

/**
 * @swagger
 * /productos/categorias/{nombre}:
 *   get:
 *     summary: Obtener productos por categoría
 *     description: Retorna una lista de productos asociados a una categoría específica.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la categoría
 *     responses:
 *       200:
 *         description: Lista de productos de la categoría especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID único del producto
 *                     example: "4a7d2e84-59e2-4d7d-a5bc-e3c34a0f68e4"
 *                   nombre:
 *                     type: string
 *                     description: Nombre del producto
 *                     example: "Camiseta de fútbol"
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del producto
 *                     example: "Camiseta deportiva de algodón"
 *                   precio:
 *                     type: number
 *                     format: float
 *                     description: Precio del producto
 *                     example: 25.99
 *                   stock:
 *                     type: integer
 *                     description: Stock del producto
 *                     example: 100
 *                   categorias_id:
 *                     type: string
 *                     description: ID de la categoría a la que pertenece el producto
 *                     example: "3f69fe12-5b9c-4a65-a8bc-cf4c0a5ef72c"
 *       404:
 *         description: Categoría no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Categoría no encontrada"
 *       500:
 *         description: Error al obtener productos de la categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Error al obtener productos de la categoría"
 */
router.get('/categorias/:nombre', getProductsByCategory )

module.exports = router;
