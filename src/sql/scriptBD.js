const MyPool = require('../config/connectionPostgres.js');
const fs = require('fs');
const path = require('path');

// Rutas de archivo
const sqlFilePath = path.join(__dirname, 'init.sql');
const productFilePath = path.join(__dirname, 'prod.sql')

const CreateTables = async () => {
    try {
        // Leer el archivo SQL
        const sql = fs.readFileSync(sqlFilePath, 'utf8');
        const product = fs.readFileSync(productFilePath, 'utf8');
        
        // Ejecutar la consulta SQL para crear tablas
        const result = await MyPool.query(sql);

        if (result) {
            // Mostramos la cantidad de tablas creadas o ya existentes
            console.log(`Tablas creadas o verificadas`);
        } else {
            console.log("No se realizaron cambios en la base de datos.");
        }
        const result2 = await MyPool.query(product);

        if(result2){
            console.log(`Productos Inyectados`)
        }

    } catch (error) {
        console.error('Error al verificar o crear las tablas:', error);
    }
};

module.exports = CreateTables;
