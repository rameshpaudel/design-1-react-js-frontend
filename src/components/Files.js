import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FilesManagement.css"; // Import your new CSS file
import Sidebar from "./Sidebar";
import { File, Trash2, Upload } from "lucide-react";

const FilesManagement = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation
  const [activeButton, setActiveButton] = useState("File Management"); // Default active button
  const [files, setFiles] = useState([]); // State for managing files
  const [newFile, setNewFile] = useState({
    name: "",
    date: "",
    size: "",
    maliciousSafe: true,
  }); // State for new file input
  const [message, setMessage] = useState(""); // State for user feedback messages
  const urlResponse = [
    {
      prediction: "SnakeKeyLogger",
      probability: {
        BankingTrojan: 0.029147642891843642,
        Benign: 0.09926744728867003,
        Downloader: 0.06685307149480088,
        RAT: 0.0615876145285457,
        RedLineStealer: 0.10135311772015737,
        SnakeKeyLogger: 0.5512579914949742,
        Spyware: 0.09053311458100809,
      },
    },
  ];
  // Function to load files from local storage
  const loadFilesFromLocalStorage = () => {
    const storedFiles = localStorage.getItem("scannedFiles");
    if (storedFiles) {
      setFiles(JSON.parse(storedFiles)); // Parse and set the files from local storage
    }
  };

  // Load files from local storage on component mount
  useEffect(() => {
    loadFilesFromLocalStorage();
  }, []);

  // Function to handle button click and navigate
  const handleButtonClick = (buttonName, route) => {
    navigate(route); // Navigate to the corresponding route
    setActiveButton(buttonName); // Set the active button
  };

  // Input validation for new file
  const isValidFile = (file) => {
    // Check if all fields are filled
    if (!file.name || !file.date || !file.size) return false;

    // Validate size format (assuming size should end with 'MB' or 'KB')
    const sizeRegex = /^\d+(\.\d+)?\s*(MB|KB)$/;
    return sizeRegex.test(file.size);
  };

  // Handle file upload
  const handleFileUpload = () => {
    if (isValidFile(newFile)) {
      const updatedFiles = [
        ...files,
        {
          ...newFile,
          id: files.length + 1, // Assigning a new id
        },
      ];
      setFiles(updatedFiles); // Update files state
      localStorage.setItem("scannedFiles", JSON.stringify(updatedFiles)); // Save updated files to local storage
      setMessage("File uploaded successfully!"); // Set success message
      setNewFile({ name: "", date: "", size: "", maliciousSafe: true }); // Reset form
    } else {
      setMessage("Please fill in all fields correctly."); // Alert if fields are empty or invalid
    }
  };

  // Handle file deletion with confirmation
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    ); // Confirmation dialog
    if (confirmDelete) {
      const updatedFiles = files.filter((file) => file.id !== id);
      setFiles(updatedFiles); // Update files state
      localStorage.setItem("scannedFiles", JSON.stringify(updatedFiles)); // Update local storage
      setMessage("File deleted successfully!"); // Set success message
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex">
      <Sidebar />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to File Management
        </h2>
        <p className="text-gray-400 mb-6">
          Here you can manage all your files effectively.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="fileName"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                File Name
              </label>
              <input
                type="text"
                placeholder="File Name"
                value={newFile.name}
                onChange={(e) =>
                  setNewFile({ ...newFile, name: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="fileDate"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Date
              </label>
              <input
                type="date"
                value={newFile.date}
                onChange={(e) =>
                  setNewFile({ ...newFile, date: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="fileSize"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Size (e.g., 2 MB)
              </label>
              <input
                type="text"
                placeholder="Size (e.g., 2 MB)"
                value={newFile.size}
                onChange={(e) =>
                  setNewFile({ ...newFile, size: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>
          <button
            onClick={handleFileUpload}
            className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            <Upload className="inline-block mr-2" /> Upload
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Date Uploaded</th>
                <th className="px-4 py-2 text-left">Size</th>
                <th className="px-4 py-2 text-left">Malicious Safe</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {files.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No files found
                  </td>
                </tr>
              ) : (
                files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-700">
                    <td className="px-4 py-2">{file.id}</td>
                    <td className="px-4 py-2 flex items-center">
                      <File className="mr-2 h-4 w-4 text-teal-400" />
                      {file.name}
                    </td>
                    <td className="px-4 py-2">{file.date}</td>
                    <td className="px-4 py-2">{file.size}</td>
                    <td className="px-4 py-2">
                      {file.maliciousSafe ? "✅ Safe" : "❌ Malicious"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDelete(file.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>

    // <div className="dashboard-container">
    //   <Sidebar />

    //   <main className="main-content">
    //     <h1>Welcome to Files Management</h1> {/* Main content header */}
    //     <p className="welcome-message">
    //       Here you can manage all your files effectively.
    //     </p>
    //     {/* User feedback message */}
    //     {message && <div className="feedback-message">{message}</div>}
    //     {/* Add New File Form */}
    //     <div className="add-file-form">
    //       <input
    //         type="text"
    //         placeholder="File Name"
    //         value={newFile.name}
    //         onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
    //       />
    //       <input
    //         type="date"
    //         value={newFile.date}
    //         onChange={(e) => setNewFile({ ...newFile, date: e.target.value })}
    //       />
    //       <input
    //         type="text"
    //         placeholder="Size (e.g., 2 MB)"
    //         value={newFile.size}
    //         onChange={(e) => setNewFile({ ...newFile, size: e.target.value })}
    //       />
    //       <button className="upload-button" onClick={handleFileUpload}>
    //         Upload
    //       </button>
    //     </div>
    //     {/* Files Table */}
    //     <table className="files-table">
    //       <thead>
    //         <tr>
    //           <th>ID</th>
    //           <th>Name</th>
    //           <th>Date Uploaded</th>
    //           <th>Size</th>
    //           <th>Malicious Safe</th> {/* New header for Malicious Safe */}
    //           <th>Actions</th> {/* Actions header for editing/deleting */}
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {files.length > 0 ? (
    //           files.map((file) => (
    //             <tr key={file.id}>
    //               <td>{file.id}</td>
    //               <td>{file.name}</td>
    //               <td>{file.date}</td>
    //               <td>{file.size}</td>
    //               <td>
    //                 {file.maliciousSafe ? (
    //                   <span className="status-safe">✅ Safe</span>
    //                 ) : (
    //                   <span className="status-malicious">❌ Malicious</span>
    //                 )}
    //               </td>
    //               <td>
    //                 <button
    //                   className="delete-button"
    //                   onClick={() => handleDelete(file.id)}
    //                 >
    //                   View Report
    //                 </button>
    //                 <button
    //                   className="delete-button"
    //                   onClick={() => handleDelete(file.id)}
    //                 >
    //                   Delete
    //                 </button>
    //               </td>
    //             </tr>
    //           ))
    //         ) : (
    //           <tr>
    //             <td colSpan="6">No files found</td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </main>
    // </div>
  );
};

export default FilesManagement;
