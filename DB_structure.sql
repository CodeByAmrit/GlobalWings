CREATE DATABASE IF NOT EXISTS AircraftDB;
USE AircraftDB;

-- Create the Country table
CREATE TABLE IF NOT EXISTS Country (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create the Type table
CREATE TABLE IF NOT EXISTS Type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create the Aircraft table
CREATE TABLE IF NOT EXISTS Aircraft (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    model VARCHAR(255),
    country_id INT,
    type_id INT,
    FOREIGN KEY (country_id) REFERENCES Country(id),
    FOREIGN KEY (type_id) REFERENCES Type(id)
);

-- Create the Specifications table
CREATE TABLE IF NOT EXISTS Specifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aircraft_id INT,
    speed FLOAT,
    _range FLOAT,
    fuel_capacity FLOAT,
    weight FLOAT,
    FOREIGN KEY (aircraft_id) REFERENCES Aircraft(id)
);
-- Create the view to get all details of aircraft with specifications
CREATE VIEW AircraftDetails AS
SELECT 
    a.id AS aircraft_id,
    a.name AS aircraft_name,
    a.model AS aircraft_model,
    c.name AS country_name,
    t.name AS type_name,
    s.speed AS aircraft_speed,
    s._range AS aircraft_range,
    s.fuel_capacity AS aircraft_fuel_capacity,
    s.weight AS aircraft_weight
FROM 
    Aircraft a
JOIN 
    Country c ON a.country_id = c.id
JOIN 
    Type t ON a.type_id = t.id
LEFT JOIN 
    Specifications s ON a.id = s.aircraft_id;

select * from `AircraftDetails`;
