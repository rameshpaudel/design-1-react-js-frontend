import React, { useState, useEffect } from 'react';

const LoginHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const loginHistory = JSON.parse(localStorage.getItem('loginHistory')) || [];
        setHistory(loginHistory);
    }, []);

    return (
        <div className="login-history-container">
            <h1>Login History</h1>
            {history.length === 0 ? (
                <p>No login history available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Login Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.email}</td>
                                <td>{entry.loginTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LoginHistory;
