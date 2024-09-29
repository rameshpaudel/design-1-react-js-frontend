import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Import your CSS file

const FilesManagement = () => {
    const navigate = useNavigate(); // Initialize navigate for navigation
    const [activeButton, setActiveButton] = useState('Dashboard'); // Default active button

    // Function to handle button click and navigate
    const handleButtonClick = (buttonName, route) => {
        // Navigate to the corresponding route
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
                <h1>Welcome to the Files Management</h1> {/* Main content header */}
            </main>
        </div>
    );
};

export default FilesManagement;
