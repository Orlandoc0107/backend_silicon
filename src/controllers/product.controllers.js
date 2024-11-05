const db = require('../sql');

// CRUD para productos:

// crear nuevo producto
const createProduct = async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    try {
        const newProduct = await db.query ('INSERT INTO productos (name, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, descripcion, precio, stock]);  
    res.status(201).json(newProduct.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el nuevo producto' });
    }
};

// actualizar nuevo producto
const updateProduct = async (req, res) => {
    const { id_producto } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;
    try {
        const updatedProduct = await db.query('UPDATE productos SET name = $1, descripcion = $2, precio = $3, stock = $4 WHERE id_producto = $5 RETURNING *',
        [nombre, descripcion, precio, stock, id_producto]);
        if (updateProduct.rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(updatedProduct.rows[0]);   
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

// ver todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await db.query('SELECT * FROM productos');
        res.json(products.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al ver los productos' });
    }
}

const getProductById = async (req, res) => {
    const { id_producto } = req.params;;
    try {
        const product = await db.query('SELECT * FROM productos WHERE Id_producto = $1', [id_producto]);
        if (product.rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'No se pudo encontrar el producto' });
    }
};

const deleteProduct = async (req, res) => {
    const { id_producto } = req.params;
    try {
        const deletedProduct = await db.query('DELETE FROM products WHERE id = $1 RETURNING *',[id_producto]);
        if (deletedProduct.rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};

module.exports = { createProduct, updateProduct, getAllProducts, getProductById, deleteProduct };