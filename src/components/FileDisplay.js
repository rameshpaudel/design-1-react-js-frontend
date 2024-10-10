// src/components/FileDisplay.js
import React, { useEffect, useState } from 'react';
import './FileDisplay.css'; // Add styles here

const FileDisplay = () => {
    const [files, setFiles] = useState([]); // State to hold the files

    // Load files from local storage on component mount
    useEffect(() => {
        const storedFiles = localStorage.getItem('scannedFiles'); // Get the files from local storage
        if (storedFiles) {
            setFiles(JSON.parse(storedFiles)); // Parse and set the files from local storage
        }
    }, []);

    return (
        <div className="file-display">
            <h2>Your Files</h2>
            {files.length > 0 ? ( // Check if files exist
                <table className="files-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date Uploaded</th>
                            <th>Size</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file) => (
                            <tr key={file.id}>
                                <td>{file.name}</td> {/* Display the file name */}
                                <td>{file.date}</td> {/* Display the upload date */}
                                <td>{file.size}</td> {/* Display the file size */}
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
            ) : (
                <p>No files uploaded yet.</p> // Message when there are no files
            )}
        </div>
    );
};

export default FileDisplay;
