// src/components/FileDisplay.js
import React from 'react';
import './FileDisplay.css'; // Add styles here

const FileDisplay = () => {
    const files = [
        { name: 'File1.txt', type: 'File', url: 'https://example.com/file1' },
        { name: 'File2.txt', type: 'File', url: 'https://example.com/file2' },
        // Add more files here
    ];

    return (
        <div className="file-display">
            <h2>Your Files</h2>
            <ul>
                {files.map((file, index) => (
                    <li key={index} className="file-item">
                        <span>{file.name}</span>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-link"></i> {/* Example icon */}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileDisplay;
