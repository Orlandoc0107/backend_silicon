// middlework para usar cualquier esquema

const middlewareValidation = (schema) => async (req, res, next) => {
    try {
        await schema.parse(req.body);
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            errors: error.errors.map((err) => ({
                validation: err.validation, // Puedes ajustar esto según lo que quieras mostrar
                code: err.code,
                message: err.message,
                path: err.path,
            }))
        });
    }
}

module.exports = middlewareValidation;

