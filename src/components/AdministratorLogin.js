import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AdministratorLogin.css'; // Import the CSS file

const AdministratorLogin = ({ setIsAdmin }) => { // Accept setIsAdmin as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Admin credentials
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';

    // Check if the input matches admin credentials
    if (email === adminEmail && password === adminPassword) {
      // Save admin token in local storage
      localStorage.setItem('adminToken', email); // Example token; ideally use a more secure method
      console.log('Logged in as Admin:', { email });

      setIsAdmin(true); // Update admin state
      navigate('/admindash'); // Redirect to the admin dashboard
    } else {
      console.log('Invalid login credentials');
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="inner-frame">
        <div className="left-column">
          <div className="sign-in-rectangle">
            <h2
              style={{
                background: 'linear-gradient(292.13deg, #0A3C39 1.22%, #1BA29A 104.6%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'left',
                marginBottom: '20px',
              }}
            >
              Malware Pro
            </h2>
            <h3>Administrator Login</h3>
            <p
              style={{
                fontSize: '12px',
                color: '#333',
                textAlign: 'left',
                marginBottom: '10px',
              }}
            >
              Please enter your admin credentials.
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
              <button type="submit" className="login-button">
                Login as Admin
              </button>
            </form>
          </div>
        </div>
        <div className="right-column">
          <div className="rectangle-35">{/* Content inside the rectangle, if any */}</div>
        </div>
      </div>
    </div>
  );
};

export default AdministratorLogin;
