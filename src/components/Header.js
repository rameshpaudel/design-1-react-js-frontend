import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css";

const Header = ({
  isAuthenticated,
  setIsAuthenticated,
  setIsAdmin,
  userName,
  setUserName,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for userToken and userName in localStorage
    const token = localStorage.getItem("userToken");
    const storedUserName = localStorage.getItem("userName");

    if (token && storedUserName) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    } else {
      setIsAuthenticated(false);
      setUserName("");
    }
  }, [setIsAuthenticated, setUserName]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:5000/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      // Clear localStorage and authentication states
      setIsAuthenticated(false);
      // setIsAdmin(false);
      setUserName("");
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 h-[8vh]">
      <div className="container  mx-auto px-4  flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-teal-400">MalwarePro</h1>
        </Link>
        <div className="space-x-2">
          {isAuthenticated && userName ? (
            <>
              <span className="user-name">{`Welcome, ${userName}`}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors">
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
