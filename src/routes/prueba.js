const express = require('express');
const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Obtiene un mensaje de prueba
 *     description: Obtiene un mensaje de prueba
 *     tags:
 *       - Prueba
 *     responses:
 *       200:
 *         description: Mensaje de éxito
 */
router.get('/', (req, res) => {
    res.json('Hola mundo');
});

module.exports = router;