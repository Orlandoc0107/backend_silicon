// routes/productRoutes.js
const express = require('express');
const { createProduct, updateProduct, getAllProducts, getProductById, deleteProduct } = require('../controllers/product.controllers');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const validation = require('../middleware/valitation');
const schemaProduct_Create = require('../schemas/zod')
const router = express.Router();


// Rutas para productos
// solo los admins pueden crear, actualizar y eliminar
router.post('/', authorizeAdmin, validation(schemaProduct_Create) , createProduct);      
router.put('/:id', authorizeAdmin, validation, updateProduct);    
router.delete('/:id', authorizeAdmin, deleteProduct); 

// las rutas de consulta no requiere permisos de administrador, es accesible para todos.
router.get('/', getAllProducts);                   
router.get('/:id', getProductById);               

module.exports = router;
