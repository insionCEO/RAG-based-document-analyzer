# Using the RAG Service in Development Mode

This guide explains how to run the Paperless-AI application with the RAG service in a local development environment without Docker.

## Understanding the Architecture

The integration consists of two main components:

1. **Python RAG Service (main.py)**: Handles document indexing, search, and context retrieval
2. **Node.js Integration**: Manages the UI, communicates with the Python service, and uses LLMs to generate responses

In production, both services run in the same Docker container, but for development, you can run them separately.

## Prerequisites

- Node.js 16+ for the main Paperless-AI application
- Python 3.10+ for the RAG service
- A running Paperless-NGX instance (for document access)

## Option 1: Run Both Services Together (Recommended)

1. Make sure you have all dependencies installed:

```bash
# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt
```

2. Configure your `.env` file in the `data` directory with your Paperless-NGX credentials:

```
PAPERLESS_API_URL=https://your-paperless-ngx-instance
PAPERLESS_API_TOKEN=your-api-token
```

**Note:** The Python service will also read the existing API settings from this file (PAPERLESS_API_URL).

3. Run both services using the provided script:

```bash
# Make the script executable first (Linux/macOS)
chmod +x start-services.sh

# Run the services
./start-services.sh
```

## Option 2: Run Services Separately

### Step 1: Set Up the Python RAG Service

1. Install Python dependencies:

```bash
pip install -r requirements.txt
```

2. Start the Python RAG service:

```bash
python main.py --host 127.0.0.1 --port 8000 --initialize
```

The `--initialize` flag will build the document index on startup.

### Step 2: Configure the Paperless-AI Application

1. Set the environment variables for the Node.js application:

For Windows (Command Prompt):
```cmd
set RAG_SERVICE_URL=http://localhost:8000
set RAG_SERVICE_ENABLED=true
```

For Windows (PowerShell):
```powershell
$env:RAG_SERVICE_URL="http://localhost:8000"
$env:RAG_SERVICE_ENABLED="true"
```

For Linux/macOS:
```bash
export RAG_SERVICE_URL=http://localhost:8000
export RAG_SERVICE_ENABLED=true
```

2. Start the Paperless-AI application in development mode:

```bash
npm run dev
```

## Accessing the RAG Interface

Open your browser and navigate to:

```
http://localhost:3000/rag
```

You should see the RAG interface where you can ask questions about your documents.

## Troubleshooting

### Environment Variables

- The Python service looks for these variables in this order:
  - For API URL: `PAPERLESS_API_URL`, then `PAPERLESS_URL`, then `PAPERLESS_NGX_URL`, then `PAPERLESS_HOST`
  - For API Token: `PAPERLESS_TOKEN`, then `PAPERLESS_API_TOKEN`, then `PAPERLESS_APIKEY`

- If you're using different variable names in your existing `.env` file, the Python service should still find them.

### Common Issues

- **Missing Documents**: Check that the indexing has completed. You can check the status at `http://localhost:8000/indexing/status`.
- **Connection Errors**: Ensure your Paperless-NGX credentials are correct and the instance is accessible.
- **Port Conflicts**: If port 8000 is already in use, specify a different port with the `--port` parameter and update the `RAG_SERVICE_URL` environment variable accordingly.

## Development Workflow

When making changes to the codebase:

1. **Python RAG Service Changes**: 
   - Edit `main.py`
   - Restart the Python service to apply changes

2. **Paperless-AI Integration Changes**:
   - Edit Node.js files (like `services/ragService.js` or `routes/rag.js`)
   - If using nodemon (with `npm run dev`), changes should be applied automatically
   - For UI changes to `views/rag.ejs`, refresh the browser
