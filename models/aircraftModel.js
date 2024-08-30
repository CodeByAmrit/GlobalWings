const { pool } = require('../config/db');

const Aircraft = {
  // Get all aircraft with filters
  getAll: async (filters) => {
    const connection = await pool.getConnection();
    
    let query = `
      SELECT a.id, a.name, a.model, c.name AS country, t.name AS type, s.speed, s._range, s.fuel_capacity, s.weight
      FROM Aircraft a
      JOIN Country c ON a.country_id = c.id
      JOIN Type t ON a.type_id = t.id
      JOIN Specifications s ON a.id = s.aircraft_id
      WHERE 1=1
    `;
    
    const queryParams = [];

    // Apply filters
    if (filters.country) {
      query += " AND c.name = ?";
      queryParams.push(filters.country);
    }

    if (filters.type) {
      query += " AND t.name = ?";
      queryParams.push(filters.type);
    }

    if (filters.minSpeed) {
      query += " AND s.speed >= ?";
      queryParams.push(filters.minSpeed);
    }

    if (filters.maxSpeed) {
      query += " AND s.speed <= ?";
      queryParams.push(filters.maxSpeed);
    }

    if (filters.minRange) {
      query += " AND s._range >= ?";
      queryParams.push(filters.minRange);
    }

    if (filters.maxRange) {
      query += " AND s._range <= ?";
      queryParams.push(filters.maxRange);
    }

    const [rows] = await connection.execute(query, queryParams);
    connection.release(); // Release connection back to the pool after use
    return rows;
  },

  // Get aircraft by ID
  getById: async (id) => {
    const connection = await pool.getConnection();
    
    const query = `
      SELECT a.id, a.name, a.model, c.name AS country, t.name AS type, s.speed, s._range, s.fuel_capacity, s.weight
      FROM Aircraft a
      JOIN Country c ON a.country_id = c.id
      JOIN Type t ON a.type_id = t.id
      JOIN Specifications s ON a.id = s.aircraft_id
      WHERE a.id = ?
    `;
    
    const [rows] = await connection.execute(query, [id]);
    connection.release(); // Release connection back to the pool after use
    return rows;
  }
};

module.exports = Aircraft;
