// Assuming the connection is already set up in db.js
const express = require('express');
const router = express.Router();
const { getConnection, pool } = require('../config/db');
const Aircraft = require('../models/aircraftModel');

router.get('/', async (req, res) => {
  try {
    const connection = await getConnection();

    const [rows] = await connection.query(`SELECT * FROM AircraftDetails`);
    // console.log(rows);

    connection.release();

    res.render('index', { aircraft: rows });
  } catch (error) {
    console.error('Error fetching aircraft data:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get("/viewer/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const connection = await pool.getConnection();

    try {
      const result = await Aircraft.getById(id, connection);

      if (result.length === 0) {
        return res.status(404).json({ message: 'Aircraft not found' }); // 404 Not Found
      }

      const oneCraftData = {aircraft: result[0]}
      console.log(oneCraftData);
      
      res.status(200).render("viewer", oneCraftData); // 200 OK
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  } catch (error) {
    console.error('Error fetching aircraft by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching aircraft data' }); // 500 Internal Server Error
  }

})

module.exports = router;
