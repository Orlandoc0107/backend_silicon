const MyPool = require('../config/connectionPostgres');

// CRUD para productos:

// crear nuevo producto
const createProduct = async (req, res) => {
    const { nombre, descripcion, precio, stock, tipo } = req.body;

    try {
        // Verificar si la categoría ya existe
        const existingCategory = await MyPool.query(
            'SELECT id FROM categorias WHERE nombre = $1',
            [tipo]
        );

        let categoriaId;

        if (existingCategory.rows.length > 0) {
            // Si la categoría existe, obtener su ID
            categoriaId = existingCategory.rows[0].id;
        } else {
            // Si la categoría no existe, crearla
            const newCategory = await MyPool.query(
                'INSERT INTO categorias (nombre) VALUES ($1) RETURNING id',
                [tipo]
            );
            categoriaId = newCategory.rows[0].id;
        }

        // Crear el producto con la categoría obtenida o creada
        const newProduct = await MyPool.query(
            'INSERT INTO productos (categorias_id, nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [categoriaId, nombre, descripcion, precio, stock]
        );

        res.status(201).json(newProduct.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el nuevo producto' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, tipo } = req.body;

    try {
        // Verifica si el producto existe en la base de datos
        const productExists = await MyPool.query('SELECT * FROM productos WHERE id = $1', [id]);
        
        if (productExists.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Lógica para la categoría
        let categoriaId;
        if (tipo) {
            const existingCategory = await MyPool.query('SELECT id FROM categorias WHERE nombre = $1', [tipo]);

            if (existingCategory.rows.length > 0) {
                // Si la categoría existe, obtener su ID
                categoriaId = existingCategory.rows[0].id;
            } else {
                // Si la categoría no existe, crearla
                const newCategory = await MyPool.query(
                    'INSERT INTO categorias (nombre) VALUES ($1) RETURNING id',
                    [tipo]
                );
                categoriaId = newCategory.rows[0].id;
            }
        }

        // Construcción de la consulta de actualización de producto de forma dinámica
        const fields = [];
        const values = [];
        let index = 1;

        if (nombre) {
            fields.push(`nombre = $${index++}`);
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
        if (categoriaId) {
            fields.push(`categorias_id = $${index++}`);
            values.push(categoriaId);
        }

        // Si no hay campos para actualizar, devuelve un error
        if (fields.length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
        }

        values.push(id); // Añade el id del producto como el último valor para la consulta
        const query = `UPDATE productos SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;

        const updatedProduct = await MyPool.query(query, values);

        res.json(updatedProduct.rows[0]);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// ver todos los productos
const getAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    try {
        // Consulta SQL para obtener los productos con la información de categoría
        const productsQuery = `
            SELECT p.id AS id_producto, p.nombre, p.descripcion, p.precio, p.stock, 
                   c.id AS id_categoria, c.nombre AS categoria
            FROM productos p
            LEFT JOIN categorias c ON p.categorias_id = c.id
            ORDER BY p.id
            LIMIT $1 OFFSET $2
        `;
        const products = await MyPool.query(productsQuery, [limit, offset]);

        // Consulta para obtener el total de productos
        const totalProducts = await MyPool.query('SELECT COUNT(*) FROM productos');
        const totalCount = parseInt(totalProducts.rows[0].count, 10);
        const totalPages = Math.ceil(totalCount / limit);

        res.json({
            page,
            limit,
            totalPages,
            totalCount,
            products: products.rows,
        });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ message: 'Error al ver los productos', error });
    }
};


const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await MyPool.query(
            `SELECT p.id AS id_producto, p.nombre, p.descripcion, p.precio, p.stock, 
                    c.id AS id_categoria, c.nombre AS categoria
             FROM productos p
             LEFT JOIN categorias c ON p.categorias_id = c.id
             WHERE p.id = $1`,
            [id]
        );
        if (product.rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });

        res.json(product.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'No se pudo encontrar el producto', error });
    }
};

// Endpoint para eliminar un producto por ID
const deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await MyPool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);

        if (deletedProduct.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const result = await MyPool.query('SELECT * FROM categorias');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las categorías' });
    }
};

const getProductsByCategory = async (req, res) => {
    const { nombre } = req.params;

    try {
        // Paso 1: Buscar el ID de la categoría usando el nombre
        const categoryResult = await MyPool.query(
            'SELECT id FROM categorias WHERE nombre = $1',
            [nombre]
        );

        // Si la categoría no existe, devolver un 404
        if (categoryResult.rows.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        const categoriaId = categoryResult.rows[0].id;

        // Paso 2: Obtener los productos que pertenecen a la categoría encontrada
        const productsResult = await MyPool.query(
            'SELECT * FROM productos WHERE categorias_id = $1',
            [categoriaId]
        );

        // Paso 3: Devolver la lista de productos en formato JSON
        res.status(200).json(productsResult.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos de la categoría' });
    }
};

module.exports = { createProduct, updateProduct, getAllProducts, getProductById, deleteProducto,getAllCategories, getProductsByCategory };