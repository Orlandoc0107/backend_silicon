const MyPool = require('../config/connectionPostgres');
const { hashPassword, comparePassword } = require('../utils/bcrypt.js');
const { generateToken } = require('../utils/token.js');

const Register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el correo ya está registrado
        const userExistsQuery = 'SELECT * FROM usuarios WHERE email = $1';
        const userExistsResult = await MyPool.query(userExistsQuery, [email]);

        if (userExistsResult.rows.length > 0) {
            return res.status(400).json({ error: 'El correo ya se encuentra registrado' });
        }

        // Hashear contraseña
        const hashedPassword = await hashPassword(password);

        // Registrar nuevo usuario (no necesitamos especificar el id, ya que es generado automáticamente)
        const insertUserQuery = 'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *';
        const insertResult = await MyPool.query(insertUserQuery, [email, hashedPassword]);

        if (insertResult) {
            // Creando una instancia para el Carrito
            const userId = insertResult.rows[0].id;
            const Instancia = await MyPool.query('INSERT INTO carrito (usuario_id) VALUES ($1) RETURNING *', [userId]);
            if (Instancia) {
                console.log('Instancia de Carrito creada ...')
            }
        }

        // Respuesta de éxito
        return res.status(201).json({
            message: 'Usuario registrado con éxito',
        });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el correo existe
        const userQuery = 'SELECT * FROM usuarios WHERE email = $1';
        const userResult = await MyPool.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isPasswordValid = await comparePassword(password, userResult.rows[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
        }

        // Generar token JWT y enviar en cookie segura
        const payload = { id: userResult.rows[0].id, email: userResult.rows[0].email };
        const token = generateToken(payload);

        // Enviar el token por cookies y también en el body
        return res.status(200)
            .cookie('authToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000 // 1 hora
            })
            .json({
                message: 'Login exitoso',
            });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const status = (req, res) => {
    console.log(req.id)
    return res.status(200).json({
        Status: true,
    })
}

const logout = (req, res) => {
    // Eliminar la cookie del token
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Asegúrate de que sea seguro en producción
        sameSite: 'strict',
    });

    return res.status(200).json({ message: 'Sesión cerrada con éxito' });
};

module.exports = { Register, Login, status, logout };
