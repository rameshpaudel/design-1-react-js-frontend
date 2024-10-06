import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserManagement.css'; // Import your CSS file

const UserManagement = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation
  const [activeButton, setActiveButton] = useState('User Management'); // Set default active button
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' }); // State for new user input
  const [showAddUserForm, setShowAddUserForm] = useState(false); // State for showing the form

  // Fetch users from localStorage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Handle user deletion
  const handleDelete = (email) => {
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Update localStorage
  };

  // Handle user editing
  const handleEdit = (email) => {
    const newEmail = prompt('Enter new email:', email);
    if (newEmail) {
      const updatedUsers = users.map(user => user.email === email ? { ...user, email: newEmail } : user);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers)); // Update localStorage
    }
  };

  // Handle user addition
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers)); // Update localStorage
      setNewUser({ name: '', email: '' }); // Reset form
      setShowAddUserForm(false); // Close form
    } else {
      alert('Please fill in all fields.'); // Alert if fields are empty
    }
  };

  // Handle navigation between different admin sections
  const handleButtonClick = (buttonName, route) => {
    navigate(route); // Navigate to the corresponding route
    setActiveButton(buttonName); // Set the active button
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="admin-info">
          <div className="admin-pic">
            <div className="admin-circle">A</div> {/* Placeholder for admin picture */}
          </div>
          <h2 className="admin-name">Admin Name</h2> {/* Display admin name */}
        </div>
        <nav className="nav-buttons">
          <button
            className={`nav-button ${activeButton === 'Dashboard' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Dashboard', '/admindash')} // Home route
          >
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </button>
          <button
            className={`nav-button ${activeButton === 'File Management' ? 'active' : ''}`}
            onClick={() => handleButtonClick('File Management', '/files')} // File Management route
          >
            <i className="fas fa-folder"></i> File Management
          </button>
          <button
            className={`nav-button ${activeButton === 'Reports' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Reports', '/reports')} // Reports route
          >
            <i className="fas fa-chart-line"></i> Reports
          </button>
          <button
            className={`nav-button ${activeButton === 'User Management' ? 'active' : ''}`}
            onClick={() => handleButtonClick('User Management', '/user')} // User Management route
          >
            <i className="fas fa-users"></i> User Management
          </button>
        </nav>
      </aside>
      <main className="main-content">
        <h1>Manage Registered Users</h1>
        <p>Total Users: {users.length}</p> {/* Display total users */}
        
        {/* Add User Button */}
        <button className="add-user-button" onClick={() => setShowAddUserForm(true)}>
          Add User
        </button>

        {/* Add User Form */}
        {showAddUserForm && (
          <div className="add-user-form">
            <input 
              type="text" 
              placeholder="Name" 
              value={newUser.name} 
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={newUser.email} 
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
            />
            <button class="add-user-button" onClick={handleAddUser}>Add</button>
            <button onClick={() => setShowAddUserForm(false)}>Cancel</button>
          </div>
        )}

        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.email}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(user.email)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(user.email)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default UserManagement;
