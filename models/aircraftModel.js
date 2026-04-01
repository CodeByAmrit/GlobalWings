const { pool } = require('../config/db');

/**
 * Aircraft Model
 * Handles data retrieval for aircraft from the SQLite database.
 */
const Aircraft = {
  /**
   * Get all aircraft with dynamic filters
   * @param {Object} filters - Search filters
   * @returns {Promise<Array>} - List of aircraft
   */
  getAll: async (filters = {}) => {
    let query = `
      SELECT a.id, a.name, a.model, c.name AS country, t.name AS type, a.model_path, s.speed, s._range, s.fuel_capacity, s.weight
      FROM Aircraft a
      JOIN Country c ON a.country_id = c.id
      JOIN Type t ON a.type_id = t.id
      JOIN Specifications s ON a.id = s.aircraft_id
      WHERE 1=1
    `;

    const queryParams = [];

    // Filter Logic
    const filterMap = {
      country: 'AND c.name = ?',
      type: 'AND t.name = ?',
      minSpeed: 'AND s.speed >= ?',
      maxSpeed: 'AND s.speed <= ?',
      minRange: 'AND s._range >= ?',
      maxRange: 'AND s._range <= ?',
    };

    for (const [key, sql] of Object.entries(filterMap)) {
      if (filters[key]) {
        query += ` ${sql}`;
        queryParams.push(filters[key]);
      }
    }

    try {
      const [rows] = await pool.execute(query, queryParams);
      return rows;
    } catch (error) {
      console.error('Model Error (getAll):', error);
      throw error;
    }
  },

  /**
   * Get aircraft by unique ID
   * @param {number|string} id - Aircraft ID
   * @returns {Promise<Array>} - Aircraft details
   */
  getById: async (id) => {
    const query = `
      SELECT a.id, a.name, a.model, c.name AS country, t.name AS type, a.model_path, s.speed, s._range, s.fuel_capacity, s.weight
      FROM Aircraft a
      JOIN Country c ON a.country_id = c.id
      JOIN Type t ON a.type_id = t.id
      JOIN Specifications s ON a.id = s.aircraft_id
      WHERE a.id = ?
    `;

    try {
      const [rows] = await pool.execute(query, [id]);
      return rows;
    } catch (error) {
      console.error('Model Error (getById):', error);
      throw error;
    }
  },
};

module.exports = Aircraft;
