const MyPool = require('../config/connectionPostgres.js');
const fs = require('fs');
const path = require('path');

// __filename y __dirname están disponibles directamente en CommonJS
const sqlFilePath = path.join(__dirname, 'init.sql');

const CreateTables = async () => {
    try {
        const sql = fs.readFileSync(sqlFilePath, 'utf8');
        
        await MyPool.query(sql);
        
        console.log('Tablas Creadas');
    } catch (error) {
        console.log('Error al crear las tablas:', error);
    }
};

module.exports = CreateTables;