// src/Header.js
import React from 'react';
import './Header.css'; // You can style the header here

const Header = () => {
  return (
    <div className="header">
      <h1 style={{ float: 'left', margin: '0', padding: '20px' }}>Malware Pro</h1>
      <div style={{ float: 'right', padding: '20px' }}>
        <a href="/signin" style={{ margin: '0 10px' }}>Sign In</a>
        <a href="/signup" style={{ margin: '0 10px' }}>Sign Up</a>
      </div>
    </div>
  );
};

export default Header;
