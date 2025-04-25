from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import argparse
import os
import sqlite3
import sys

from db.connection import engine, metadata
from db.schema import campaigns
from routers import campaigns as campaigns_router

# Create FastAPI application
app = FastAPI(
    title="Campaign Analytics API",
    description="API for Campaign Analytics Dashboard",
    version="0.1.0",
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(campaigns_router.router, tags=["campaigns"])

# Create root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to Campaign Analytics API"}

def init_db_from_sql():
    """Initialize the database using the SQL script"""
    print("Initializing database from SQL file...")
    db_path = os.path.join(os.path.dirname(__file__), "campaigns.db")
    sql_path = os.path.join(os.path.dirname(__file__), "db", "init_db.sql")
    
    # Check if SQL file exists
    if not os.path.exists(sql_path):
        print(f"Error: SQL file not found at {sql_path}")
        return False
    
    try:
        # Read SQL script
        with open(sql_path, 'r') as f:
            sql_script = f.read()
        
        # Connect to SQLite database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Execute SQL script
        cursor.executescript(sql_script)
        conn.commit()
        
        # Verify data
        cursor.execute("SELECT COUNT(*) FROM campaigns")
        count = cursor.fetchone()[0]
        print(f"Database initialized successfully with {count} campaign records!")
        conn.close()
        return True
    
    except Exception as e:
        print(f"Error initializing database: {e}")
        return False

# Create the database tables
@app.on_event("startup")
async def startup():
    # Create tables if they don't exist
    metadata.create_all(engine)

if __name__ == "__main__":
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Run Campaign Analytics API server')
    parser.add_argument('--init-db', action='store_true', help='Initialize database with SQL script')
    args = parser.parse_args()
    
    # Initialize database if requested
    if args.init_db:
        success = init_db_from_sql()
        if not success:
            print("Database initialization failed. Exiting...")
            sys.exit(1)
    
    # Run the server
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)