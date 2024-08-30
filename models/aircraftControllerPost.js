const { getConnection } = require('../config/db');

async function addNewAirCraft (req, res) {
    const { name, model, country_id, type_id, speed, _range, fuel_capacity, weight } = req.body;

    if (!name || !model || !country_id || !type_id || !speed || !_range || !fuel_capacity || !weight) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const connection = await getConnection();

        // Insert into Aircraft table
        const [aircraftResult] = await connection.execute(
            `INSERT INTO Aircraft (name, model, country_id, type_id) VALUES (?, ?, ?, ?)`,
            [name, model, country_id, type_id]
        );

        const aircraftId = aircraftResult.insertId;

        // Insert into Specifications table
        await connection.execute(
            `INSERT INTO Specifications (aircraft_id, speed, _range, fuel_capacity, weight) VALUES (?, ?, ?, ?, ?)`,
            [aircraftId, speed, _range, fuel_capacity, weight]
        );

        await connection.release();

        res.status(201).json({ message: 'Aircraft added successfully' });
    } catch (error) {
        console.error('Error adding aircraft:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = addNewAirCraft;