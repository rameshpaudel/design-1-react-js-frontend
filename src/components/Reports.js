import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Import your CSS file

const Reports = () => {
    const navigate = useNavigate(); // Initialize navigate for navigation
    const [activeButton, setActiveButton] = useState('Reports'); // Default active button
    const [reports, setReports] = useState([]); // State to hold reports data

    // Sample data for reports (this would typically come from an API)
    useEffect(() => {
        // Replace with API call to fetch reports
        const fetchedReports = [
            { id: 1, file: 'file1.exe', status: 'Malicious', date: '2024-10-01' },
            { id: 2, file: 'file2.pdf', status: 'Safe', date: '2024-10-02' },
            { id: 3, file: 'file3.zip', status: 'Malicious', date: '2024-10-03' },
            { id: 4, file: 'file4.docx', status: 'Safe', date: '2024-10-04' },
        ];
        setReports(fetchedReports);
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
            </main>
        </div>
    );
};

export default Reports;
