import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate to programmatically navigate

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };

  // Function to handle Admin Login button click
  const handleAdminLogin = () => {
    navigate('/adminlogin'); // Navigate to the admin login page
  };

  return (
    <div className="login-container">
      <div className="inner-frame">
        <div className="left-column">
          <div className="sign-in-rectangle">
            <h2 style={{
              background: 'linear-gradient(292.13deg, #0A3C39 1.22%, #1BA29A 104.6%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'left',
              marginBottom: '20px',
            }}>Malware Pro</h2>
            <h3>See Malware Scout in Action</h3>
            <p style={{
              fontSize: '12px',
              color: '#333',
              textAlign: 'left',
              marginBottom: '10px',
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
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

              <button type="button" className="guest-button">Login as a Guest</button>
              <button type="button" className="admin-button" onClick={handleAdminLogin}>
                Administrator Login
              </button>
            </form>
          </div>
        </div>
        <div className="right-column">
          <div className="rectangle-35">
            {/* Content inside the rectangle, if any */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
