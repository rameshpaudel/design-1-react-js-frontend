import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpClient } from "./api"; // Assuming you're using axios instance here
import "./Login.css";
import { Shield, User, Lock } from "lucide-react";

const Login = ({ setIsAuthenticated, setIsAdmin, setUserName }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const userCredentials = { username, password };

    try {
      const response = await httpClient.post("/login", userCredentials);
      if (response.status === 200) {
        const { token } = response.data; // Ensure token is returned
        localStorage.setItem("userToken", token); // Save token to localStorage

        // Get current user info
        const userInfo = await httpClient.get("/current-user");
        if (userInfo.status === 200) {
          setIsAuthenticated(true);
          const { role, username, id } = userInfo.data.data;
          localStorage.setItem("userName", username);
          localStorage.setItem("id", id);
          localStorage.setItem("role", role);

          setUserName(username); // Set username in state
          // Check if the role is admin
          if (role === "admin") {
            // setIsAdmin(true);
            navigate("/admindash"); // Redirect to admin dashboard
          } else {
            navigate("/"); // Redirect to user dashboard
          }
        }
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Error logging in:", errorMessage);
    }
  };

  return (
    // <div className="login-container">
    //     <form onSubmit={handleSubmit} className="login-form">
    //         <div className="input-group">
    //             <label>Username</label>
    //             <input
    //                 type="text"
    //                 value={username}
    //                 onChange={(e) => setUsername(e.target.value)}
    //                 placeholder="Enter your username"
    //                 required
    //             />
    //         </div>
    //         <div className="input-group">
    //             <label>Password</label>
    //             <input
    //                 type="password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 placeholder="Enter your password"
    //                 required
    //             />
    //         </div>
    //         <button type="submit" className="login-button">Login</button>
    //     </form>
    //     {error && <p style={{ color: 'red' }}>{error}</p>}
    // </div>

    <div className="min-h-[92vh] bg-gray-900 text-gray-100 font-sans flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <Shield className="mx-auto h-12 w-12 text-teal-400 mb-4" />
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="text-gray-400 mt-2">
                Sign in to access your account
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your username"
                    required
                  />
                  <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                >
                  Sign In
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
