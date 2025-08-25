from fastapi import FastAPI

# Create an instance of the FastAPI application
app = FastAPI()

# Define a route for the root URL
@app.get("/")
def read_root():
    return {"message": "Watchtower AI server is running!"}

# This is the endpoint our VS Code extension will call
@app.post("/analyze")
def analyze_dependencies():
    # For now, it just prints a message to the terminal
    print("Received a request to analyze dependencies!")

    # It returns a simple success message
    return {"status": "ok", "message": "Analysis request received"}