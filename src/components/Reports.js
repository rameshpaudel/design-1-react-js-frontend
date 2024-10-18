import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./Reports.css"; // Import your CSS file
import { AlertTriangle, CheckCircle, File, XCircle } from "lucide-react";
import Sidebar from "./Sidebar";
import axios from "axios";
import PredictionResults from "./Prediction";

const Reports = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation
  const [activeButton, setActiveButton] = useState("Reports"); // Default active button
  const [scanHistory, setScanHistory] = useState([]); // State to hold scan history data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error
  const [user, setUser] = useState({});

  const { id } = useParams();

  const searchParams = useSearchParams();
  console.log(searchParams[0].get("from"), "from");

  console.log(id, "id");

  useEffect(() => {
    // Fetch scan history from the API
    const fetchScanHistory = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(
          `http://127.0.0.1:5000/dashboard/scan-history?id=${id}`
        ); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.success) {
          setScanHistory(data.data); // Store the data in state
        } else {
          setError("Failed to load scan history: " + data.message);
        }
      } catch (err) {
        setError("Failed to fetch scan history: " + err.message); // Set error message
      } finally {
        setLoading(false); // Loading finished
      }
    };

    fetchScanHistory();
  }, []);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:5000/dashboard/user/${id}`
      );
      console.log(data, "data");

      if (data) {
        setUser(data?.data);
      }
    })();
  }, [id]);
  // Function to handle button click and navigate
  const handleButtonClick = (buttonName, route) => {
    navigate(route);
    setActiveButton(buttonName); // Set the active button
  };

  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="min-h-[92vh] bg-gray-900 text-gray-100 font-sans flex">
      {searchParams?.[0].get("from") === "user" ? null : <Sidebar />}

      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4 capitalize">
          {user ? user?.username : ""} Scan History
        </h2>
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">File Name</th>
                <th className="px-4 py-2 text-left">Hashed Name</th>
                <th className="px-4 py-2 text-left">File Size</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Results</th>
                <th className="px-4 py-2 text-left">Date Created</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {scanHistory?.length > 0 &&
                scanHistory.map((report) => (
                  <>
                    <tr key={report.id} className="hover:bg-gray-700">
                      <td className="px-4 py-2 flex items-center">
                        <File className="mr-2 h-4 w-4 text-teal-400" />
                        {report.file_name}
                      </td>
                      <td className="px-4 py-2">{report.hashed_name}</td>
                      <td className="px-4 py-2">{report.file_size}</td>
                      <td className="px-4 py-2">
                        {report.status !== "Failed" ? (
                          <span className="flex items-center text-green-400">
                            <CheckCircle className="mr-1 h-4 w-4" />{" "}
                            {report.status}
                          </span>
                        ) : (
                          <span className="flex items-center text-red-400">
                            <XCircle className="mr-1 h-4 w-4" /> {report.status}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {report?.results === "No malware detected" ? (
                          <span className="text-green-400">
                            {report.results}
                          </span>
                        ) : report.results === "Malware detected" ? (
                          <span className="text-red-400">{report.results}</span>
                        ) : (
                          <span className="flex items-center text-yellow-400">
                            <AlertTriangle className="mr-1 h-4 w-4" />{" "}
                            {report.results}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(report.created_at).toLocaleString()}
                      </td>
                      {report?.probabilities && (
                        <td className="px-4 py-2">
                          <button
                            onClick={() => toggleRow(report.id)}
                            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors"
                          >
                            View Results
                          </button>
                        </td>
                      )}
                    </tr>
                    {expandedRow === report?.id && report?.probabilities && (
                      <tr>
                        <td colSpan={7}>
                          <PredictionResults
                            predictionData={report?.probabilities}
                          />
                        </td>
                      </tr>
                    )}
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>

    // <div className="dashboard-container">

    //     <main className="main-content">
    //         <h1>Scan Reports</h1>
    //         {loading ? (
    //             <p>Loading reports...</p> // Loading state
    //         ) : error ? (
    //             <p className="error">{error}</p> // Error message
    //         ) : (
    //             <div className="reports-table">
    //                 <table>
    //                     <thead>
    //                         <tr>
    //                             <th>File Name</th>
    //                             <th>Hashed Name</th>
    //                             <th>File Size</th>
    //                             <th>Status</th>
    //                             <th>Results</th>
    //                             <th>Date Created</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {scanHistory.length > 0 ? (
    //                             scanHistory.map((scan) => (
    //                                 <tr key={scan.id}>
    //                                     <td>{scan.file_name}</td>
    //                                     <td>{scan.hashed_name}</td>
    //                                     <td>{scan.file_size}</td>
    //                                     <td className={scan.status === 'Malicious' ? 'malicious' : 'safe'}>
    //                                         {scan.status}
    //                                     </td>
    //                                     <td>{scan.results}</td>
    //                                     <td>{new Date(scan.created_at).toLocaleString()}</td>
    //                                 </tr>
    //                             ))
    //                         ) : (
    //                             <tr>
    //                                 <td colSpan="6">No scan history available.</td>
    //                             </tr>
    //                         )}
    //                     </tbody>
    //                 </table>
    //             </div>
    //         )}
    //     </main>
    // </div>
  );
};

export default Reports;
