const sql = require("mssql");

const config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  database: process.env.MSSQL_DATABASE,
  server: process.env.MSSQL_SERVER,
  port: parseInt(process.env.MSSQL_PORT, 10), 
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

let pool;

async function connect() {
  try {
    pool = await sql.connect(config); // Store the connection pool
    console.log("Connected to MSSQL server");
  } catch (err) {
    throw err;
  }
}

function getPool() {
  if (!pool) {
    throw new Error('Database not connected');
  }
  return pool; // Provide access to the connection pool
}

module.exports = {
  sql,
  connect,
  getPool,
};
