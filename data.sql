-- Insert data into the Country table
INSERT INTO Country (name) VALUES
('USA'),
('Russia'),
('China'),
('India'),
('France'),
('UK'),
('Germany'),
('Japan'),
('South Korea'),
('Brazil')
ON DUPLICATE KEY UPDATE name=name;

-- Insert data into the Type table
INSERT INTO Type (name) VALUES
('Fighter'),
('Transport'),
('Bomber'),
('Reconnaissance'),
('Trainer')
ON DUPLICATE KEY UPDATE name=name;;

-- Insert data into the Aircraft table
INSERT INTO Aircraft (name, model, country_id, type_id) VALUES
('F-22 Raptor', 'Lockheed Martin', (SELECT id FROM Country WHERE name = 'USA'), (SELECT id FROM Type WHERE name = 'Fighter')),
('Su-57', 'Sukhoi', (SELECT id FROM Country WHERE name = 'Russia'), (SELECT id FROM Type WHERE name = 'Fighter')),
('J-20', 'Chengdu Aerospace', (SELECT id FROM Country WHERE name = 'China'), (SELECT id FROM Type WHERE name = 'Fighter')),
('Eurofighter Typhoon', 'Eurofighter', (SELECT id FROM Country WHERE name = 'UK'), (SELECT id FROM Type WHERE name = 'Fighter')),
('Dassault Rafale', 'Dassault', (SELECT id FROM Country WHERE name = 'France'), (SELECT id FROM Type WHERE name = 'Fighter')),
('F/A-18 Hornet', 'Boeing', (SELECT id FROM Country WHERE name = 'USA'), (SELECT id FROM Type WHERE name = 'Fighter')),
('C-130 Hercules', 'Lockheed Martin', (SELECT id FROM Country WHERE name = 'USA'), (SELECT id FROM Type WHERE name = 'Transport')),
('A400M Atlas', 'Airbus', (SELECT id FROM Country WHERE name = 'France'), (SELECT id FROM Type WHERE name = 'Transport')),
('Il-76', 'Ilyushin', (SELECT id FROM Country WHERE name = 'Russia'), (SELECT id FROM Type WHERE name = 'Transport')),
('C-17 Globemaster III', 'Boeing', (SELECT id FROM Country WHERE name = 'USA'), (SELECT id FROM Type WHERE name = 'Transport')),
('B-2 Spirit', 'Northrop Grumman', (SELECT id FROM Country WHERE name = 'USA'), (SELECT id FROM Type WHERE name = 'Bomber')),
('Tupolev Tu-160', 'Tupolev', (SELECT id FROM Country WHERE name = 'Russia'), (SELECT id FROM Type WHERE name = 'Bomber')),
('Global Hawk', 'Northrop Grumman', (SELECT id FROM Country WHERE name = 'USA'), (SELECT id FROM Type WHERE name = 'Reconnaissance')),
('T-38 Talon', 'Northrop', (SELECT id FROM Country WHERE name = 'USA'), (SELECT id FROM Type WHERE name = 'Trainer')),
('Hawk T1', 'BAE Systems', (SELECT id FROM Country WHERE name = 'UK'), (SELECT id FROM Type WHERE name = 'Trainer'));
INSERT INTO Specifications (aircraft_id, speed, _range, fuel_capacity, weight) VALUES
-- Fighter Aircraft
((SELECT id FROM Aircraft WHERE name = 'F-22 Raptor'), 2500, 2000, 8000, 19000),
((SELECT id FROM Aircraft WHERE name = 'Su-57'), 2600, 3000, 11000, 25000),
((SELECT id FROM Aircraft WHERE name = 'J-20'), 2100, 1500, 7000, 14000),
((SELECT id FROM Aircraft WHERE name = 'Eurofighter Typhoon'), 2490, 2900, 5800, 11500),
((SELECT id FROM Aircraft WHERE name = 'Dassault Rafale'), 1910, 3700, 4700, 10600),
((SELECT id FROM Aircraft WHERE name = 'F/A-18 Hornet'), 1910, 2000, 4000, 11500),
((SELECT id FROM Aircraft WHERE name = 'C-130 Hercules'), 540, 3800, 20000, 34000),
((SELECT id FROM Aircraft WHERE name = 'A400M Atlas'), 780, 9000, 51000, 120000),
((SELECT id FROM Aircraft WHERE name = 'Il-76'), 800, 5000, 45000, 170000),
((SELECT id FROM Aircraft WHERE name = 'C-17 Globemaster III'), 830, 4500, 52000, 265000),
((SELECT id FROM Aircraft WHERE name = 'B-2 Spirit'), 1010, 11000, 50000, 71000),
((SELECT id FROM Aircraft WHERE name = 'Tupolev Tu-160'), 2200, 12200, 250000, 275000),
((SELECT id FROM Aircraft WHERE name = 'Global Hawk'), 575, 22000, 10000, 14000),
((SELECT id FROM Aircraft WHERE name = 'T-38 Talon'), 1160, 2400, 6000, 6500),
((SELECT id FROM Aircraft WHERE name = 'Hawk T1'), 1100, 1100, 2200, 6000);
