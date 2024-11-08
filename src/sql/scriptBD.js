const MyPool = require('../config/connectionPostgres.js');
const fs = require('fs');
const path = require('path');

// __filename y __dirname están disponibles directamente en CommonJS
const sqlFilePath = path.join(__dirname, 'init.sql');
const productosFilePath = path.join(__dirname, 'productos.sql');


const CreateTables = async () => {
    try {
        // Leemos los archivos SQL
        const sql = fs.readFileSync(sqlFilePath, 'utf8');
        const productos = fs.readFileSync(productosFilePath, 'utf8');

        // Ejecutamos la creación de las tablas
        await MyPool.query(sql);

        // Verificamos que las tablas hayan sido creadas
        const tableCheck = await MyPool.query(`
            SELECT to_regclass('public.productos');
        `);

        if (tableCheck.rows[0].to_regclass === null) {
            console.log('Error: La tabla productos no fue creada correctamente.');
        } else {
            console.log('Tablas creadas correctamente.');
        }

        // Insertamos los productos
        await MyPool.query(productos);

        // Verificamos si los productos se insertaron correctamente
        const productCheck = await MyPool.query(`
            SELECT COUNT(*) FROM productos;
        `);

        const productCount = productCheck.rows[0].count;

        if (productCount > 0) {
            console.log(`Productos creados correctamente. Se insertaron ${productCount} productos.`);
        } else {
            console.log('Error: No se insertaron productos.');
        }
    } catch (error) {
        console.log('Error al crear las tablas o insertar productos:', error);
    }
};

module.exports = CreateTables;