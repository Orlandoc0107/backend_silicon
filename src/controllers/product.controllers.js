const MyPool = require('../config/connectionPostgres');

// CRUD para productos:

// crear nuevo producto
const createProduct = async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    try {
        const newProduct = await MyPool.query ('INSERT INTO productos (name, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, descripcion, precio, stock]);  
    res.status(201).json(newProduct.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el nuevo producto' });
    }
};

// actualizar nuevo producto
// const updateProduct = async (req, res) => {
//     const { id_producto } = req.params;
//     const { nombre, descripcion, precio, stock } = req.body;
//     try {
//         const updatedProduct = await MyPool.query('UPDATE productos SET name = $1, descripcion = $2, precio = $3, stock = $4 WHERE id_producto = $5 RETURNING *',
//         [nombre, descripcion, precio, stock, id_producto]);
//         if (updateProduct.rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
//         res.json(updatedProduct.rows[0]);   
//     } catch (error) {
//         res.status(500).json({ message: 'Error al actualizar el producto', error });
//     }
// };

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;

    try {
        // Verifica si el producto existe en la base de datos
        const productExists = await MyPool.query('SELECT * FROM productos WHERE id_producto = $1', [id]);
        
        if (productExists.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Construcción de la consulta dinámicamente según los campos proporcionados
        const fields = [];
        const values = [];
        let index = 1;

        if (nombre) {
            fields.push(`name = $${index++}`);
            values.push(nombre);
        }
        if (descripcion) {
            fields.push(`descripcion = $${index++}`);
            values.push(descripcion);
        }
        if (precio) {
            fields.push(`precio = $${index++}`);
            values.push(precio);
        }
        if (stock) {
            fields.push(`stock = $${index++}`);
            values.push(stock);
        }

        // Si no hay campos para actualizar, devuelve un error
        if (fields.length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
        }

        values.push(id); // Añade el id como el último valor para la consulta
        const query = `UPDATE productos SET ${fields.join(', ')} WHERE id_producto = $${index} RETURNING *`;

        const updatedProduct = await MyPool.query(query, values);

        res.json(updatedProduct.rows[0]);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// ver todos los productos
const getAllProducts = async (req, res) => {
    // Parámetros de paginación con valores predeterminados
    const page = parseInt(req.query.page) || 1;  // Página por defecto: 1
    const limit = parseInt(req.query.limit) || 20;  // Límite por defecto: 20 productos por página
    const offset = (page - 1) * limit;  // Cálculo del desplazamiento (offset) para la consulta SQL

    try {
        // Consulta con paginación
        const products = await MyPool.query(
            'SELECT * FROM productos ORDER BY id_producto LIMIT $1 OFFSET $2',
            [limit, offset]
        );

        // Obtener el total de productos para calcular la cantidad de páginas
        const totalProducts = await MyPool.query('SELECT COUNT(*) FROM productos');
        const totalCount = totalProducts.rows[0].count;
        const totalPages = Math.ceil(totalCount / limit);  // Calcular el número total de páginas

        res.json({
            page,
            limit,
            totalPages,
            totalCount,
            products: products.rows,  // Devolver los productos de la página actual
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al ver los productos', error });
    }
};


const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await MyPool.query('SELECT * FROM productos WHERE id_producto = $1', [id]);
        if (product.rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'No se pudo encontrar el producto', error });
    }
};

const deleteProducto = async (req, res) => {
    console.log("deleteProducto ejecutándose...");
    const { id } = req.params;
    console.log('este es la id del producto que se intenta eliminar', id)
    try {
        const deletedProduct = await MyPool.query('DELETE FROM productos WHERE id_producto = $1', [id]);

        if (!deletedProduct.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

module.exports = { createProduct, updateProduct, getAllProducts, getProductById, deleteProducto };