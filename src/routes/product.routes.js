// routes/productRoutes.js
const express = require('express');
const { createProduct, updateProduct, getAllProducts, getProductById, deleteProducto } = require('../controllers/product.controllers');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const validation = require('../middleware/valitation');
const {schemaProduct_Create, schemaProduct_Update} = require('../schemas/zod');
const router = express.Router();


// Rutas para productos
// solo los admins pueden crear, actualizar y eliminar
/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Permite crear un nuevo producto en el sistema.
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre del producto
 *                 example: "Camiseta"
 *               descripcion:
 *                 type: string
 *                 description: La descripción del producto
 *                 example: "Camiseta de algodón"
 *               precio:
 *                 type: number
 *                 description: El precio del producto
 *                 example: 19.99
 *               stock:
 *                 type: number
 *                 description: La cantidad en inventario del producto
 *                 example: 100
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: El ID del producto creado
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   description: El nombre del producto
 *                   example: "Camiseta"
 *                 descripcion:
 *                   type: string
 *                   description: La descripción del producto
 *                   example: "Camiseta de algodón"
 *                 precio:
 *                   type: number
 *                   description: El precio del producto
 *                   example: 19.99
 *                 stock:
 *                   type: number
 *                   description: La cantidad en inventario del producto
 *                   example: 100
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
 *     description: Actualiza los campos de un producto si existe. Los campos `nombre`, `descripcion`, `precio`, y `stock` son opcionales.
 *     tags:
 *       - Productos
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
 *     summary: Elimina un producto por ID
 *     description: Este endpoint permite eliminar un producto de la base de datos usando su ID. Solo accesible para administradores.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID del producto a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación de eliminación
 *                   example: "Producto eliminado correctamente"
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el producto no fue encontrado
 *                   example: "Producto no encontrado"
 *       500:
 *         description: Error al eliminar el producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error al eliminar el producto
 *                   example: "Error al eliminar el producto"
 *                 error:
 *                   type: string
 *                   description: Detalle del error
 */
router.delete('/:id', authorizeAdmin, deleteProducto); 

// las rutas de consulta no requiere permisos de administrador, es accesible para todos.
/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtiene productos con paginación
 *     description: Este endpoint obtiene los productos de la base de datos con soporte para paginación.
 *     tags:
 *       - Productos
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Número de página que se desea obtener (por defecto es 1).
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Número de productos por página (por defecto es 20).
 *         required: false
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Lista de productos obtenidos con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   description: Número de la página actual
 *                 limit:
 *                   type: integer
 *                   description: Número de productos por página
 *                 totalPages:
 *                   type: integer
 *                   description: Número total de páginas disponibles
 *                 totalCount:
 *                   type: integer
 *                   description: Número total de productos en la base de datos
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_producto:
 *                         type: integer
 *                         description: ID del producto
 *                       name:
 *                         type: string
 *                         description: Nombre del producto
 *                       descripcion:
 *                         type: string
 *                         description: Descripción del producto
 *                       precio:
 *                         type: number
 *                         format: float
 *                         description: Precio del producto
 *                       stock:
 *                         type: integer
 *                         description: Cantidad de stock disponible
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                 error:
 *                   type: string
 *                   description: Detalle del error
 */
//GET /productos?page=2&limit=20
router.get('/', getAllProducts);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     description: Retorna los detalles de un producto específico basado en su ID.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto que se desea obtener
 *     responses:
 *       200:
 *         description: Producto encontrado y retornado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto:
 *                   type: integer
 *                   description: ID del producto
 *                 name:
 *                   type: string
 *                   description: Nombre del producto
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del producto
 *                 precio:
 *                   type: number
 *                   format: float
 *                   description: Precio del producto
 *                 stock:
 *                   type: integer
 *                   description: Cantidad de stock disponible
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el producto no fue encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando un problema al obtener el producto
 *                 error:
 *                   type: string
 *                   description: Detalle del error
 */

router.get('/:id', getProductById);               

module.exports = router;
