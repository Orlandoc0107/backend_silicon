const express = require('express');
const { getAllUser, getUserById } = require('../controllers/admins.controllers');
const router = express.router();

// rutas para los administradores
router.get('/', getAllUser); 
router.get('/:id_usuario', getUserById); 

module.exports = router;

