// middlework para usar cualquier esquema
const { z, ZodError } = require('zod');

const middlewareValidation = function middlewareValidation(schema) {
    return (req, res, next) => {
        try {
            // Valida el cuerpo de la solicitud usando el esquema proporcionado
            schema.parse(req.body);
            next(); // Continúa al siguiente middleware si la validación pasa
        } catch (error) {
            if (error instanceof ZodError) {
                // Mapea los errores de validación de Zod a un formato más descriptivo
                const errorMessages = error.errors.map(issue => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                // Responde con un código de estado 400 y los detalles del error
                return res.status(400).json({ error: 'Datos inválidos', detalles: errorMessages });
            }
            // Si ocurre un error diferente, responde con un error de servidor interno (500)
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
}

module.exports = middlewareValidation;

