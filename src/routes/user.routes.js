const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/autenticate.js');
const {profile, updateUser} = require('../controllers/user.controllers.js');

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Obtiene el perfil del usuario
 *     description: Retorna la información del perfil del usuario autenticado.
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   description: Nombre del usuario
 *                   example: "Juan Perez"
 *                 email:
 *                   type: string
 *                   description: Email del usuario
 *                   example: "juan.perez@example.com"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación del perfil
 *                   example: "2024-01-01T12:00:00Z"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error interno del servidor"
 */
router.get('/profile', authenticate, profile)

/**
 * @swagger
 * /usuarios:
 *   put:
 *     summary: Actualizar nombre o estado del usuario
 *     description: Permite al usuario actualizar su nombre o estado (activado/desactivado).
 *     tags:
 *       - Usuario
 *     security:
 *       - BearerAuth: []  # Asegúrate de que el token esté configurado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: "*Nuevo nombre del usuario"
 *               estado:
 *                 type: string
 *                 enum: [activado, desactivado]
 *                 description: "*Estado del usuario"
 *           example:
 *             nombre: "Juan Perez"
 *             estado: "desactivado"
 *     responses:
 *       '200':
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 Actualizado:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     estado:
 *                       type: string
 *             example:
 *               message: "Usuario actualizado correctamente"
 *               Actualizado:
 *                 nombre: "Juan Perez"
 *                 estado: "desactivado"
 *       '400':
 *         description: Error de solicitud - faltan campos requeridos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Se debe proporcionar al menos un campo para actualizar (nombre o estado)"
 *       '404':
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Usuario no encontrado"
 *       '500':
 *         description: Error en el servidor al actualizar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Error al actualizar el usuario"
 */
router.put('/profile', authenticate, updateUser)


module.exports = router