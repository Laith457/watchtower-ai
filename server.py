from fastapi import FastAPI
from pydantic import BaseModel
import json
import logging # Import the logging library

# Configure the logger to show messages
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define the structure of the data we expect to receive
class PackageData(BaseModel):
    content: str

# Create an instance of the FastAPI application
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Watchtower AI server is running!"}

@app.post("/analyze")
def analyze_dependencies(data: PackageData):
    logger.info("--- Analysis Request Received ---")
    
    try:
        # Parse the JSON string into a Python dictionary
        parsed_data = json.loads(data.content)
        
        # Now we can easily access specific data, like the project name
        project_name = parsed_data.get("name", "Unknown")
        
        logger.info(f"Successfully parsed JSON for project: {project_name}")

    except json.JSONDecodeError:
        logger.error("Error: Received content is not valid JSON.")

    logger.info("---------------------------------")
    
    return {"status": "ok", "message": f"Parsed project: {project_name}"}