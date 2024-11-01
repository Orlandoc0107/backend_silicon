const { Pool } = require('pg')
const dotenv = require('dotenv')
dotenv.config()

// async function ConectionBD(){
//     const pool = new Pool({
//         connectionString: process.env.POSTGRES_URL,
//     })

//     try {
//         await pool.connect();
//         console.log('Base de datos conectada PostgreSQL');
//         await pool.end();
//         return true;
//     } catch (error) {
//         console.error('Error en base de datos:', error);
//         return false;
//     }
// }

const MyPool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  })

module.exports = MyPool;