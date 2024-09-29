import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
    return (
        <Router>
            <div>
                <Header /> {/* Place the Header here to show on all pages */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/adminlogin" element={<AdministratorLogin />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/admindash" element={<AdminDashboard />} />
                    <Route path="/files" element={<Files />} />
                    <Route path="/user" element={<UserManagement />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/upload" element={<FileUpload />} />
                    <Route path="/" element={<LandingPage />} />
                    {/* Remove the Header route, as it's not needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
