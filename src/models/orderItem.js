const User = require('./user');
const Product = require('./product');

export class OrderItem {
    constructor(orderItemId, quantity, price, orderId, productId, userId) {
        this.orderItemId = orderItemId; // ID del artículo en la orden
        this.quantity = quantity;         // Cantidad del producto
        this.price = price;               // Precio del producto
        this.orderId = orderId;           // ID de la orden a la que pertenece el artículo
        this.productId = productId;       // ID del producto
        this.userId = userId;             // ID del usuario que realiza la compra
    }

    // Método para crear un nuevo artículo de orden
    async createOrderItem() {
        // Aquí puedes usar el objeto Product para obtener información sobre el producto
        const product = await Product.getProductById(this.productId); // Método que debes implementar en la clase Product

        // Validar si el producto existe
        if (!product) {
            throw new Error('Producto no encontrado');
        }

        // Aquí debes poner el código SQL para insertar el nuevo artículo de orden en la base de datos
        // const resultado = await pool.query('INSERT INTO order_items SET ?', this);

        return {
            message: 'Artículo de orden creado exitosamente',
            orderItemId: this.orderItemId,
            quantity: this.quantity,
            price: this.price,
            orderId: this.orderId,
            productId: this.productId,
        };
    }

    // Método para obtener todos los artículos de orden de un usuario específico
    static async getOrderItemsByUserId(userId) {
        // Validar si el usuario existe antes de obtener sus artículos de orden
        const user = await User.getUserById(userId); // Método que debes implementar en la clase User
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Aquí debes poner el código SQL para obtener todos los artículos de orden de un usuario
        // const resultado = await pool.query('SELECT * FROM order_items WHERE userId = ?', [userId]);

        return [
            // Ejemplo de retorno, reemplaza con datos reales de la base de datos
            new OrderItem(1, 2, 150, 1, 1, userId),  // Artículo de ejemplo
            new OrderItem(2, 1, 100, 1, 2, userId),  // Artículo de ejemplo
        ];
    }

    // Método para actualizar un artículo de orden
    async updateOrderItem(updatedData) {
        // Validar si el usuario que actualiza el artículo de orden tiene permisos (opcional)
        const user = await User.getUserById(this.userId); // Asegúrate de que la propiedad userId esté presente
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        this.quantity = updatedData.quantity || this.quantity;
        this.price = updatedData.price || this.price;

        // Aquí debes poner el código SQL para actualizar el artículo de orden en la base de datos
        // const resultado = await pool.query('UPDATE order_items SET quantity = ?, price = ? WHERE orderItemId = ?', [this.quantity, this.price, this.orderItemId]);

        return {
            message: 'Artículo de orden actualizado exitosamente',
            orderItemId: this.orderItemId,
            quantity: this.quantity,
            price: this.price,
        };
    }

    // Método para eliminar un artículo de orden
    async deleteOrderItem() {
        // Aquí debes poner el código SQL para eliminar el artículo de orden de la base de datos
        // const resultado = await pool.query('DELETE FROM order_items WHERE orderItemId = ?', [this.orderItemId]);

        return {
            message: 'Artículo de orden eliminado exitosamente',
            orderItemId: this.orderItemId,
        };
    }
}
