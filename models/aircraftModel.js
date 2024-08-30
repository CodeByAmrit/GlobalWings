const { getConnection } = require('../config/db');

const Aircraft = {
  getAll: async (filters) => {
    const connection = await getConnection();
    
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
    await connection.end(); // Close connection after use
    return rows;
  },
};

module.exports = Aircraft;
