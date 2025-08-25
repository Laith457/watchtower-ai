from fastapi import FastAPI
from pydantic import BaseModel
import json # Import Python's built-in JSON library

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
    print("--- Analysis Request Received ---")
    
    try:
        # --- NEW CODE STARTS HERE ---
        # Parse the JSON string into a Python dictionary
        parsed_data = json.loads(data.content)
        
        # Now we can easily access specific data, like the project name
        project_name = parsed_data.get("name", "Unknown")
        
        print(f"Successfully parsed JSON for project: {project_name}")
        # --- NEW CODE ENDS HERE ---

    except json.JSONDecodeError:
        print("Error: Received content is not valid JSON.")

    print("---------------------------------")
    
    return {"status": "ok", "message": f"Parsed project: {project_name}"}