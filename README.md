# N-Port Fetcher Backend

FastAPI backend service for fetching SEC N-PORT holdings data. This repository contains only the backend code for Railway deployment.

## Features

- Fetch holdings data from SEC N-PORT filings by CIK
- RESTful API with automatic documentation
- Health check endpoint for monitoring
- CORS configured for frontend integration

## Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.11
- **Deployment**: Railway

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /filers/{cik}/holdings` - Get holdings for a CIK
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation

## Local Development

### Prerequisites

- Python 3.11+
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/uniqualid/n-port-fetcher.git
cd n-port-fetcher

# Install dependencies
pip install -r backend/requirements.txt

# Run the development server
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- API: http://localhost:8000
- Documentation: http://localhost:8000/docs

## Railway Deployment

This branch is configured for Railway deployment with:

- `railway.json` - Railway configuration
- `Procfile` - Startup command
- `runtime.txt` - Python version specification

### Deploy to Railway

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose this repository and the `railway-backend` branch
5. Railway will automatically detect the Python configuration and deploy

### Environment Variables

Railway will automatically set:
- `PORT` - Port number for the service
- `PYTHON_VERSION` - Python version (3.11)

## Usage

### Example API Call

```bash
curl "https://your-railway-app.railway.app/filers/0000320193/holdings"
```

### Example Response

```json
[
  {
    "name": "APPLE INC",
    "cusip": "037833100",
    "balance": 1000000.0,
    "value": 150000000.0
  }
]
```

## Project Structure

```
backend/
├── main.py           # FastAPI application
├── crud.py           # Data validation utilities
├── requirements.txt  # Python dependencies
├── railway.json      # Railway configuration
├── Procfile          # Railway startup command
└── runtime.txt       # Python version
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License
