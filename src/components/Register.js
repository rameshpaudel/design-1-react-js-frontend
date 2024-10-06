import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!'); // Feedback to user
      return;
    }

    // Retrieve existing users from local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Create new user object
    const newUser = {
      name: fullName,
      email,
      password, // Note: Storing passwords in plain text is not secure; consider better practices for real applications
    };

    // Add new user to the existing users array
    existingUsers.push(newUser);

    // Save updated users array back to local storage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Save the userName to local storage for display in Header
    localStorage.setItem('userName', fullName); // Store user's full name

    console.log('Registered with:', { fullName, email });
    navigate('/login'); // Redirect to the login page after registration
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
            <p
              style={{
                fontSize: '12px',
                color: '#333',
                textAlign: 'left',
                marginBottom: '10px',
              }}
            >
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
