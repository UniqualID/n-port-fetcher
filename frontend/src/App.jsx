import { useState } from 'react';
import './App.css';

function App() {
    const [cik, setCik] = useState('');
    const [holdings, setHoldings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchHoldings = async () => {
        if (!cik.trim()) {
            setError('Please enter a CIK');
            return;
        }

        setLoading(true);
        setError('');
        setHoldings([]);

        try {
            const response = await fetch(`http://localhost:8000/filers/${cik.trim()}/holdings`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to fetch holdings');
            }

            const data = await response.json();
            setHoldings(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchHoldings();
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatNumber = (value) => {
        return new Intl.NumberFormat('en-US').format(value);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>N-Port Holdings Fetcher</h1>
                <p>Enter a CIK to fetch the latest holdings from SEC filings</p>
            </header>

            <main className="app-main">
                <form onSubmit={handleSubmit} className="cik-form">
                    <div className="input-group">
                        <label htmlFor="cik">CIK Number:</label>
                        <input
                            type="text"
                            id="cik"
                            value={cik}
                            onChange={(e) => setCik(e.target.value)}
                            placeholder="e.g., 0000320193"
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" disabled={loading || !cik.trim()}>
                        {loading ? 'Fetching...' : 'Fetch Holdings'}
                    </button>
                </form>

                {error && (
                    <div className="error-message">
                        <p>Error: {error}</p>
                    </div>
                )}

                {loading && (
                    <div className="loading">
                        <p>Loading holdings...</p>
                    </div>
                )}

                {holdings.length > 0 && (
                    <div className="holdings-container">
                        <h2>Holdings for CIK: {cik}</h2>
                        <p className="holdings-count">
                            Found {holdings.length} holding{holdings.length !== 1 ? 's' : ''}
                        </p>
                        
                        <div className="holdings-table-container">
                            <table className="holdings-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>CUSIP</th>
                                        <th>Balance</th>
                                        <th>Value (USD)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {holdings.map((holding, index) => (
                                        <tr key={index}>
                                            <td>{holding.name}</td>
                                            <td>{holding.cusip}</td>
                                            <td>{formatNumber(holding.balance)}</td>
                                            <td>{formatCurrency(holding.value)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
