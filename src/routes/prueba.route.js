const express = require('express');
const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Prueba
 *   description: Rutas de prueba
 */

/**
 * @openapi
 * /test:
 *   get:
 *     summary: Obtiene un mensaje de prueba
 *     tags: [Prueba]
 *     responses:
 *       200:
 *         description: Mensaje de éxito
 */
router.get('/test', (req, res) => {
    res.send('Hola mundo');
});

module.exports = router;