import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpClient } from './api'; // Assuming you're using axios instance here
import './Login.css';

const Login = ({ setIsAuthenticated, setIsAdmin, setUserName }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill in both fields.');
            return;
        }

        const userCredentials = { username, password };

        try {
            const response = await httpClient.post('/login', userCredentials);
            if (response.status === 200) {
                const { token } = response.data; // Ensure token is returned
                localStorage.setItem('userToken', token); // Save token to localStorage

                // Get current user info
                const userInfo = await httpClient.get('/current-user');
                if (userInfo.status === 200) {
                    setIsAuthenticated(true);
                    const { role, username } = userInfo.data.data;
                    localStorage.setItem('userName', username);
                    setUserName(username); // Set username in state

                    // Check if the role is admin
                    if (role === 'admin') {
                        setIsAdmin(true);
                        navigate('/admindash'); // Redirect to admin dashboard
                    } else {
                        navigate('/'); // Redirect to user dashboard
                    }
                }
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
            setError(errorMessage);
            console.error('Error logging in:', errorMessage);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
