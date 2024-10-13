import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = () => {
    const [activeTab, setActiveTab] = useState('file');
    const [file, setFile] = useState(null);
    const [link, setLink] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:5000//dashboard/scan-history', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus(`File uploaded: ${response.data.message}`);
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("File upload failed.");
        }
    };

    const handleLinkUpload = async () => {
        if (!link) {
            alert("Please enter a link to upload.");
            return;
        }

        try {
            const response = await axios.post('/api/upload/link', { link });
            setUploadStatus(`Link uploaded: ${response.data.message}`);
        } catch (error) {
            console.error("Error uploading link:", error);
            setUploadStatus("Link upload failed.");
        }
    };

    const switchTab = (tabName) => {
        setActiveTab(tabName);
        setUploadStatus(''); // Reset upload status when switching tabs
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

            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </div>
    );
};

export default FileUpload;
