export class User {
    constructor(userId, username, email, password, role = 'client', status = 'active') {
        this.userId = userId;            // ID del usuario
        this.username = username;        // Nombre de usuario
        this.email = email;              // Correo electrónico
        this.password = password;        // Contraseña
        this.role = role;                // Rol del usuario, por defecto 'client'
        this.status = status;            // Estado del usuario, por defecto 'active'
    }

    // Método para registrar un nuevo usuario
    async register() {
        // TODO: Aquí debe ir el código SQL para insertar el nuevo usuario en la base de datos
        // Ejemplo:
        // const resultado = await pool.query('INSERT INTO users SET ?', this);
        
        return {
            message: 'Usuario registrado exitosamente',
            userId: this.userId,
            username: this.username,
            email: this.email,
            role: this.role,
            status: this.status,
        };
    }

    // Método para iniciar sesión
    async login(password) {
        if (this.password === password) {
            // TODO: Aquí debes agregar lógica para manejar la sesión del usuario
            return {
                message: 'Inicio de sesión exitoso',
                userId: this.userId,
                username: this.username,
                role: this.role,
            };
        } else {
            throw new Error('Contraseña incorrecta');
        }
    }

    // Método para suspender el usuario
    async suspend() {
        this.status = 'suspended'; // Cambia el estado a 'suspended'
        // TODO: Aquí debe ir el código SQL para actualizar el estado del usuario en la base de datos
        // Ejemplo:
        // const resultado = await pool.query('UPDATE users SET status = ? WHERE userId = ?', [this.status, this.userId]);

        return {
            message: 'Usuario suspendido exitosamente',
            userId: this.userId,
            status: this.status,
        };
    }

    // Método para reactivar el usuario
    async reactivate() {
        this.status = 'active'; // Cambia el estado a 'active'
        // TODO: Aquí debe ir el código SQL para actualizar el estado del usuario en la base de datos
        // Ejemplo:
        // const resultado = await pool.query('UPDATE users SET status = ? WHERE userId = ?', [this.status, this.userId]);

        return {
            message: 'Usuario reactivado exitosamente',
            userId: this.userId,
            status: this.status,
        };
    }

    // Método para ver los datos del usuario
    async getUserData() {
        // TODO: Aquí debe ir el código SQL para obtener los datos del usuario de la base de datos
        // Ejemplo:
        // const resultado = await pool.query('SELECT * FROM users WHERE userId = ?', [this.userId]);
        
        return {
            userId: this.userId,
            username: this.username,
            email: this.email,
            role: this.role,
            status: this.status,
        };
    }

    // Método para actualizar el perfil del usuario
    async updateProfile(updatedData) {
        // Actualiza las propiedades del usuario con los datos proporcionados
        this.username = updatedData.username || this.username;
        this.email = updatedData.email || this.email;
        this.password = updatedData.password || this.password; // Asegúrate de manejar el hashing de contraseñas
        this.role = updatedData.role || this.role;
        
        // TODO: Aquí debe ir el código SQL para actualizar los datos del usuario en la base de datos
        // Ejemplo:
        // const resultado = await pool.query('UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE userId = ?', [this.username, this.email, this.password, this.role, this.userId]);

        return {
            message: 'Perfil actualizado exitosamente',
            userId: this.userId,
            username: this.username,
            email: this.email,
            role: this.role,
            status: this.status,
        };
    }

    // Método para eliminar un usuario
    async deleteUser() {
        // TODO: Aquí debe ir el código SQL para eliminar el usuario de la base de datos
        // Ejemplo:
        // const resultado = await pool.query('DELETE FROM users WHERE userId = ?', [this.userId]);

        return {
            message: 'Usuario eliminado exitosamente',
            userId: this.userId,
        };
    }
}
