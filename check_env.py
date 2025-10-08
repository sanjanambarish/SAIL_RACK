import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Print all environment variables
print("Environment Variables:")
for key, value in os.environ.items():
    if 'DATABASE' in key or 'POSTGRES' in key:
        print(f"{key}: {value}")

# Check if DATABASE_URL is set
db_url = os.getenv('DATABASE_URL')
print("\nDATABASE_URL:", db_url)

if not db_url:
    print("\n❌ DATABASE_URL is not set in environment variables")
    print("Current working directory:", os.getcwd())
    print("Files in current directory:", os.listdir('.'))
