const express = require('express');
const { addProductCarrito, 
        getAllProductsCarrito, 
        updateProductCarrito, 
        deleteProductCarrito } = require('../controllers/carrito.controllers');
const authenticate = require('../middleware/autenticate')
const router = express.Router();

router.get('/', authenticate, getAllProductsCarrito);  
router.post('/',authenticate ,addProductCarrito);      
router.put('/:id',authenticate, updateProductCarrito);    
router.delete('/:id',authenticate, deleteProductCarrito);


module.exports = router;