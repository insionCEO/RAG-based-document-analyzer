#!/bin/bash
# start-services.sh - Script to start both Node.js and Python services

# Activate virtual environment for Python
source /app/venv/bin/activate

# Start the Python RAG service in the background
echo "Starting Python RAG service..."
python main.py --host 127.0.0.1 --port 8000 --initialize &
PYTHON_PID=$!

# Give it a moment to initialize
sleep 2
echo "Python RAG service started with PID: $PYTHON_PID"

# Set environment variables for the Node.js service
export RAG_SERVICE_URL="http://localhost:8000"
export RAG_SERVICE_ENABLED="true"

# Start the Node.js application
echo "Starting Node.js Paperless-AI service..."
pm2-runtime ecosystem.config.js

# If Node.js exits, kill the Python service
kill $PYTHON_PID
