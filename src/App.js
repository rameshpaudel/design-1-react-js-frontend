import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdministratorLogin from './components/AdministratorLogin';
import Register from './components/Register';
import Chat from './components/Chat';
import AdminDashboard from './components/AdminDashboard';
import Files from './components/Files';
import UserManagement from './components/UserManagement';
import Reports from './components/Reports';
import FileUpload from './components/FileUpload';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ScanHistory from './components/ScanHistory';
import LoginHistory from './components/LoginHistory'; // Import the component

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userToken')); // Check local storage for user token
    const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('adminToken')); // Check local storage for admin token

    return (
        <Router>
            <div>
                <Header setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />
                <Routes>
                    {/* User Routes */}
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login-history" element={isAuthenticated || isAdmin ? <LoginHistory /> : <Navigate to="/login" />} />
                    <Route path="/scan-history" element={isAuthenticated || isAdmin ? <ScanHistory /> : <Navigate to="/login" />} />
                    <Route path="/upload" element={isAuthenticated ? <FileUpload /> : <Navigate to="/login" />} />

                    {/* Admin Routes */}
                    <Route path="/adminlogin" element={<AdministratorLogin setIsAdmin={setIsAdmin} />} />
                    <Route path="/admindash" element={isAdmin ? <AdminDashboard /> : <Navigate to="/adminlogin" />} />
                    <Route path="/files" element={isAdmin ? <Files /> : <Navigate to="/adminlogin" />} />
                    <Route path="/user" element={isAdmin ? <UserManagement /> : <Navigate to="/adminlogin" />} />
                    <Route path="/reports" element={isAdmin ? <Reports /> : <Navigate to="/adminlogin" />} />
                    
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
