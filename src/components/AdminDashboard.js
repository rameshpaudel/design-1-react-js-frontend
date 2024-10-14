import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios'; // For API requests
import './AdminDashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('Dashboard');
    const [userCount, setUserCount] = useState(0);
    const [fileData, setFileData] = useState({ malicious: 0, safe: 0 });

    // Fetch user data from API when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/dashboard/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token
                    }
                });
                setUserCount(response.data.data.length); // Update user count
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        // Fetch scan history data from the Reports API
        const fetchScanHistory = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/dashboard/scan-history', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const scanHistory = response.data.data || [];
                // Count malicious and safe files from scan history
                const maliciousCount = scanHistory.filter(scan => scan.status === 'Malicious').length;
                const safeCount = scanHistory.filter(scan => scan.status !== 'Malicious').length;
                setFileData({ malicious: maliciousCount, safe: safeCount });
            } catch (error) {
                console.error('Error fetching scan history:', error);
            }
        };

        fetchUserData(); // Fetch user data from the backend
        fetchScanHistory(); // Fetch scan history data from the API
    }, []);

    // Data for user count chart (fetched from backend)
    const userData = {
        labels: ['Total Users'],
        datasets: [
            {
                label: 'Number of Users',
                data: [userCount],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Data for file status chart (fetched from scan history API)
    const chartFileData = {
        labels: ['Malicious', 'Safe'],
        datasets: [
            {
                data: [fileData.malicious, fileData.safe],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
                hoverBackgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
            },
        ],
    };

    // Function to handle navigation when buttons are clicked
    const handleButtonClick = (buttonName, route) => {
        navigate(route); // Navigate to the corresponding route
        setActiveButton(buttonName); // Set the active button state
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="admin-info">
                    <div className="admin-pic">
                        <div className="admin-circle">A</div> {/* Placeholder for admin picture */}
                    </div>
                    <h2 className="admin-name">Admin Name</h2>
                </div>
                <nav className="nav-buttons">
                    <button 
                        className={`nav-button ${activeButton === 'Dashboard' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('Dashboard', '/admindash')}
                    >
                        <i className="fas fa-tachometer-alt"></i> Dashboard
                    </button>
                    <button 
                        className={`nav-button ${activeButton === 'File Management' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('File Management', '/files')}
                    >
                        <i className="fas fa-folder"></i> File Management
                    </button>
                    <button 
                        className={`nav-button ${activeButton === 'Reports' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('Reports', '/reports')}
                    >
                        <i className="fas fa-chart-line"></i> Reports
                    </button>
                    <button 
                        className={`nav-button ${activeButton === 'User Management' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('User Management', '/user')}
                    >
                        <i className="fas fa-users"></i> User Management
                    </button>
                </nav>
            </aside>
            <main className="main-content">
                <h1>Welcome to the Admin Dashboard</h1>
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
