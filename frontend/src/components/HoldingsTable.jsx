import React, { useState, useMemo } from 'react';

const HoldingsTable = ({ holdings, cik }) => {
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

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

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getSortIcon = (field) => {
        if (sortField !== field) {
            return '';
        }
        return sortDirection === 'asc' ? '▴' : '▾';
    };

    const sortedHoldings = useMemo(() => {
        if (!holdings || holdings.length === 0) return [];

        return [...holdings].sort((a, b) => {
            let aValue, bValue;

            switch (sortField) {
                case 'name':
                    aValue = a.name || '';
                    bValue = b.name || '';
                    break;
                case 'balance':
                    aValue = parseFloat(a.balance) || 0;
                    bValue = parseFloat(b.balance) || 0;
                    break;
                case 'value':
                    aValue = parseFloat(a.value) || 0;
                    bValue = parseFloat(b.value) || 0;
                    break;
                default:
                    aValue = a.name || '';
                    bValue = b.name || '';
            }

            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [holdings, sortField, sortDirection]);

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
                            <th 
                                className="sortable-header"
                                onClick={() => handleSort('name')}
                            >
                                Name {getSortIcon('name')}
                            </th>
                            <th>CUSIP</th>
                            <th 
                                className="sortable-header"
                                onClick={() => handleSort('balance')}
                            >
                                Balance {getSortIcon('balance')}
                            </th>
                            <th 
                                className="sortable-header"
                                onClick={() => handleSort('value')}
                            >
                                Value (USD) {getSortIcon('value')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedHoldings.map((holding, index) => (
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