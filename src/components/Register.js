import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
        setError('Passwords do not match!');
        return;
    }

    const newUser = {
        username,
        name: fullName,
        email,
        password,
    };

    try {
        // POST request to backend
        const response = await axios.post('http://127.0.0.1:5000/register', newUser);

        // Check for a successful registration response
        if (response.status === 200) {
            console.log('Registration successful:', response.data);
            alert('Registration successful! Redirecting to login...');
            navigate('/login'); // Redirect to login
        }
    } catch (err) {
        // Handle errors
        const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
        setError(errorMessage);
        console.error('Error registering user:', errorMessage);
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
            <h3>Register an Account</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p style={{ fontSize: '12px', color: '#333', textAlign: 'left', marginBottom: '10px' }}>
              Create an account to access our Malware Pro features.
            </p>

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
              <button type="button" className="admin-button" onClick={() => navigate('/login')}>
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
