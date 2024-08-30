const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: {
    ca: process.env.DB_CA
  },
  connectionLimit: 10 // Adjust based on your needs
});

async function getConnection() {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.error('Error getting connection from pool:', error);
    throw error;
  }
}

module.exports = {
  getConnection, pool
};
