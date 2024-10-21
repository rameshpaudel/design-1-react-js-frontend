// src/components/LandingPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FileDisplay from "./FileDisplay"; // Ensure you have this component
import "./LandingPage.css"; // Create styles if needed
import {
  Shield,
  Upload,
  MessageCircle,
  BarChart,
  LayoutDashboard,
  File,
} from "lucide-react";
import { httpClient } from "./api";

const LandingPage = () => {
  const [stats, setStats] = useState({ malware_analysed: 0, total_scans: 0 }); // State for statistics
  const [error, setError] = useState(null); // State to manage error
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    // Fetch statistics from the API
    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/dashboard/stats");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStats(data); // Set statistics data
      } catch (err) {
        setError("Failed to fetch stats: " + err.message); // Set error message for stats
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsUserLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      (async () => {
        const { data } = await httpClient.get("/current-user");
        if (data) {
          const currentUser = data.data;
          setCurrentUser(currentUser);
        }
      })();
    }
  }, [isUserLoggedIn]);

  return (
    // <div className="landing-page">
    //     <h1>Welcome to MalwarePro</h1>
    //     <p>Your files and URLs are safe with us.</p>

    //     {/* Display statistics */}
    //     <div className="stats">
    //         <h2>Statistics</h2>
    //         {error ? (
    //             <p className="error">{error}</p> // Display error if fetching fails
    //         ) : (
    //             <>
    //                 <p>Malware Analysed: {stats.malware_analysed}</p>
    //                 <p>Total Scans: {stats.total_scans}</p>
    //             </>
    //         )}
    //     </div>

    //     <div className="links-container">
    //         <Link to="/chat" className="landing-link">Chat with Us</Link>
    //         <Link to="/upload" className="landing-link">Upload Your File</Link>
    //     </div>
    // </div>

    <div className="min-h-[92vh] bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          <div className="text-center py-8 border-b border-gray-700">
            <h2 className="text-4xl font-bold text-white mb-2">
              Welcome to MalwarePro
            </h2>
            <p className="text-gray-400">
              Advanced protection for your digital assets
            </p>
          </div>
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCard
                icon={Shield}
                title="Protected Files"
                value={stats?.malware_analysed}
              />
              <StatCard
                icon={Upload}
                title="Scanned Files"
                value={stats?.total_scans}
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              {isAdmin ? (
                <Link to={"/adminDash"}>
                  <button className="flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg rounded-xl transition-transform hover:scale-105">
                    <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
                  </button>
                </Link>
              ) : (
                <Link to={isUserLoggedIn ? "/upload" : "/login"}>
                  <button className="flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg rounded-xl transition-transform hover:scale-105">
                    <Upload className="mr-2 h-5 w-5" /> Upload File for Scan
                  </button>
                </Link>
              )}
              {isUserLoggedIn && currentUser && !isAdmin && (
                <Link to={`/user/${currentUser?.id}/reports?from=user`}>
                  <button className="flex items-center justify-center border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white px-8 py-3 text-lg rounded-xl transition-transform hover:scale-105">
                    <File className="mr-2 h-5 w-5" /> View Scan History
                  </button>
                </Link>
              )}
              <Link to="/chat">
                <button className="flex items-center justify-center border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white px-8 py-3 text-lg rounded-xl transition-transform hover:scale-105">
                  <MessageCircle className="mr-2 h-5 w-5" /> Chat Model
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="bg-gray-700 p-6 rounded-xl shadow-lg text-center transition-transform hover:scale-105">
      <Icon className="mx-auto h-12 w-12 text-teal-400 mb-4" />
      <h3 className="font-semibold text-gray-300 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

export default LandingPage;
