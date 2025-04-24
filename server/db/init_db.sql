-- Drop table if it exists
DROP TABLE IF EXISTS campaigns;

-- Create campaigns table
CREATE TABLE campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Active', 'Paused')),
    clicks INTEGER NOT NULL,
    cost REAL NOT NULL,
    impressions INTEGER NOT NULL
);

-- Insert sample data
INSERT INTO campaigns (name, status, clicks, cost, impressions) VALUES
('Summer Sale', 'Active', 150, 45.99, 1000),
('Black Friday', 'Paused', 320, 89.50, 2500),
('Holiday Promotion', 'Active', 230, 65.75, 1850),
('Back to School', 'Paused', 180, 52.25, 1200),
('Spring Collection', 'Active', 210, 58.99, 1750),
('Cyber Monday', 'Active', 350, 95.25, 3200),
('End of Season', 'Paused', 140, 42.50, 950),
('New Year Special', 'Active', 275, 78.50, 2300),
('Flash Sale', 'Paused', 195, 55.75, 1500),
('Product Launch', 'Active', 290, 82.99, 2800);