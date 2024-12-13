const express = require('express')
const router = express.Router();
const middlewareValidation = require('../middleware/valitation.js')
const {schemaRegister, schemaLogin} = require('../schemas/zod.js');
const {Register, Login, status, logout} = require('../controllers/auth.controllers.js');
const authenticate = require('../middleware/autenticate.js');
const fs = require('fs');
const path = require('path');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos con email y contraseña encriptada.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@ejemplo.com
 *               password:
 *                 type: string
 *                 example: contraseña123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario registrado con éxito
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *       400:
 *         description: El correo ya está registrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/register', middlewareValidation(schemaRegister), Register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica a un usuario
 *     description: Inicia sesión para un usuario registrado y devuelve un token en una cookie.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@ejemplo.com
 *               password:
 *                 type: string
 *                 example: contraseña123
 *     responses:
 *       200:
 *         description: Login exitoso, cookie authToken creada.
 *         headers:
 *           Set-Cookie:
 *             description: Token JWT de autenticación en cookie segura.
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login exitoso
 *       400:
 *         description: Correo o contraseña incorrectos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/login', middlewareValidation(schemaLogin), Login)

/**
 * @swagger
 * /auth/status:
 *   get:
 *     summary: Verificar estado de autenticación
 *     description: Verifica si el usuario está autenticado y devuelve la información del usuario.
 *     tags:
 *       - Autenticación
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Token inválido
 */
router.get('/status', authenticate, status)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     description: Elimina el token de autenticación y cierra la sesión del usuario.
 *     tags:
 *       - Autenticación
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Sesión cerrada con éxito.
 *       401:
 *         description: No autenticado, no se pudo cerrar la sesión.
 *       400:
 *         description: Error al cerrar sesión.
 */
router.post('/logout', logout);

// documentacion de postman
router.get('/download/postman-collection', (req, res) => {
    const filePath = path.join(__dirname, '../docs/BackEnd.postman_collection.json');
    res.download(filePath, 'BackEnd.postman_collection.json', (err) => {
        if (err) {
            console.error('Error al descargar el archivo:', err);
            res.status(500).send('Error al descargar el archivo');
        }
    });
});

module.exports = router