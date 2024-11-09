const express = require('express');
const { getAllUser, getUserById } = require('../controllers/admins.controllers');
const router = express.Router();
const authorizeAdmin = require('../middleware/authorizeAdmin')

// rutas para los administradores
/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Devuelve una lista de todos los usuarios registrados en el sistema.
 *     operationId: getAllUser
 *     tags:
 *       - Admin
 *     responses:
 *       '200':
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del usuario
 *                     example: 1
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del usuario
 *                     example: 'usuario@dominio.com'
 *                   password:
 *                     type: string
 *                     description: Contraseña del usuario (hashed)
 *                     example: '$2a$10$E7K1l...'
 *                   rol:
 *                     type: string
 *                     description: Rol del usuario
 *                     example: 'admin'
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del usuario
 *                     example: '2024-05-18T12:34:56Z'
 *       '500':
 *         description: Error interno al obtener los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Error al obtener los usuarios'
 */
router.get('/users', authorizeAdmin, getAllUser); 

/**
 * @swagger
 * /admin/user/{id}:
 *   get:
 *     summary: Obtener detalles completos de un usuario
 *     description: Devuelve todos los detalles de un usuario, incluyendo su información básica, carrito de compras, órdenes e items de las órdenes.
 *     operationId: getUserById
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: string
 *           format: uuid
 *           example: '123e4567-e89b-12d3-a456-426614174000'
 *     responses:
 *       '200':
 *         description: Detalles del usuario obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   description: ID del usuario
 *                   example: '123e4567-e89b-12d3-a456-426614174000'
 *                 nombre:
 *                   type: string
 *                   description: Nombre completo del usuario
 *                   example: 'Juan Pérez'
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                   example: 'usuario@dominio.com'
 *                 rol:
 *                   type: string
 *                   description: Rol del usuario
 *                   example: 'cliente'
 *                 estado:
 *                   type: string
 *                   description: Estado del usuario
 *                   example: 'activado'
 *                 carrito:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       description: ID del carrito
 *                       example: '456e4567-e89b-12d3-a456-426614174111'
 *                     estado:
 *                       type: string
 *                       description: Estado del carrito
 *                       example: 'en_espera'
 *                     fecha_actualizacion:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de la última actualización del carrito
 *                       example: '2024-05-18T12:34:56Z'
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           producto:
 *                             type: string
 *                             description: Nombre del producto en el carrito
 *                             example: 'Producto A'
 *                           cantidad:
 *                             type: integer
 *                             description: Cantidad del producto
 *                             example: 2
 *                           precio_unitario:
 *                             type: number
 *                             format: float
 *                             description: Precio unitario del producto
 *                             example: 19.99
 *                           preciototal:
 *                             type: number
 *                             format: float
 *                             description: Precio total (cantidad * precio_unitario)
 *                             example: 39.98
 *                 ordenes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         description: ID de la orden
 *                         example: '789e4567-e89b-12d3-a456-426614174222'
 *                       fecha_creacion:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación de la orden
 *                         example: '2024-05-18T12:34:56Z'
 *                       estado:
 *                         type: string
 *                         description: Estado de la orden
 *                         example: 'pendiente'
 *                       precio_total:
 *                         type: number
 *                         format: float
 *                         description: Precio total de la orden
 *                         example: 99.99
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             producto:
 *                               type: string
 *                               description: Nombre del producto en la orden
 *                               example: 'Producto B'
 *                             cantidad:
 *                               type: integer
 *                               description: Cantidad del producto
 *                               example: 1
 *                             precio_unitario:
 *                               type: number
 *                               format: float
 *                               description: Precio unitario del producto
 *                               example: 99.99
 *                             preciototal:
 *                               type: number
 *                               format: float
 *                               description: Precio total (cantidad * precio_unitario)
 *                               example: 99.99
 *       '404':
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Usuario no encontrado'
 *       '500':
 *         description: Error interno al obtener los detalles del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Error al obtener el usuario'
 */
router.get('/user/:id', authorizeAdmin, getUserById); 

module.exports = router;

