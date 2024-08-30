const express = require('express');
const router = express.Router();
const aircraftController = require('../controllers/aircraftController');

// Route to get all aircraft with filters
router.get('/aircraft', aircraftController.getAllAircraft);

// Route to get aircraft by ID
router.get('/aircraft/:id', aircraftController.getAircraftById);

module.exports = router;
