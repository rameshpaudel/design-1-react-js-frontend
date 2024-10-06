import React from 'react';
import './ScanHistory.css';

const ScanHistory = () => {
    // Mock data for the scan history
    const scanHistory = [
        { id: 1, name: 'document1.pdf', type: 'file', date: '2024-10-03', result: 'Safe' },
        { id: 2, name: 'malware-link.com', type: 'link', date: '2024-09-29', result: 'Malicious' },
        { id: 3, name: 'image.png', type: 'file', date: '2024-09-25', result: 'Safe' },
        { id: 4, name: 'phishing-site.net', type: 'link', date: '2024-09-20', result: 'Malicious' },
    ];

    return (
        <div className="scan-history-container">
            <h2 className="scan-history-title">Scan History</h2>
            <table className="scan-history-table">
                <thead>
                    <tr>
                        <th>File/Link Name</th>
                        <th>Type</th>
                        <th>Date Scanned</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {scanHistory.map((entry) => (
                        <tr key={entry.id}>
                            <td>{entry.name}</td>
                            <td>{entry.type}</td>
                            <td>{entry.date}</td>
                            <td className={entry.result.toLowerCase()}>{entry.result}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScanHistory;
