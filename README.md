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
- **Deployment**: DigitalOcean App Platform

## Local Development

### Prerequisites

- Node.js 18+
- Python 3.11+
- Git

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Deployment to DigitalOcean App Platform

### Prerequisites

1. DigitalOcean account
2. GitHub repository with your code
3. DigitalOcean CLI (optional)

### Deployment Steps

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create DigitalOcean App**:
   - Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
   - Click "Create App"
   - Connect your GitHub repository
   - Select the repository: `your-username/n-port-fetcher`

3. **Configure Backend Service**:
   - Source Directory: `/backend`
   - Environment: Python
   - Build Command: (leave empty)
   - Run Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Instance Size: Basic XXS ($5/month)

4. **Configure Frontend Service**:
   - Source Directory: `/frontend`
   - Environment: Node.js
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Instance Size: Basic XXS ($5/month)

5. **Set Environment Variables**:
   - For Frontend:
     - `VITE_API_URL`: `https://backend-{app-name}.ondigitalocean.app`
   - For Backend:
     - `PYTHON_VERSION`: `3.11`

6. **Deploy**:
   - Click "Create Resources"
   - Wait for deployment to complete

### Environment Variables

The application uses these environment variables:

- `VITE_API_URL`: Backend API URL (set automatically by DigitalOcean)
- `PORT`: Port number (set automatically by DigitalOcean)

## API Endpoints

- `GET /health` - Health check
- `GET /filers/{cik}/holdings` - Get holdings for a CIK
- `GET /docs` - Interactive API documentation

## Project Structure

```
n-port-fetcher/
├── .do/
│   └── app.yaml          # DigitalOcean App Platform config
├── backend/
│   ├── main.py           # FastAPI application
│   ├── crud.py           # Data validation utilities
│   └── requirements.txt  # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main application component
│   │   ├── components/
│   │   │   └── HoldingsTable.jsx  # Holdings table component
│   │   └── App.css       # Styles
│   ├── package.json      # Node.js dependencies
│   └── vite.config.js    # Vite configuration
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License
