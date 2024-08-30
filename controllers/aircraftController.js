const { pool } = require('../config/db');
const Aircraft = require('../models/aircraftModel');

// Get all aircraft with filters
exports.getAllAircraft = async (req, res) => {
  try {
    const filters = {
      country: req.query.country,
      type: req.query.type,
      minSpeed: req.query.minSpeed,
      maxSpeed: req.query.maxSpeed,
      minRange: req.query.minRange,
      maxRange: req.query.maxRange,
    };
    
    const connection = await pool.getConnection();
    
    try {
      const results = await Aircraft.getAll(filters, connection);
      
      if (results.length === 0) {
        return res.status(404).json({ message: 'No aircraft found with the specified filters' });
      }
      
      res.status(200).json(results); // 200 OK
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  } catch (error) {
    console.error('Error fetching aircraft:', error);
    res.status(500).json({ error: 'An error occurred while fetching aircraft data' }); // 500 Internal Server Error
  }
};

// Get aircraft by ID
exports.getAircraftById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const connection = await pool.getConnection();
    
    try {
      const result = await Aircraft.getById(id, connection);
      
      if (result.length === 0) {
        return res.status(404).json({ message: 'Aircraft not found' }); // 404 Not Found
      }
      
      res.status(200).json(result[0]); // 200 OK
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  } catch (error) {
    console.error('Error fetching aircraft by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching aircraft data' }); // 500 Internal Server Error
  }
};
