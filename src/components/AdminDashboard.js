import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './AdminDashboard.css';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
    const navigate = useNavigate(); // Initialize navigate for navigation  
    const [activeButton, setActiveButton] = useState('Dashboard'); // Default active button
    const [userCount, setUserCount] = useState(0); // State to store the number of users
    const [fileData, setFileData] = useState({ malicious: 0, safe: 0 }); // State to store file data

    useEffect(() => {
        // Fetch user data from local storage when the component mounts
        const users = JSON.parse(localStorage.getItem('users')) || [];
        setUserCount(users.length); // Update the user count state

        // Fetch file data from local storage
        const files = JSON.parse(localStorage.getItem('scannedFiles')) || [];
        const maliciousCount = files.filter(file => !file.maliciousSafe).length; // Count malicious files
        const safeCount = files.filter(file => file.maliciousSafe).length; // Count safe files
        setFileData({ malicious: maliciousCount, safe: safeCount }); // Update the file data state
    }, []);

    // Sample data for charts with dynamic user count
    const userData = {
        labels: ['Total Users'], // Single label for total users
        datasets: [
            {
                label: 'Number of Users',
                data: [userCount], // Update the data to reflect the actual user count
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Update fileData for charts
    const chartFileData = {
        labels: ['Malicious', 'Safe'],
        datasets: [
            {
                data: [fileData.malicious, fileData.safe], // Use the actual file counts
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
                hoverBackgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
            },
        ],
    };

    // Function to handle button click and navigate
    const handleButtonClick = (buttonName, route) => {
        navigate(route); // Navigate to the corresponding route
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
                        <Doughnut data={chartFileData} options={{ responsive: true }} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
