#!/bin/bash
echo "Setting up the environment and running the Flask application..."
cd flask-app
python3 -m venv venv  # Create a virtual environment (if not already created)
source venv/bin/activate  # Activate the virtual environment
pip install -r requirements.txt  # Install dependencies
python app.py  # Run the application
