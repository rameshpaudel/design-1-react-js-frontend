import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FilesManagement.css'; // Import your new CSS file

const FilesManagement = () => {
    const navigate = useNavigate(); // Initialize navigate for navigation
    const [activeButton, setActiveButton] = useState('File Management'); // Default active button

    // Dummy files data
    const dummyFiles = [
        { id: 1, name: 'Report1.pdf', date: '2024-10-01', size: '2 MB', maliciousSafe: true },
        { id: 2, name: 'Presentation.pptx', date: '2024-09-25', size: '5 MB', maliciousSafe: false },
        { id: 3, name: 'Data.xlsx', date: '2024-09-20', size: '3 MB', maliciousSafe: true },
        { id: 4, name: 'Image.png', date: '2024-09-18', size: '1 MB', maliciousSafe: false },
        { id: 5, name: 'Document.docx', date: '2024-09-15', size: '2.5 MB', maliciousSafe: true },
    ];

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
                <h1>Welcome to Files Management</h1> {/* Main content header */}
                <p className="welcome-message">Here you can manage all your files effectively.</p>

                {/* Dummy Files Table */}
                <table className="files-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Date Uploaded</th>
                            <th>Size</th>
                            <th>Malicious Safe</th> {/* New header for Malicious Safe */}
                        </tr>
                    </thead>
                    <tbody>
                        {dummyFiles.map(file => (
                            <tr key={file.id}>
                                <td>{file.id}</td>
                                <td>{file.name}</td>
                                <td>{file.date}</td>
                                <td>{file.size}</td>
                                <td>
                                    {file.maliciousSafe ? (
                                        <span className="status-safe">✅ Safe</span>
                                    ) : (
                                        <span className="status-malicious">❌ Malicious</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default FilesManagement;
