const express = require('express');
const { addProductCarrito, 
        verCarrito,
        quitarProducto
} = require('../controllers/carrito.controllers');
const authenticate = require('../middleware/autenticate')
const router = express.Router();

/**
 * @swagger
 * /carrito/:
 *   get:
 *     summary: Ver el contenido del carrito de un usuario
 *     description: Devuelve los productos en el carrito del usuario autenticado junto con el total de la compra.
 *     tags:
 *       - Carrito
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito y total de la compra obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   description: Lista de productos en el carrito.
 *                   items:
 *                     type: object
 *                     properties:
 *                       producto_id:
 *                         type: string
 *                         format: uuid
 *                         description: ID único del producto.
 *                       nombre:
 *                         type: string
 *                         description: Nombre del producto.
 *                       cantidad:
 *                         type: integer
 *                         description: Cantidad del producto en el carrito.
 *                       precio_unitario:
 *                         type: number
 *                         format: float
 *                         description: Precio unitario del producto.
 *                       preciototal:
 *                         type: number
 *                         format: float
 *                         description: Precio total del producto basado en la cantidad.
 *                 total:
 *                   type: number
 *                   format: float
 *                   description: Total de la compra en el carrito.
 *       404:
 *         description: Carrito no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Carrito no encontrado
 *       500:
 *         description: Error al obtener el carrito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener el carrito
 */

router.get('/', authenticate, verCarrito);  
router.post('/',authenticate ,);
/**
 * @swagger
 * /carrito/add/{id}:
 *   post:
 *     summary: Agrega un producto al carrito
 *     description: Agrega una cantidad especificada de un producto al carrito del usuario autenticado.
 *     tags:
 *       - Carrito
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del producto que se va a agregar al carrito.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *                 example: 2
 *                 description: Cantidad del producto a agregar al carrito.
 *     responses:
 *       200:
 *         description: Producto agregado al carrito exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto agregado al carrito exitosamente
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Producto no encontrado
 *       500:
 *         description: Error al agregar producto al carrito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al agregar producto al carrito
 */
router.put('/add/:id',authenticate, addProductCarrito ); 
/**
 * @swagger
 * /carrito/remove/{id}:
 *   post:
 *     summary: Quita un producto del carrito
 *     description: Elimina una cantidad especificada de un producto del carrito del usuario autenticado.
 *     tags:
 *       - Carrito
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del producto que se va a quitar del carrito.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *                 example: 2
 *                 description: Cantidad del producto a quitar del carrito.
 *     responses:
 *       200:
 *         description: Cantidad del producto actualizada en el carrito exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cantidad actualizada en el carrito
 *       400:
 *         description: La cantidad proporcionada no es válida para eliminar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Cantidad no válida para eliminar
 *       404:
 *         description: Producto no encontrado en el carrito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Producto no encontrado en el carrito
 *       500:
 *         description: Error al actualizar cantidad en el carrito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al actualizar cantidad en el carrito
 */ 
router.put('/remove/:id',authenticate, quitarProducto );  
router.delete('/:id',authenticate);


module.exports = router;