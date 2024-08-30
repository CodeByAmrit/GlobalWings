-- Insert data into the Country table
INSERT INTO Country (name) VALUES
('India')
ON DUPLICATE KEY UPDATE name=name;

-- Insert data into the Type table
INSERT INTO Type (name) VALUES
('Fighter'),
('Transport'),
('Helicopter'),
('Trainer')
ON DUPLICATE KEY UPDATE name=name;

-- Insert data into the Aircraft table
INSERT INTO Aircraft (name, model, country_id, type_id) VALUES
-- Fighter Aircraft
('HAL Tejas', 'Mark 1', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Fighter')),
('HAL Marut', 'HF-24', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Fighter')),
('Sukhoi Su-30MKI', 'Sukhoi', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Fighter')),
('Dassault Mirage 2000', 'Mirage 2000H', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Fighter')),
('Mikoyan MiG-21 Bison', 'MiG-21', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Fighter')),
('Mikoyan MiG-29UPG', 'MiG-29UPG', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Fighter')),
('Dassault Rafale', 'Rafale B/C', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Fighter')),
('HAL C-130J Super Hercules', 'C-130J', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Transport')),
('Boeing C-17 Globemaster III', 'C-17', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Transport')),
('HAL Saras', 'Saras', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Transport')),
('HAL Dhruv', 'Dhruv ALH', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Helicopter')),
('HAL Rudra', 'Rudra ALH-WSI', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Helicopter')),
('HAL Light Combat Helicopter', 'LCH', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Helicopter')),
('HAL Chetak', 'Chetak', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Helicopter')),
('HAL Cheetah', 'Cheetah', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Helicopter')),
('HAL Light Utility Helicopter', 'LUH', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Helicopter')),
('HAL HPT-32 Deepak', 'HPT-32', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Trainer')),
('HAL HTT-40', 'HTT-40', (SELECT id FROM Country WHERE name = 'India'), (SELECT id FROM Type WHERE name = 'Trainer'));
INSERT INTO Specifications (aircraft_id, speed, _range, fuel_capacity, weight) VALUES
((SELECT id FROM Aircraft WHERE name = 'HAL Tejas' AND model = 'Mark 1'), 2205, 1850, 2458, 6500),
((SELECT id FROM Aircraft WHERE name = 'HAL Marut' AND model = 'HF-24'), 1112, 800, 3570, 6500),
((SELECT id FROM Aircraft WHERE name = 'Sukhoi Su-30MKI' AND model = 'Sukhoi'), 2120, 3000, 9700, 38800),
((SELECT id FROM Aircraft WHERE name = 'Dassault Mirage 2000' AND model = 'Mirage 2000H'), 2336, 1550, 3200, 7500),
((SELECT id FROM Aircraft WHERE name = 'Mikoyan MiG-21 Bison' AND model = 'MiG-21'), 2230, 1210, 2350, 5700),
((SELECT id FROM Aircraft WHERE name = 'Mikoyan MiG-29UPG' AND model = 'MiG-29UPG'), 2450, 1500, 3500, 11000),
((SELECT id FROM Aircraft WHERE name = 'Dassault Rafale' AND model = 'Rafale B/C'), 2130, 3700, 4700, 9900),
((SELECT id FROM Aircraft WHERE name = 'HAL C-130J Super Hercules' AND model = 'C-130J'), 671, 3000, 20700, 70300),
((SELECT id FROM Aircraft WHERE name = 'Boeing C-17 Globemaster III' AND model = 'C-17'), 830, 4500, 95000, 265000),
((SELECT id FROM Aircraft WHERE name = 'HAL Saras' AND model = 'Saras'), 550, 1200, 1800, 7500),
((SELECT id FROM Aircraft WHERE name = 'HAL Dhruv' AND model = 'Dhruv ALH'), 250, 630, 1100, 5500),
((SELECT id FROM Aircraft WHERE name = 'HAL Rudra' AND model = 'Rudra ALH-WSI'), 280, 630, 1100, 5800),
((SELECT id FROM Aircraft WHERE name = 'HAL Light Combat Helicopter' AND model = 'LCH'), 265, 550, 900, 5800),
((SELECT id FROM Aircraft WHERE name = 'HAL Chetak' AND model = 'Chetak'), 185, 500, 540, 2200),
((SELECT id FROM Aircraft WHERE name = 'HAL Cheetah' AND model = 'Cheetah'), 240, 540, 450, 1200),
((SELECT id FROM Aircraft WHERE name = 'HAL Light Utility Helicopter' AND model = 'LUH'), 235, 500, 400, 3100),
((SELECT id FROM Aircraft WHERE name = 'HAL HPT-32 Deepak' AND model = 'HPT-32'), 215, 900, 300, 1350),
((SELECT id FROM Aircraft WHERE name = 'HAL HTT-40' AND model = 'HTT-40'), 450, 1000, 500, 2800);
