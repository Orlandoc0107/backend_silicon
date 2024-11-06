const express = require('express');
const { addProductCarrito, 
        getAllProductsCarrito, 
        updateProductCarrito, 
        deleteProductCarrito } = require('../controllers/carrito.controllers');
const router = express.router();

router.post('/', addProductCarrito);      
router.put('/:id', updateProductCarrito);    
router.delete('/:id', deleteProductCarrito);
router.get('/', getAllProductsCarrito);  

module.exports = router;