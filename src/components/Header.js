// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Add styles here

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                MalwarePro
            </Link>
            <nav>
                <Link to="/login">Sign In</Link>
                <Link to="/register">Sign Up</Link>
            </nav>
        </header>
    );
};

export default Header;
