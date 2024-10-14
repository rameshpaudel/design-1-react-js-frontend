import React, { useState } from 'react';
import { httpClient } from './api'; // Assuming you're using axios instance here
import './ScanFileUpload.css'; // Assuming you have a corresponding CSS file

const ScanFileUpload = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setUploadStatus('');

        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await httpClient.post('/scan/file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('userToken')}` // Include the token if needed
                }
            });

            if (response.status === 200) {
                setUploadStatus('File uploaded successfully!');
                // You can also handle any other response data here
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'File upload failed. Please try again.';
            setError(errorMessage);
            console.error('Error uploading file:', errorMessage);
        }
    };

    return (
        <div className="scan-file-upload-container">
            <h2>Upload File for Scanning</h2>
            <form onSubmit={handleSubmit} className="scan-file-upload-form">
                <div className="input-group">
                    <label htmlFor="file-upload">Select a file:</label>
                    <input
                        type="file"
                        id="file-upload"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit" className="upload-button">Upload</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {uploadStatus && <p style={{ color: 'green' }}>{uploadStatus}</p>}
        </div>
    );
};

export default ScanFileUpload;
