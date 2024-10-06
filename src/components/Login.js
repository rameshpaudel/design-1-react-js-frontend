import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Retrieve stored users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user exists with the entered email and password
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        console.log('Logging in with:', { email, password });
        localStorage.setItem('userToken', email); // Store the email as token
        setIsAuthenticated(true); // Update authentication state
        navigate('/'); // Redirect to the home page
    } else {
        console.error('Invalid email or password');
        alert('Invalid email or password. Please try again.'); // User feedback
    }
};


  const handleGuestLogin = () => {
    // Logic for guest login can go here if needed
    console.log('Logged in as a guest');
    setIsAuthenticated(true);
    navigate('/'); // Redirect to the home page as a guest
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              <button type="button" className="guest-button" onClick={handleGuestLogin}>
                Login as a Guest
              </button>
              <button type="button" className="admin-button" onClick={() => navigate('/adminlogin')}>
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
