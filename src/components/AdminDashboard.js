import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './AdminDashboard.css';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
    const navigate = useNavigate(); // Initialize navigate for navigation  
    const [activeButton, setActiveButton] = useState('Dashboard'); // Default active button

    // Sample data for charts
    const userData = {
        labels: ['User 1', 'User 2', 'User 3', 'User 4', 'User 5'],
        datasets: [
            {
                label: 'Number of Users',
                data: [12, 19, 3, 5, 2],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const fileData = {
        labels: ['Malicious', 'Safe'],
        datasets: [
            {
                data: [30, 70],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
                hoverBackgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
            },
        ],
    };

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
                <h1>Welcome to the Admin Dashboard</h1> {/* Main content header */}
                <div className="charts-wrapper">
                    <div className="chart-container">
                        <h2>Number of Users</h2>
                        <Bar data={userData} options={{ responsive: true }} />
                    </div>
                    <div className="chart-container">
                        <h2>Status of Files</h2>
                        <Doughnut data={fileData} options={{ responsive: true }} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
