CREATE USER 'jet'@'%' IDENTIFIED BY '';

-- Grant privileges to the new user
GRANT ALL PRIVILEGES ON AircraftDB.* TO 'jet'@'%';

-- Apply the changes
FLUSH PRIVILEGES;