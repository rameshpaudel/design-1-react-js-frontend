// src/components/LandingPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FileDisplay from './FileDisplay'; // Ensure you have this component
import './LandingPage.css'; // Create styles if needed

const LandingPage = () => {
    const [stats, setStats] = useState({ malware_analysed: 0, total_scans: 0 }); // State for statistics
    const [error, setError] = useState(null); // State to manage error

    useEffect(() => {
        // Fetch statistics from the API
        const fetchStats = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/dashboard/stats');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStats(data); // Set statistics data
            } catch (err) {
                setError('Failed to fetch stats: ' + err.message); // Set error message for stats
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="landing-page">
            <h1>Welcome to MalwarePro</h1>
            <p>Your files and URLs are safe with us.</p>

            {/* Display statistics */}
            <div className="stats">
                <h2>Statistics</h2>
                {error ? (
                    <p className="error">{error}</p> // Display error if fetching fails
                ) : (
                    <>
                        <p>Malware Analysed: {stats.malware_analysed}</p>
                        <p>Total Scans: {stats.total_scans}</p>
                    </>
                )}
            </div>

     
            <div className="links-container">
                <Link to="/chat" className="landing-link">Chat with Us</Link>
                <Link to="/upload" className="landing-link">Upload Your File</Link>
            </div>
        </div>
    );
};

export default LandingPage;
