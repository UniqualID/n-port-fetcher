import React from 'react';

const HoldingsTable = ({ holdings, cik }) => {
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

    if (!holdings || holdings.length === 0) {
        return null;
    }

    return (
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
    );
};

export default HoldingsTable; 