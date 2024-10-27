// Definimos una función asíncrona llamada 'prueba' que actuará como un controlador de endpoint.
const prueba = (req, res) => {
    // Asegúrate de no enviar una respuesta si ya has enviado una anteriormente
    if (res.headersSent) {
        return; // Sal de la función si ya se han enviado las cabeceras
    }

    res.status(200).json({
        mensaje: "¡Hola mundo!",
        descripcion: "Este es un mensaje de prueba para verificar que el servidor responde correctamente.",
        fecha: new Date().toISOString(),
    });
};

module.exports = {
    prueba,
};