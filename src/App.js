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
import FileUpload from './components/FileUpload'; // Import the FileUpload component





import MainLandingPage from './components/MainLandingPage'; // Import the new component


function App() {
    return (
        <Router>
            <div>
                <Routes>
                <Route path="/" element={<MainLandingPage />} /> {/* Set this as the landing page */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/adminlogin" element={<AdministratorLogin />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/admindash" element={<AdminDashboard />} />
                    <Route path="/files" element={<Files />} />
                    <Route path="/user" element={<UserManagement />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/upload" element={<FileUpload />} /> {/* Add this route */}


                    {/* You can add other routes here */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
