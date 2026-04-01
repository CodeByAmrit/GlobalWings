const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const Aircraft = require('../models/aircraftModel');

// Home page
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM AircraftDetails`);
    res.render('index', { aircraft: rows });
  } catch (error) {
    console.error('Error fetching aircraft data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Viewer page
router.get('/viewer/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Aircraft.getById(id);

    if (!result || result.length === 0) {
      return res.status(404).send('Aircraft not found');
    }

    res.render('viewer', { aircraft: result[0] });
  } catch (error) {
    console.error('Error fetching aircraft by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Other pages / testing
router.get('/others', (req, res) => {
  res.render('test');
});

module.exports = router;
