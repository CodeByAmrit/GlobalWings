const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Read CA file content from environment variable
const caContent = process.env.DB_CA;

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,  // Default MySQL port
    ssl: caContent ? { ca: caContent } : undefined // Include SSL config if CA is provided
};

// Function to get a connection
async function getConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

module.exports = {
    getConnection
};
