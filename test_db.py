import os
from sqlalchemy import create_engine

# Database connection details
DB_USER = "sanjana"
DB_PASS = "@sanjanA5"
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "sail_rack"

# Create connection string
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

try:
    # Try to connect to the database
    engine = create_engine(DATABASE_URL)
    connection = engine.connect()
    print("✅ Successfully connected to the database!")
    
    # Test query
    result = connection.execute("SELECT version();")
    print("\nPostgreSQL Version:")
    print(result.fetchone()[0])
    
    connection.close()
    
except Exception as e:
    print("❌ Error connecting to the database:")
    print(str(e))
