const Aircraft = require('../models/aircraftModel');
const { pool } = require('../config/db');

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

    // In our new SQLite wrapper, we don't strictly need to get a connection first,
    // but we'll keep the pattern if the model expects it.
    const results = await Aircraft.getAll(filters);

    if (
      results.length === 0 &&
      Object.values(filters).some((v) => v !== undefined)
    ) {
      return res
        .status(404)
        .json({ message: 'No aircraft found with the specified filters' });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching aircraft:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching aircraft data' });
  }
};

// Get aircraft by ID
exports.getAircraftById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Aircraft.getById(id);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'Aircraft not found' });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error('Error fetching aircraft by ID:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching aircraft data' });
  }
};

// Add new aircraft
exports.addNewAircraft = async (req, res) => {
  const {
    name,
    model,
    country_id,
    type_id,
    speed,
    _range,
    fuel_capacity,
    weight,
    model_path,
  } = req.body;

  if (
    !name ||
    !model ||
    !country_id ||
    !type_id ||
    !speed ||
    !_range ||
    !fuel_capacity ||
    !weight
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Insert into Aircraft table
    const [aircraftResult] = await pool.execute(
      `INSERT INTO Aircraft (name, model, country_id, type_id, model_path) VALUES (?, ?, ?, ?, ?)`,
      [name, model, country_id, type_id, model_path || '/models/2.glb'],
    );

    const aircraftId = aircraftResult.insertId;

    // Insert into Specifications table
    await pool.execute(
      `INSERT INTO Specifications (aircraft_id, speed, _range, fuel_capacity, weight) VALUES (?, ?, ?, ?, ?)`,
      [aircraftId, speed, _range, fuel_capacity, weight],
    );

    res
      .status(201)
      .json({ message: 'Aircraft added successfully', id: aircraftId });
  } catch (error) {
    console.error('Error adding aircraft:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
