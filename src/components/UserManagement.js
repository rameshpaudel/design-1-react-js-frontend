import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserManagement.css'; // Import your CSS file

const UserManagement = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('User Management');
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Adjust the number of users per page as needed

  // Fetch users from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/dashboard/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers(response.data.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (email) => {
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);
  };

  const handleEdit = (email) => {
    const newEmail = prompt('Enter new email:', email);
    if (newEmail) {
      const updatedUsers = users.map(user => user.email === email ? { ...user, email: newEmail } : user);
      setUsers(updatedUsers);
    }
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.password) {
      const updatedUsers = [...users, { ...newUser, id: users.length + 1 }]; // Add ID for new user
      setUsers(updatedUsers);
      setNewUser({ name: '', email: '', password: '' });
      setShowAddUserForm(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleButtonClick = (buttonName, route) => {
    navigate(route);
    setActiveButton(buttonName);
  };

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="admin-info">
          <div className="admin-pic">
            <div className="admin-circle">A</div>
          </div>
          <h2 className="admin-name">Admin Name</h2>
        </div>
        <nav className="nav-buttons">
          <button
            className={`nav-button ${activeButton === 'Dashboard' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Dashboard', '/admindash')}
          >
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </button>
          <button
            className={`nav-button ${activeButton === 'File Management' ? 'active' : ''}`}
            onClick={() => handleButtonClick('File Management', '/files')}
          >
            <i className="fas fa-folder"></i> File Management
          </button>
          <button
            className={`nav-button ${activeButton === 'Reports' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Reports', '/reports')}
          >
            <i className="fas fa-chart-line"></i> Reports
          </button>
          <button
            className={`nav-button ${activeButton === 'User Management' ? 'active' : ''}`}
            onClick={() => handleButtonClick('User Management', '/user')}
          >
            <i className="fas fa-users"></i> User Management
          </button>
        </nav>
      </aside>
      <main className="main-content">
        <h1>Manage Registered Users</h1>
        <p>Total Users: {users.length}</p>
        
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
            <input 
              type="password" 
              placeholder="Password" 
              value={newUser.password} 
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
            />
            <button className="add-user-button" onClick={handleAddUser}>Add</button>
            <button onClick={() => setShowAddUserForm(false)}>Cancel</button>
          </div>
        )}

        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(user.email)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(user.email)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No users found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
