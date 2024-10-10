// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import FileDisplay from './FileDisplay'; // Ensure you have this component
import './LandingPage.css'; // Create styles if needed

const LandingPage = () => {
    return (
        <div className="landing-page">
            <h1>Welcome to MalwarePro</h1>
            <p>Your files and URLs are safe with us.</p>
            <FileDisplay /> {/* Display uploaded files */}
            <div className="links-container">
                <Link to="/chat" className="landing-link">Chat with Us</Link>
                <Link to="/upload" className="landing-link">Upload Your File</Link>
            </div>
        </div>
    );
};

export default LandingPage;
