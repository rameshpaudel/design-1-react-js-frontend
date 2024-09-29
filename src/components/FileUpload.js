import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [link, setLink] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    const handleFileUpload = () => {
        // Handle file upload logic here
        alert(`File uploaded: ${file.name}`);
    };

    const handleLinkUpload = () => {
        // Handle link upload logic here
        alert(`Link uploaded: ${link}`);
    };

    return (
        <div className="file-upload-container">
            <h2 className="upload-title">Upload Your Files</h2>
            <div className="upload-option">
                <h3>Browse File Upload</h3>
                <input type="file" onChange={handleFileChange} />
                {file && <p>Selected File: {file.name}</p>}
                <button onClick={handleFileUpload} className="upload-button">Upload File</button>
            </div>
            <div className="upload-option">
                <h3>Link Upload</h3>
                <input 
                    type="text" 
                    placeholder="Paste your link here..." 
                    value={link} 
                    onChange={handleLinkChange} 
                />
                <button onClick={handleLinkUpload} className="upload-button">Upload Link</button>
            </div>
        </div>
    );
};

export default FileUpload;
