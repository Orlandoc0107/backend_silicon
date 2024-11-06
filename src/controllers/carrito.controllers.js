const MyPool = require('../config/connectionPostgres');

//Para cliente como admins...

// los admins podran ver todos los productos añadidos, actualizarlos o eliminarlos por id, 
//pero solo ellos pueden cambiar el precio!, consultar con el grupo de como hacer esta excepcion 😊

const addProductCarrito = async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    try {
        const addNewProduct = await MyPool.query ('INSERT INTO carrito (name, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, descripcion, precio, stock]);  
    res.status(201).json(addNewProduct.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir el producto al carrito', error });
    }
};


const getAllProductsCarrito = async (req, res) => {
    try {
        const usersCarrito = await MyPool.query('SELECT * FROM carrito');
        res.json(usersCarrito.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al ver el carrito', error });
    }
};

const updateProductCarrito = async (req, res) => {
    const { id_carrito } = req.params;
    const { nombre, descripcion, stock } = req.body;
    try {
        const updatedProductCarrito = await MyPool.query('UPDATE carrito SET name = $1, descripcion = $2, stock = $3 WHERE id_carrito = $4 RETURNING *',
        [nombre, descripcion, stock, id_carrito]);
        if (updatedProductCarrito.rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(updatedProductCarrito.rows[0]);   
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto en el carrito', error });
    }
};

const deleteProductCarrito = async (req, res) => {
    const { id_carrito } = req.params;
    try {
        const deletedProductCarrito = await MyPool.query('DELETE FROM carrito WHERE id = $1 RETURNING *',[id_carrito]);
        if (deletedProductCarrito.rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto del carrito', error });
    }
};


module.exports= { addProductCarrito, getAllProductsCarrito, updateProductCarrito, deleteProductCarrito };