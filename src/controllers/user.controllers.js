const MyPool = require('../config/connectionPostgres');

const profile = async (req, res) => {
    try {
        const idUser = req.id;
        const query = 'SELECT * FROM usuarios WHERE id = $1';
        const result = await MyPool.query(query, [idUser]);

        // Si el usuario existe en la base de datos
        if (result.rows.length > 0) {
            const { id, nombre, estado, email } = result.rows[0];
            return res.status(200).json({
                id,
                nombre,
                email,
                estado
            });
        } else {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const updateUser = async (req, res) => {
    // Obtén el ID del usuario desde el token
    const idUser = req.id;

    // Datos que se pueden actualizar
    const { nombre, estado } = req.body;

    try {
        // Validamos que al menos uno de los campos se haya proporcionado
        if (!nombre && !estado) {
            return res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar (nombre o estado)' });
        }

        // Verificamos si el usuario existe
        const userResult = await MyPool.query('SELECT * FROM usuarios WHERE id = $1', [idUser]);
        if (userResult.rowCount === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Creamos una consulta dinámica para actualizar solo los campos proporcionados
        let updateQuery = 'UPDATE usuarios SET';
        const updateValues = [];
        let queryIndex = 1;

        if (nombre) {
            updateQuery += ` nombre = $${queryIndex}`;
            updateValues.push(nombre);
            queryIndex++;
        }
        if (estado) {
            if (updateValues.length > 0) updateQuery += ',';
            updateQuery += ` estado = $${queryIndex}`;
            updateValues.push(estado);
            queryIndex++;
        }

        updateQuery += ` WHERE id = $${queryIndex} RETURNING nombre, estado`;
        updateValues.push(idUser);

        // Ejecutamos la consulta de actualización
        const result = await MyPool.query(updateQuery, updateValues);

        // Confirmamos la actualización
        res.status(200).json({
            message: 'Usuario actualizado correctamente',
            Actualizado: {
                nombre: result.rows[0].nombre,
                estado: result.rows[0].estado,
            },
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

module.exports = { profile, updateUser };