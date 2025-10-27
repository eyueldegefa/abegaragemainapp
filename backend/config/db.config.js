// import mysql2 module promise wrapper
const mysql = require('mysql2/promise');
// create the connection to database
const dbConfig ={
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
};
// create the connection pool
const pool = mysql.createPool(dbConfig);
// Prepare a function that will execute sql queries asynchronously
async function query(sql, params) {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
}
// export the query function
module.exports = { query };    