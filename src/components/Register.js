import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Register.css'; // Import the CSS file

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('Passwords do not match!');
      return;
    }
    console.log('Registering with:', { fullName, email, password });
  };

  // Function to navigate to the Sign In page
  const handleAdminLogin = () => {
    navigate('/login'); // Navigate to the Sign In page
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
            <h3>Register an Account</h3>
            <p style={{
              fontSize: '12px',
              color: '#333',
              textAlign: 'left',
              marginBottom: '10px',
            }}>
              Create an account to access our Malware Pro features.
            </p>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
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
              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <button type="submit" className="login-button">Register</button>
              <button type="button" className="admin-button" onClick={handleAdminLogin}>
                Sign In
              </button>
            </form>
          </div>
        </div>
        <div className="right-column">
          <div className="rectangle-35">
            {/* Additional content can go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
