# N-Port Fetcher

A web application to fetch and display holdings from SEC N-PORT filings. Built with React frontend and FastAPI backend.

## Features

- Search holdings by CIK (Central Index Key)
- Sortable holdings table (by Name, Balance, Value)
- Real-time data from SEC filings
- Responsive design
- Clean, modern UI

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: FastAPI + Python
- **Deployment**: Vercel (Frontend) + Railway (Backend)

## Quick Start

### Local Development

1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Deployment

- **Frontend**: Deploy to Vercel using the `/frontend` directory
- **Backend**: Deploy to Railway using the `railway-backend` branch

## API Endpoints

- `GET /health` - Health check
- `GET /filers/{cik}/holdings` - Get holdings for a CIK
- `GET /docs` - Interactive API documentation

## Project Structure

```
n-port-fetcher/
├── frontend/          # React application
├── backend/           # FastAPI application
└── README.md
```

## License

MIT License
