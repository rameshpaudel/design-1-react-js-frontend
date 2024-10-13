import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
            const response = await axios.post('http://127.0.0.1:5000/login', userCredentials);
            if (response.status === 200) {
                const { isAdmin, userName, token } = response.data; // Ensure token is returned
                setIsAuthenticated(true);
                setIsAdmin(isAdmin);
                setUserName(userName); // Set username in state
                localStorage.setItem('userToken', token); // Save token to localStorage
                localStorage.setItem('userName', userName); // Save username to localStorage
                navigate('/'); // Redirect based on user type
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
