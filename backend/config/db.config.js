//  import the mysql2 module promise wrapper
const mysql = require("mysql2/promise");
// define the connection parameters
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

//  create the connection pool
const pool = mysql.createPool(dbConfig);

// prepare a function that will execute the SQL queries asynchronously
async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}
//  export the query function for use in the application
module.exports = {
  query,
};
