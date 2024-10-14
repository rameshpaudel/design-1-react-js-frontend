import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reports.css'; // Import your CSS file

const Reports = () => {
    const navigate = useNavigate(); // Initialize navigate for navigation
    const [activeButton, setActiveButton] = useState('Reports'); // Default active button
    const [scanHistory, setScanHistory] = useState([]); // State to hold scan history data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error

    useEffect(() => {
        // Fetch scan history from the API
        const fetchScanHistory = async () => {
            try {
                setLoading(true); // Start loading
                const response = await fetch('http://127.0.0.1:5000/dashboard/scan-history'); // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.success) {
                    setScanHistory(data.data); // Store the data in state
                } else {
                    setError("Failed to load scan history: " + data.message);
                }
            } catch (err) {
                setError('Failed to fetch scan history: ' + err.message); // Set error message
            } finally {
                setLoading(false); // Loading finished
            }
        };

        fetchScanHistory();
    }, []);

    // Function to handle button click and navigate
    const handleButtonClick = (buttonName, route) => {
        navigate(route);
        setActiveButton(buttonName); // Set the active button
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="admin-info">
                    <div className="admin-pic">
                        <div className="admin-circle">A</div> {/* Placeholder for admin picture */}
                    </div>
                    <h2 className="admin-name">Admin Name</h2> {/* Display admin name */}
                </div>
                <nav className="nav-buttons">
                    <button 
                        className={`nav-button ${activeButton === 'Dashboard' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('Dashboard', '/admindash')} // Home route
                    >
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                    </button>
                    <button 
                        className={`nav-button ${activeButton === 'File Management' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('File Management', '/files')} // File Management route
                    >
                        <i className="fas fa-folder"></i> File Management
                    </button>
                    <button 
                        className={`nav-button ${activeButton === 'Reports' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('Reports', '/reports')} // Reports route
                    >
                        <i className="fas fa-chart-line"></i> Reports
                    </button>
                    <button 
                        className={`nav-button ${activeButton === 'User Management' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('User Management', '/user')} // User Management route
                    >
                        <i className="fas fa-users"></i> User Management
                    </button>
                </nav>
            </aside>
            <main className="main-content">
                <h1>Scan Reports</h1>
                {loading ? (
                    <p>Loading reports...</p> // Loading state
                ) : error ? (
                    <p className="error">{error}</p> // Error message
                ) : (
                    <div className="reports-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>Hashed Name</th>
                                    <th>File Size</th>
                                    <th>Status</th>
                                    <th>Results</th>
                                    <th>Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scanHistory.length > 0 ? (
                                    scanHistory.map((scan) => (
                                        <tr key={scan.id}>
                                            <td>{scan.file_name}</td>
                                            <td>{scan.hashed_name}</td>
                                            <td>{scan.file_size}</td>
                                            <td className={scan.status === 'Malicious' ? 'malicious' : 'safe'}>
                                                {scan.status}
                                            </td>
                                            <td>{scan.results}</td>
                                            <td>{new Date(scan.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No scan history available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Reports;
