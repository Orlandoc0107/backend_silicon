// routes/productRoutes.js
const express = require('express');
const { createProduct, updateProduct, getAllProducts, getProductById, deleteProduct } = require('../controllers/product.controllers');
const verifyAdmin = require('../middleware/authorizeAdmin');
const router = express.Router();


// Rutas para productos
// solo los admins pueden crear, actualizar y eliminar
router.post('/', verifyAdmin, createProduct);      
router.put('/:id', verifyAdmin, updateProduct);    
router.delete('/:id', verifyAdmin, deleteProduct); 

// las rutas de consulta no requiere permisos de administrador, es accesible para todos.
router.get('/', getAllProducts);                   
router.get('/:id', getProductById);               

module.exports = router;
