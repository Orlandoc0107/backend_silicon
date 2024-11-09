const { hashPassword } = require('../utils/bcrypt');
const MyPool = require('../config/connectionPostgres');

const RegisterAdmin = async () => {
  try {
    // Verifica si existe algún usuario con rol de "Admin" en la base de datos
    const checkAdminQuery = 'SELECT COUNT(*) FROM usuarios WHERE rol = $1';
    const { rows } = await MyPool.query(checkAdminQuery, ['admin']);
    
    if (parseInt(rows[0].count) === 0) { // Si no hay ningún administrador
      // Inserta al usuario administrador por defecto
      const email = 'admin@admin.com';
      const rol = 'admin';
      const password = await hashPassword('administrador'); // Hashea la contraseña

      const insertAdminQuery = 'INSERT INTO usuarios (email, password, rol) VALUES ($1, $2, $3) RETURNING id';
      const CreateAdmin = await MyPool.query(insertAdminQuery, [email, password, rol]);
      
      console.log('Usuario administrador insertado correctamente');
      
      // Obtener el ID del usuario creado
      const userId = CreateAdmin.rows[0].id;

      // Crear la instancia del carrito para el usuario administrador
      const createCartQuery = 'INSERT INTO carrito (usuario_id) VALUES ($1) RETURNING *';
      const Instancia = await MyPool.query(createCartQuery, [userId]);

      if (Instancia.rows.length > 0) {
        console.log('Instancia de Carrito creada para el administrador');
      }
    } else {
      console.log('Ya existe un usuario con rol de administrador. No se insertará otro.');
    }
  } catch (error) {
    console.error('Error al verificar o insertar el usuario administrador:', error);
  }
};

module.exports = RegisterAdmin;
