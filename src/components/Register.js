import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { Shield, User, Mail, Lock, UserPlus } from "lucide-react";

const Register = () => {
  // const [username, setUsername] = useState('');
  // const [fullName, setFullName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const newUser = {
      username: formData.username,
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    try {
      // POST request to backend
      const response = await axios.post(
        "http://127.0.0.1:5000/register",
        newUser
      );

      // Check for a successful registration response
      if (response.status === 200) {
        console.log("Registration successful:", response.data);
        alert("Registration successful! Redirecting to login...");
        navigate("/login"); // Redirect to login
      }
    } catch (err) {
      // Handle errors
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      console.error("Error registering user:", errorMessage);
    }
  };

  return (
    // <div className="login-container">
    //   <div className="inner-frame">
    //     <div className="left-column">
    //       <div className="sign-in-rectangle">
    //         <h2
    //           style={{
    //             background: 'linear-gradient(292.13deg, #0A3C39 1.22%, #1BA29A 104.6%)',
    //             WebkitBackgroundClip: 'text',
    //             WebkitTextFillColor: 'transparent',
    //             textAlign: 'left',
    //             marginBottom: '20px',
    //           }}
    //         >
    //           Malware Pro
    //         </h2>
    //         <h3>Register an Account</h3>
    //         {error && <p style={{ color: 'red' }}>{error}</p>}
    //         <p style={{ fontSize: '12px', color: '#333', textAlign: 'left', marginBottom: '10px' }}>
    //           Create an account to access our Malware Pro features.
    //         </p>

    //         <form onSubmit={handleSubmit} className="login-form">
    //           <div className="input-group">
    //             <label>Username</label>
    //             <input
    //               type="text"
    //               value={username}
    //               onChange={(e) => setUsername(e.target.value)}
    //               placeholder="Enter your username"
    //               required
    //             />
    //           </div>
    //           <div className="input-group">
    //             <label>Full Name</label>
    //             <input
    //               type="text"
    //               value={fullName}
    //               onChange={(e) => setFullName(e.target.value)}
    //               placeholder="Enter your full name"
    //               required
    //             />
    //           </div>
    //           <div className="input-group">
    //             <label>Email</label>
    //             <input
    //               type="email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               placeholder="Enter your email"
    //               required
    //             />
    //           </div>
    //           <div className="input-group">
    //             <label>Password</label>
    //             <input
    //               type="password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               placeholder="Enter your password"
    //               required
    //             />
    //           </div>
    //           <div className="input-group">
    //             <label>Confirm Password</label>
    //             <input
    //               type="password"
    //               value={confirmPassword}
    //               onChange={(e) => setConfirmPassword(e.target.value)}
    //               placeholder="Confirm your password"
    //               required
    //             />
    //           </div>
    //           <button type="submit" className="login-button">Register</button>
    //           <button type="button" className="admin-button" onClick={() => navigate('/login')}>
    //             Sign In
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //     <div className="right-column">
    //       <div className="rectangle-35">
    //         {/* Additional content can go here */}
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-[92vh] bg-gray-900 text-gray-100 font-sans flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <div className="text-center mb-8">
                <Shield className="mx-auto h-12 w-12 text-teal-400 mb-4" />
                <h2 className="text-3xl font-bold text-white">
                  Create an Account
                </h2>
                <p className="text-gray-400 mt-2">
                  Join MalwarePro for advanced protection
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Choose a username"
                      required
                    />
                    <User className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                    <UserPlus className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                    <Mail className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Create a password"
                      required
                    />
                    <Lock className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Confirm your password"
                      required
                    />
                    <Lock className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  {error && (
                    <p className="text-red-500 text-sm my-2 text-center">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                  >
                    Register
                  </button>
                </div>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <a href="#" className="text-teal-400 hover:underline">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 bg-gray-700 p-8 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Protect Your Digital World
                </h3>
                <p className="text-gray-300 mb-6">
                  Join thousands of users who trust MalwarePro for their
                  cybersecurity needs.
                </p>
                <ul className="text-left text-gray-300 space-y-2">
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-teal-400 mr-2" />
                    Advanced threat detection
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-teal-400 mr-2" />
                    Real-time protection
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-teal-400 mr-2" />
                    24/7 expert support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
