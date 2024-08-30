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
