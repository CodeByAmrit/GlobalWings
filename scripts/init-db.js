const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '../database/globalwings.sqlite');

// Ensure database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Remove existing database to start fresh
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const db = new Database(dbPath, { verbose: console.log });

// Create Tables
db.exec(`
  CREATE TABLE Country (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );

  CREATE TABLE Type (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );

  CREATE TABLE Aircraft (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    model TEXT,
    country_id INTEGER,
    type_id INTEGER,
    model_path TEXT,
    FOREIGN KEY (country_id) REFERENCES Country(id),
    FOREIGN KEY (type_id) REFERENCES Type(id)
  );

  CREATE TABLE Specifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aircraft_id INTEGER,
    speed REAL,
    _range REAL,
    fuel_capacity REAL,
    weight REAL,
    FOREIGN KEY (aircraft_id) REFERENCES Aircraft(id)
  );

  CREATE VIEW AircraftDetails AS
  SELECT 
      a.id AS aircraft_id,
      a.name AS aircraft_name,
      a.model AS aircraft_model,
      c.name AS country_name,
      t.name AS type_name,
      a.model_path AS model_path,
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
`);

// Insert Countries
const countries = [
  'USA',
  'Russia',
  'China',
  'India',
  'France',
  'UK',
  'Germany',
  'Japan',
  'South Korea',
  'Brazil',
  'European Union',
];
const insertCountry = db.prepare(
  'INSERT OR IGNORE INTO Country (name) VALUES (?)',
);
countries.forEach((name) => insertCountry.run(name));

// Insert Types
const types = [
  'Fighter',
  'Transport',
  'Bomber',
  'Reconnaissance',
  'Trainer',
  'Helicopter',
];
const insertType = db.prepare('INSERT OR IGNORE INTO Type (name) VALUES (?)');
types.forEach((name) => insertType.run(name));

