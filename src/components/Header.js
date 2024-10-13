import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = ({ isAuthenticated, setIsAuthenticated, setIsAdmin, userName, setUserName }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check for changes in localStorage for the token and username
        const token = localStorage.getItem('userToken');
        const storedUserName = localStorage.getItem('userName');

        if (token && storedUserName) {
            setIsAuthenticated(true);
            setUserName(storedUserName);
        } else {
            setIsAuthenticated(false);
            setUserName('');
        }
    }, [setIsAuthenticated, setUserName]);

    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:5000/logout', {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
            });

            // Clear localStorage and authentication states
            setIsAuthenticated(false);
            setIsAdmin(false);
            setUserName('');
            localStorage.removeItem('userToken');
            localStorage.removeItem('userName');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="header">
            <Link to="/" className="logo">MalwarePro</Link>
            <nav className="nav">
                {isAuthenticated && userName ? (
                    <>
                        <span className="user-name">{`Welcome, ${userName}`}</span>
                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <div>
                        <Link to="/login" className="nav-link">Sign In</Link>
                        <Link to="/register" className="nav-link">Sign Up</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
