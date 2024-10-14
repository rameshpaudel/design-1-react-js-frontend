
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ScanHistory.css'; // Optional: Add CSS styles if needed

const ScanHistory = () => {
    const [scanHistory, setScanHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchScanHistory = async () => {
            try {
                const token = localStorage.getItem('userToken'); // Retrieve token from local storage
                
                if (!token) {
                    setError('You need to be logged in to view your scan history.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://127.0.0.1:5000/dashboard/scan-history', {
                    headers: {
                        Authorization: `Bearer ${token}` // Send token for authentication
                    }
                });

                console.log('Scan history response:', response); // Debug log to check response
                if (response.data && response.data.success) {
                    setScanHistory(response.data.scanHistory);
                } else {
                    setError('Unable to fetch scan history.');
                }
            } catch (err) {
                console.error('Error fetching scan history:', err); // Log the error for debugging
                setError('An error occurred while fetching scan history.');
            } finally {
                setLoading(false);
            }
        };

        fetchScanHistory();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="scan-history-container">
            <h1>Your Scan History</h1>
            {scanHistory.length === 0 ? (
                <p>No scan history available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Scan Result</th>
                            <th>Scan Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scanHistory.map((scan, index) => (
                            <tr key={index}>
                                <td>{scan.file_name}</td>
                                <td>{scan.scan_result}</td>
                                <td>{new Date(scan.scan_date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ScanHistory;
