import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reports.css'; // Import your CSS file

const Reports = () => {
    const navigate = useNavigate(); // Initialize navigate for navigation
    const [activeButton, setActiveButton] = useState('Reports'); // Default active button
    const [reports, setReports] = useState([]); // State to hold reports data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error

    useEffect(() => {
        // Fetch reports from a dummy API
        const fetchReports = async () => {
            try {
                setLoading(true); // Start loading
                // Using a dummy API endpoint for testing
                const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // Transforming dummy data to match your report structure
                const transformedReports = data.slice(0, 5).map((item, index) => ({
                    id: index + 1,
                    file: item.title, // Using title as a file name
                    status: index % 2 === 0 ? 'Malicious' : 'Safe', // Alternating status for testing
                    date: new Date().toLocaleDateString(), // Current date
                }));

                setReports(transformedReports); // Set the fetched reports
            } catch (err) {
                setError('Failed to fetch reports: ' + err.message); // Set error message
            } finally {
                setLoading(false); // Loading finished
            }
        };

        fetchReports();
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
                                    <th>Status</th>
                                    <th>Date Scanned</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map(report => (
                                    <tr key={report.id}>
                                        <td>{report.file}</td>
                                        <td className={report.status === 'Malicious' ? 'malicious' : 'safe'}>
                                            {report.status}
                                        </td>
                                        <td>{report.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Reports;
