import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FilesManagement.css'; // Import your new CSS file

const FilesManagement = () => {
    const navigate = useNavigate(); // Initialize navigate for navigation
    const [activeButton, setActiveButton] = useState('File Management'); // Default active button
    const [files, setFiles] = useState([]); // State for managing files
    const [newFile, setNewFile] = useState({ name: '', date: '', size: '', maliciousSafe: true }); // State for new file input
    const [message, setMessage] = useState(''); // State for user feedback messages

    // Function to load files from local storage
    const loadFilesFromLocalStorage = () => {
        const storedFiles = localStorage.getItem('scannedFiles');
        if (storedFiles) {
            setFiles(JSON.parse(storedFiles)); // Parse and set the files from local storage
        }
    };

    // Load files from local storage on component mount
    useEffect(() => {
        loadFilesFromLocalStorage();
    }, []);

    // Function to handle button click and navigate
    const handleButtonClick = (buttonName, route) => {
        navigate(route); // Navigate to the corresponding route
        setActiveButton(buttonName); // Set the active button
    };

    // Input validation for new file
    const isValidFile = (file) => {
        // Check if all fields are filled
        if (!file.name || !file.date || !file.size) return false;

        // Validate size format (assuming size should end with 'MB' or 'KB')
        const sizeRegex = /^\d+(\.\d+)?\s*(MB|KB)$/;
        return sizeRegex.test(file.size);
    };

    // Handle file upload
    const handleFileUpload = () => {
        if (isValidFile(newFile)) {
            const updatedFiles = [
                ...files,
                {
                    ...newFile,
                    id: files.length + 1, // Assigning a new id
                }
            ];
            setFiles(updatedFiles); // Update files state
            localStorage.setItem('scannedFiles', JSON.stringify(updatedFiles)); // Save updated files to local storage
            setMessage('File uploaded successfully!'); // Set success message
            setNewFile({ name: '', date: '', size: '', maliciousSafe: true }); // Reset form
        } else {
            setMessage('Please fill in all fields correctly.'); // Alert if fields are empty or invalid
        }
    };

    // Handle file deletion with confirmation
    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this file?'); // Confirmation dialog
        if (confirmDelete) {
            const updatedFiles = files.filter(file => file.id !== id);
            setFiles(updatedFiles); // Update files state
            localStorage.setItem('scannedFiles', JSON.stringify(updatedFiles)); // Update local storage
            setMessage('File deleted successfully!'); // Set success message
        }
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

                {/* User feedback message */}
                {message && <div className="feedback-message">{message}</div>}

                {/* Add New File Form */}
                <div className="add-file-form">
                    <input 
                        type="text" 
                        placeholder="File Name" 
                        value={newFile.name} 
                        onChange={(e) => setNewFile({ ...newFile, name: e.target.value })} 
                    />
                    <input 
                        type="date" 
                        value={newFile.date} 
                        onChange={(e) => setNewFile({ ...newFile, date: e.target.value })} 
                    />
                    <input 
                        type="text" 
                        placeholder="Size (e.g., 2 MB)" 
                        value={newFile.size} 
                        onChange={(e) => setNewFile({ ...newFile, size: e.target.value })} 
                    />
                    <button className="upload-button" onClick={handleFileUpload}>Upload</button>
                </div>

                {/* Files Table */}
                <table className="files-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Date Uploaded</th>
                            <th>Size</th>
                            <th>Malicious Safe</th> {/* New header for Malicious Safe */}
                            <th>Actions</th> {/* Actions header for editing/deleting */}
                        </tr>
                    </thead>
                    <tbody>
                        {files.length > 0 ? (
                            files.map(file => (
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
                                    <td>
                                        <button className="delete-button" onClick={() => handleDelete(file.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No files found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default FilesManagement;
