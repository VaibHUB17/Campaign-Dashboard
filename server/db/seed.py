from sqlalchemy import insert
# Change relative imports to absolute imports
from db.connection import engine, metadata
from db.schema import campaigns

# Sample campaign data
sample_campaigns = [
    {"name": "Summer Sale", "status": "Active", "clicks": 150, "cost": 45.99, "impressions": 1000},
    {"name": "Black Friday", "status": "Paused", "clicks": 320, "cost": 89.50, "impressions": 2500},
    {"name": "Holiday Promotion", "status": "Active", "clicks": 230, "cost": 65.75, "impressions": 1850},
    {"name": "Back to School", "status": "Paused", "clicks": 180, "cost": 52.25, "impressions": 1200},
    {"name": "Spring Collection", "status": "Active", "clicks": 210, "cost": 58.99, "impressions": 1750},
    {"name": "Cyber Monday", "status": "Active", "clicks": 350, "cost": 95.25, "impressions": 3200},
    {"name": "End of Season", "status": "Paused", "clicks": 140, "cost": 42.50, "impressions": 950},
    {"name": "New Year Special", "status": "Active", "clicks": 275, "cost": 78.50, "impressions": 2300},
    {"name": "Flash Sale", "status": "Paused", "clicks": 195, "cost": 55.75, "impressions": 1500},
    {"name": "Product Launch", "status": "Active", "clicks": 290, "cost": 82.99, "impressions": 2800},
]

def seed_database():
    """Seed the database with sample campaign data"""
    print("Creating database tables...")
    metadata.create_all(engine)
    
    # Check if data already exists
    with engine.connect() as conn:
        result = conn.execute(campaigns.select().limit(1))
        if result.first() is None:
            print("Seeding campaigns table...")
            conn.execute(campaigns.insert(), sample_campaigns)
            conn.commit()
            print("Database seeded successfully!")
        else:
            print("Database already contains data, skipping seed.")

if __name__ == "__main__":
    seed_database()