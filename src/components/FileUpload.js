import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = () => {
    const [activeTab, setActiveTab] = useState('file'); // State to track the active tab
    const [file, setFile] = useState(null);
    const [link, setLink] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    const handleFileUpload = () => {
        alert(`File uploaded: ${file ? file.name : "No file selected"}`);
    };

    const handleLinkUpload = () => {
        alert(`Link uploaded: ${link}`);
    };

    const switchTab = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="file-upload-container">
            <h2 className="upload-title">Upload Your Files</h2>

            <div className="tabs">
                <button 
                    className={`tab ${activeTab === 'file' ? 'active' : ''}`} 
                    onClick={() => switchTab('file')}
                >
                    Browse Files
                </button>
                <button 
                    className={`tab ${activeTab === 'link' ? 'active' : ''}`} 
                    onClick={() => switchTab('link')}
                >
                    Link Upload
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'file' && (
                    <div className="upload-option">
                        <h3>Browse File Upload</h3>
                        <input type="file" onChange={handleFileChange} />
                        {file && <p>Selected File: {file.name}</p>}
                        <button onClick={handleFileUpload} className="upload-button">Upload File</button>
                    </div>
                )}
                {activeTab === 'link' && (
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
                )}
            </div>
        </div>
    );
};

export default FileUpload;
