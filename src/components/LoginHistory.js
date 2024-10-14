import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLoginHistory = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/login-history', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}` // Use the correct token key
                    }
                });

                // Ensure the response contains success flag and data
                if (response.data && response.data.success && response.data.data) {
                    setHistory(response.data.data); // Set the history data
                } else {
                    throw new Error('No data found');
                }
            } catch (err) {
                console.error('Error fetching login history:', err);
                setError('Failed to fetch login history. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchLoginHistory();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="login-history-container">
            <h1>Login History</h1>
            {history.length === 0 ? (
                <p>No login history available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Login Time</th>
                            <th>Logout Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((entry, index) => (
                            <tr key={index}>
                                <td>{new Date(entry.login_time).toLocaleString()}</td>
                                <td>{entry.logout_time ? new Date(entry.logout_time).toLocaleString() : 'Still Logged In'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LoginHistory;
