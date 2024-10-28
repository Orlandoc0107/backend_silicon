export class Product {
    constructor(productId, productName, price, description, stock){
        this.productId = productId,
        this.productName= productName,
        this.price = price,
        this.description = description,
        this.stock = stock
    }

    // Método para registrar un nuevo producto
    async createProduct() {
        // TODO: Aquí debe ir el código SQL para insertar el nuevo producto en la base de datos
        // Ejemplo:
        // const resultado = await pool.query('INSERT INTO products SET ?', this);

        return {
            message: 'Producto creado exitosamente',
            productId: this.productId,
            productName: this.productName,
            price: this.price,
            description: this.description,
            stock: this.stock,
        };
    }

    // Método para obtener todos los productos
    static async getAllProducts() {
        // TODO: Aquí debe ir el código SQL para obtener todos los productos de la base de datos
        // Ejemplo:
        // const resultado = await pool.query('SELECT * FROM products');

        return [
            // Ejemplo de retorno, reemplaza con datos reales de la base de datos
            new Product(1, 'Producto 1', 100, 'Descripción del producto 1', 50),
            new Product(2, 'Producto 2', 200, 'Descripción del producto 2', 30),
        ];
    }

    // Método para obtener un producto por ID
    static async getProductById(productId) {
        // TODO: Aquí debe ir el código SQL para obtener un producto por su ID
        // Ejemplo:
        // const resultado = await pool.query('SELECT * FROM products WHERE productId = ?', [productId]);

        return new Product(productId, 'Producto Ejemplo', 150, 'Descripción de ejemplo', 20);
    }

    // Método para actualizar un producto
    async updateProduct(updatedData) {
        // Actualiza las propiedades del producto con los datos proporcionados
        this.productName = updatedData.productName || this.productName;
        this.price = updatedData.price || this.price;
        this.description = updatedData.description || this.description;
        this.stock = updatedData.stock || this.stock;

        // TODO: Aquí debe ir el código SQL para actualizar el producto en la base de datos
        // Ejemplo:
        // const resultado = await pool.query('UPDATE products SET productName = ?, price = ?, description = ?, stock = ? WHERE productId = ?', [this.productName, this.price, this.description, this.stock, this.productId]);

        return {
            message: 'Producto actualizado exitosamente',
            productId: this.productId,
            productName: this.productName,
            price: this.price,
            description: this.description,
            stock: this.stock,
        };
    }

    // Método para eliminar un producto
    async deleteProduct() {
        // TODO: Aquí debe ir el código SQL para eliminar el producto de la base de datos
        // Ejemplo:
        // const resultado = await pool.query('DELETE FROM products WHERE productId = ?', [this.productId]);

        return {
            message: 'Producto eliminado exitosamente',
            productId: this.productId,
        };
    }

    // Método para actualizar el stock después de una compra
    async updateStock(quantity) {
        this.stock -= quantity; // Resta la cantidad comprada del stock

        // TODO: Aquí debe ir el código SQL para actualizar el stock del producto en la base de datos
        // Ejemplo:
        // const resultado = await pool.query('UPDATE products SET stock = ? WHERE productId = ?', [this.stock, this.productId]);

        return {
            message: 'Stock actualizado exitosamente',
            productId: this.productId,
            remainingStock: this.stock,
        };
    }
}
