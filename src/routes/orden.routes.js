const express = require('express');
const router = express.Router();
const { crearOrden } = require('../controllers/orden.controllers'); // Asume que tienes un controlador

// Ruta para crear una orden
router.post('/:id', crearOrden);

module.exports = router;