// Aircraft Data
const aircraftData = [
  // International Fleet (Original)
  {
    name: 'F-22 Raptor',
    model: 'Lockheed Martin',
    country: 'USA',
    type: 'Fighter',
    speed: 2500,
    range: 2000,
    fuel: 8000,
    weight: 19000,
    model_path: '/models/2.glb',
  },
  {
    name: 'Su-57',
    model: 'Sukhoi',
    country: 'Russia',
    type: 'Fighter',
    speed: 2600,
    range: 3000,
    fuel: 11000,
    weight: 25000,
    model_path: '/models/sukhoi_su-57.glb',
  },
  {
    name: 'J-20',
    model: 'Chengdu Aerospace',
    country: 'China',
    type: 'Fighter',
    speed: 2100,
    range: 1500,
    fuel: 7000,
    weight: 14000,
    model_path: '/models/3.glb',
  },
  {
    name: 'Eurofighter Typhoon',
    model: 'Eurofighter',
    country: 'European Union',
    type: 'Fighter',
    speed: 2490,
    range: 2900,
    fuel: 5800,
    weight: 11500,
    model_path: '/models/4.glb',
  },
  {
    name: 'Dassault Rafale',
    model: 'Dassault',
    country: 'France',
    type: 'Fighter',
    speed: 1910,
    range: 3700,
    fuel: 4700,
    weight: 10600,
    model_path: '/models/5.glb',
  },
  {
    name: 'F/A-18 Hornet',
    model: 'Boeing',
    country: 'USA',
    type: 'Fighter',
    speed: 1910,
    range: 2000,
    fuel: 4000,
    weight: 11500,
    model_path: '/models/6.glb',
  },
  {
    name: 'C-130 Hercules',
    model: 'Lockheed Martin',
    country: 'USA',
    type: 'Transport',
    speed: 540,
    range: 3800,
    fuel: 20000,
    weight: 34000,
    model_path: '/models/7.glb',
  },
  {
    name: 'A400M Atlas',
    model: 'Airbus',
    country: 'France',
    type: 'Transport',
    speed: 780,
    range: 9000,
    fuel: 51000,
    weight: 120000,
    model_path: '/models/9.glb',
  },
  {
    name: 'Il-76',
    model: 'Ilyushin',
    country: 'Russia',
    type: 'Transport',
    speed: 800,
    range: 5000,
    fuel: 45000,
    weight: 170000,
    model_path: '/models/10.glb',
  },
  {
    name: 'C-17 Globemaster III',
    model: 'Boeing',
    country: 'USA',
    type: 'Transport',
    speed: 830,
    range: 4500,
    fuel: 52000,
    weight: 265000,
    model_path: '/models/11.glb',
  },
  {
    name: 'B-2 Spirit',
    model: 'Northrop Grumman',
    country: 'USA',
    type: 'Bomber',
    speed: 1010,
    range: 11000,
    fuel: 50000,
    weight: 71000,
    model_path: '/models/12.glb',
  },
  {
    name: 'Tupolev Tu-160',
    model: 'Tupolev',
    country: 'Russia',
    type: 'Bomber',
    speed: 2200,
    range: 12200,
    fuel: 250000,
    weight: 275000,
    model_path: '/models/13.glb',
  },
  {
    name: 'Global Hawk',
    model: 'Northrop Grumman',
    country: 'USA',
    type: 'Reconnaissance',
    speed: 575,
    range: 22000,
    fuel: 10000,
    weight: 14000,
    model_path: '/models/14.glb',
  },
  {
    name: 'T-38 Talon',
    model: 'Northrop',
    country: 'USA',
    type: 'Trainer',
    speed: 1160,
    range: 2400,
    fuel: 6000,
    weight: 6500,
    model_path: '/models/17.glb',
  },

  // New Scraped/Requested Data
  {
    name: 'F-35 Lightning II',
    model: 'Lockheed Martin',
    country: 'USA',
    type: 'Fighter',
    speed: 1960,
    range: 2200,
    fuel: 8300,
    weight: 13300,
    model_path: '/models/2.glb',
  },
  {
    name: 'Sukhoi Su-35',
    model: 'Sukhoi',
    country: 'Russia',
    type: 'Fighter',
    speed: 2400,
    range: 3600,
    fuel: 11500,
    weight: 18400,
    model_path: '/models/sukhoi_su-57.glb',
  },
  {
    name: 'MiG-35',
    model: 'Mikoyan',
    country: 'Russia',
    type: 'Fighter',
    speed: 2400,
    range: 2100,
    fuel: 4800,
    weight: 11000,
    model_path: '/models/3.glb',
  },
  {
    name: 'Chengdu J-10',
    model: 'Chengdu',
    country: 'China',
    type: 'Fighter',
    speed: 2200,
    range: 1850,
    fuel: 4900,
    weight: 9750,
    model_path: '/models/3.glb',
  },
  {
    name: 'B-52 Stratofortress',
    model: 'Boeing',
    country: 'USA',
    type: 'Bomber',
    speed: 1045,
    range: 14200,
    fuel: 181000,
    weight: 83000,
    model_path: '/models/12.glb',
  },
  {
    name: 'C-5 Galaxy',
    model: 'Lockheed',
    country: 'USA',
    type: 'Transport',
    speed: 855,
    range: 4440,
    fuel: 193000,
    weight: 172000,
    model_path: '/models/11.glb',
  },
  {
    name: 'P-8 Poseidon',
    model: 'Boeing',
    country: 'USA',
    type: 'Reconnaissance',
    speed: 907,
    range: 2222,
    fuel: 34000,
    weight: 62000,
    model_path: '/models/14.glb',
  },
  {
    name: 'MQ-9 Reaper',
    model: 'General Atomics',
    country: 'USA',
    type: 'Reconnaissance',
    speed: 482,
    range: 1900,
    fuel: 1815,
    weight: 2223,
    model_path: '/models/14.glb',
  },
  {
    name: 'V-22 Osprey',
    model: 'Bell/Boeing',
    country: 'USA',
    type: 'Transport',
    speed: 509,
    range: 1627,
    fuel: 7800,
    weight: 15000,
    model_path: '/models/2.glb',
  },
  {
    name: 'AH-64 Apache',
    model: 'Boeing',
    country: 'USA',
    type: 'Helicopter',
    speed: 293,
    range: 480,
    fuel: 1420,
    weight: 5165,
    model_path: '/models/2.glb',
  },
  {
    name: 'CH-47 Chinook',
    model: 'Boeing',
    country: 'USA',
    type: 'Helicopter',
    speed: 315,
    range: 741,
    fuel: 3914,
    weight: 11148,
    model_path: '/models/2.glb',
  },
  {
    name: 'Airbus A380',
    model: 'Airbus',
    country: 'European Union',
    type: 'Transport',
    speed: 903,
    range: 14800,
    fuel: 320000,
    weight: 277000,
    model_path: '/models/9.glb',
  },
  {
    name: 'Boeing 747',
    model: 'Boeing',
    country: 'USA',
    type: 'Transport',
    speed: 933,
    range: 13450,
    fuel: 238000,
    weight: 183000,
    model_path: '/models/11.glb',
  },
  {
    name: 'Embraer Phenom 300',
    model: 'Embraer',
    country: 'Brazil',
    type: 'Transport',
    speed: 839,
    range: 3650,
    fuel: 2430,
    weight: 5350,
    model_path: '/models/17.glb',
  },

  // Indian Fleet (from previous sql)
  {
    name: 'HAL Tejas',
    model: 'Mark 1',
    country: 'India',
    type: 'Fighter',
    speed: 2205,
    range: 1850,
    fuel: 2458,
    weight: 6500,
    model_path: '/models/hal_tejas.glb',
  },
  {
    name: 'HAL Marut',
    model: 'HF-24',
    country: 'India',
    type: 'Fighter',
    speed: 1112,
    range: 800,
    fuel: 3570,
    weight: 6500,
    model_path: '/models/2.glb',
  },
  {
    name: 'Sukhoi Su-30MKI',
    model: 'Sukhoi',
    country: 'India',
    type: 'Fighter',
    speed: 2120,
    range: 3000,
    fuel: 9700,
    weight: 38800,
    model_path: '/models/sukhoi_su-57.glb',
  },
  {
    name: 'Dassault Mirage 2000',
    model: 'Mirage 2000H',
    country: 'India',
    type: 'Fighter',
    speed: 2336,
    range: 1550,
    fuel: 3200,
    weight: 7500,
    model_path: '/models/4.glb',
  },
  {
    name: 'Mikoyan MiG-21 Bison',
    model: 'MiG-21',
    country: 'India',
    type: 'Fighter',
    speed: 2230,
    range: 1210,
    fuel: 2350,
    weight: 5700,
    model_path: '/models/3.glb',
  },
  {
    name: 'Mikoyan MiG-29UPG',
    model: 'MiG-29UPG',
    country: 'India',
    type: 'Fighter',
    speed: 2450,
    range: 1500,
    fuel: 3500,
    weight: 11000,
    model_path: '/models/6.glb',
  },
  {
    name: 'HAL C-130J Super Hercules',
    model: 'C-130J',
    country: 'India',
    type: 'Transport',
    speed: 671,
    range: 3000,
    fuel: 20700,
    weight: 70300,
    model_path: '/models/7.glb',
  },
  {
    name: 'HAL Saras',
    model: 'Saras',
    country: 'India',
    type: 'Transport',
    speed: 550,
    range: 1200,
    fuel: 1800,
    weight: 7500,
    model_path: '/models/9.glb',
  },
  {
    name: 'HAL Dhruv',
    model: 'Dhruv ALH',
    country: 'India',
    type: 'Helicopter',
    speed: 250,
    range: 630,
    fuel: 1100,
    weight: 5500,
    model_path: '/models/2.glb',
  },
  {
    name: 'HAL Rudra',
    model: 'Rudra ALH-WSI',
    country: 'India',
    type: 'Helicopter',
    speed: 280,
    range: 630,
    fuel: 1100,
    weight: 5800,
    model_path: '/models/2.glb',
  },
  {
    name: 'HAL Light Combat Helicopter',
    model: 'LCH',
    country: 'India',
    type: 'Helicopter',
    speed: 265,
    range: 550,
    fuel: 900,
    weight: 5800,
    model_path: '/models/2.glb',
  },
  {
    name: 'HAL Chetak',
    model: 'Chetak',
    country: 'India',
    type: 'Helicopter',
    speed: 185,
    range: 500,
    fuel: 540,
    weight: 2200,
    model_path: '/models/2.glb',
  },
  {
    name: 'HAL Cheetah',
    model: 'Cheetah',
    country: 'India',
    type: 'Helicopter',
    speed: 240,
    range: 540,
    fuel: 450,
    weight: 1200,
    model_path: '/models/2.glb',
  },
  {
    name: 'HAL Light Utility Helicopter',
    model: 'LUH',
    country: 'India',
    type: 'Helicopter',
    speed: 235,
    range: 500,
    fuel: 400,
    weight: 3100,
    model_path: '/models/2.glb',
  },
  {
    name: 'HAL HPT-32 Deepak',
    model: 'HPT-32',
    country: 'India',
    type: 'Trainer',
    speed: 215,
    range: 900,
    fuel: 300,
    weight: 1350,
    model_path: '/models/17.glb',
  },
  {
    name: 'HAL HTT-40',
    model: 'HTT-40',
    country: 'India',
    type: 'Trainer',
    speed: 450,
    range: 1000,
    fuel: 500,
    weight: 2800,
    model_path: '/models/17.glb',
  },
];

const insertAircraft = db.prepare(`
  INSERT INTO Aircraft (name, model, country_id, type_id, model_path) 
  VALUES (?, ?, (SELECT id FROM Country WHERE name = ?), (SELECT id FROM Type WHERE name = ?), ?)
`);

const insertSpecs = db.prepare(`
  INSERT INTO Specifications (aircraft_id, speed, _range, fuel_capacity, weight) 
  VALUES (?, ?, ?, ?, ?)
`);

aircraftData.forEach((item) => {
  const result = insertAircraft.run(
    item.name,
    item.model,
    item.country,
    item.type,
    item.model_path,
  );
  const aircraftId = result.lastInsertRowid;
  insertSpecs.run(aircraftId, item.speed, item.range, item.fuel, item.weight);
});

console.log('SQLite database initialized successfully at', dbPath);
db.close();
