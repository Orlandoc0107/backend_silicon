export class Admin {
    constructor(adminId, username, email, password, role = 'Admin', status = 'Active') {
        this.adminId = adminId;            // ID del administrador
        this.username = username;          // Nombre de usuario
        this.email = email;                // Correo electrónico
        this.password = password;          // Contraseña
        this.role = role;                  // Rol del administrador, por defecto 'Admin'
        this.status = status;              // Estado del administrador, por defecto 'Active'
    }

    // Método para registrar un nuevo administrador
    async register() {
        // TODO: Aquí debe ir el código SQL para insertar el nuevo administrador en la base de datos
        // Ejemplo:
        // const resultado = await pool.query('INSERT INTO admins SET ?', this);

        return {
            message: 'Administrador registrado exitosamente',
            adminId: this.adminId,
            username: this.username,
            email: this.email,
            role: this.role,
            status: this.status,
        };
    }

    // Método para iniciar sesión como administrador
    async login(password) {
        if (this.password === password) {
            // TODO: Aquí debes agregar lógica para manejar la sesión del administrador
            return {
                message: 'Inicio de sesión exitoso',
                adminId: this.adminId,
                username: this.username,
                role: this.role,
            };
        } else {
            throw new Error('Contraseña incorrecta');
        }
    }

    // Método para ver todos los administradores
    static async getAllAdmins() {
        // TODO: Aquí debe ir el código SQL para obtener todos los administradores de la base de datos
        // Ejemplo:
        // const resultado = await pool.query('SELECT * FROM admins');

        return [
            // Este es un ejemplo de retorno, deberías reemplazarlo con los resultados de la base de datos
            new Admin(1, 'admin1', 'admin1@example.com', 'password123'),
            new Admin(2, 'admin2', 'admin2@example.com', 'password456'),
        ];
    }

    // Método para obtener un administrador por ID
    static async getAdminById(adminId) {
        // TODO: Aquí debe ir el código SQL para obtener un administrador por su ID
        // Ejemplo:
        // const resultado = await pool.query('SELECT * FROM admins WHERE adminId = ?', [adminId]);

        // Simulando el retorno de un administrador
        return new Admin(adminId, 'adminExample', 'admin@example.com', 'password123');
    }

    // Método para actualizar el perfil del administrador
    async updateProfile(updatedData) {
        // Actualiza las propiedades del administrador con los datos proporcionados
        this.username = updatedData.username || this.username;
        this.email = updatedData.email || this.email;
        this.password = updatedData.password || this.password; // Asegúrate de manejar el hashing de contraseñas
        this.role = updatedData.role || this.role;

        // TODO: Aquí debe ir el código SQL para actualizar los datos del administrador en la base de datos
        // Ejemplo:
        // const resultado = await pool.query('UPDATE admins SET username = ?, email = ?, password = ?, role = ? WHERE adminId = ?', [this.username, this.email, this.password, this.role, this.adminId]);

        return {
            message: 'Perfil de administrador actualizado exitosamente',
            adminId: this.adminId,
            username: this.username,
            email: this.email,
            role: this.role,
            status: this.status,
        };
    }

    // Método para eliminar un administrador
    async deleteAdmin() {
        // TODO: Aquí debe ir el código SQL para eliminar el administrador de la base de datos
        // Ejemplo:
        // const resultado = await pool.query('DELETE FROM admins WHERE adminId = ?', [this.adminId]);

        return {
            message: 'Administrador eliminado exitosamente',
            adminId: this.adminId,
        };
    }
}
