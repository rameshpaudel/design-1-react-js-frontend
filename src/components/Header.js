import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Add styles here

const Header = ({ setIsAuthenticated, setIsAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login');
  };

  const userName = localStorage.getItem('userName');
  const isAdmin = !!localStorage.getItem('adminToken');

  return (
    <header className="header">
      <Link to="/" className="logo">
        MalwarePro
      </Link>
      <nav className="nav">
        {localStorage.getItem('userToken') || isAdmin ? (
          <>
            <span className="user-name">{isAdmin ? 'Welcome Admin' : `Welcome, ${userName}`}</span>
            {!isAdmin && (
              <Link to="/scan-history" className="nav-link scan-history-link">
                Scan History
              </Link>
            )}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Sign In</Link>
            <Link to="/register" className="nav-link">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
