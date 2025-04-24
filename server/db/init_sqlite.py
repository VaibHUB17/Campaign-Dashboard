import sqlite3
import os

def initialize_database():
    # Database file path
    db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "campaigns.db")
    
    # Read SQL from file
    sql_file_path = os.path.join(os.path.dirname(__file__), "init_db.sql")
    with open(sql_file_path, 'r') as f:
        sql_script = f.read()
    
    # Connect to SQLite database (creates it if it doesn't exist)
    print(f"Initializing SQLite database at: {db_path}")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Execute the SQL script
    try:
        cursor.executescript(sql_script)
        conn.commit()
        print("Database initialized successfully!")
        
        # Verify data was inserted
        cursor.execute("SELECT COUNT(*) FROM campaigns")
        count = cursor.fetchone()[0]
        print(f"Inserted {count} campaign records.")
        
    except sqlite3.Error as e:
        print(f"Database error: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    initialize_database()