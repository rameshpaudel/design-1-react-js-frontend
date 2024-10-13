import React, { useState, useEffect } from 'react';
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
import LoginHistory from './components/LoginHistory';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Check localStorage for authentication status
        const token = localStorage.getItem('userToken');
        const storedUserName = localStorage.getItem('userName');

        if (token && storedUserName) {
            setIsAuthenticated(true);
            setUserName(storedUserName);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <Router>
            <div>
                <Header 
                    isAuthenticated={isAuthenticated} 
                    setIsAuthenticated={setIsAuthenticated} 
                    setIsAdmin={setIsAdmin} 
                    userName={userName} 
                    setUserName={setUserName} 
                />
                <Routes>
                    <Route 
                        path="/login" 
                        element={
                            <Login 
                                setIsAuthenticated={setIsAuthenticated} 
                                setIsAdmin={setIsAdmin} 
                                setUserName={setUserName} 
                            />} 
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login-history" element={<LoginHistory /> } />
                    <Route path="/scan-history" element={isAuthenticated || isAdmin ? <ScanHistory /> : <Navigate to="/login" />} />
                    <Route path="/upload" element={ <FileUpload /> } />
                    <Route path="/adminlogin" element={<AdministratorLogin setIsAdmin={setIsAdmin} />} />
                    <Route path="/admindash" element={isAdmin ? <AdminDashboard /> : <Navigate to="/adminlogin" />} />
                    <Route path="/files" element={isAdmin ? <Files /> : <Navigate to="/adminlogin" />} />
                    <Route path="/user" element={<UserManagement  />} />
                    <Route path="/reports" element={<Reports /> } />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
