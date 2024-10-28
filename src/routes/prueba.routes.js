const express = require('express');
const {prueba} = require('../controllers/prueba.controllers');
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Prueba/Test 2
 *     description: Endpoint para verificar la disponibilidad del servicio.
 */

/**
 * @openapi
 * /test:
 *   get:
 *     summary: Obtiene un mensaje de prueba.
 *     description: Este endpoint devuelve un mensaje que permite comprobar si el servidor está respondiendo correctamente.
 *     tags: [Prueba]
 *     responses:
 *       200:
 *         description: El servidor está respondiendo correctamente.
 */
router.get('/', prueba);


module.exports = router;
