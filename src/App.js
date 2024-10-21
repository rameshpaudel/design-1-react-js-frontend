import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";
import AdminDashboard from "./components/AdminDashboard";
//import Files from "./components/Files";
import UserManagement from "./components/UserManagement";
import Reports from "./components/Reports";
import FileUpload from "./components/FileUpload";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import ScanHistory from "./components/ScanHistory";
import LoginHistory from "./components/LoginHistory";
import UploadAndTrain from "./components/UploadAndTrain";
import ModelReport from "./components/ModelReport";
import Footer from "./components/Footer"; // Corrected import path

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check localStorage for authentication status
    const token = localStorage.getItem("userToken");
    const storedUserName = localStorage.getItem("userName");

    if (token && storedUserName) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen"> {/* Ensure proper layout */}
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          userName={userName}
          setUserName={setUserName}
        />
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUserName={setUserName}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login-history" element={<LoginHistory />} />
          <Route path="/scan-history" element={<ScanHistory />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/admindash" element={<AdminDashboard />} />
          <Route path="/upload-and-train" element={<UploadAndTrain />} />
          <Route path="/user" element={<UserManagement />} />
          <Route path="/mreports" element={<ModelReport />} />
          <Route path="/user/:id/reports" element={<Reports />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <Footer /> {/* Add the footer here */}
      </div>
    </Router>
  );
}

export default App;
