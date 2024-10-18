import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ScanHistory.css"; // Optional: Add CSS styles if needed
import { File } from "lucide-react";

const ScanHistory = () => {
  const [scanHistory, setScanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScanHistory = async () => {
      try {
        const token = localStorage.getItem("userToken"); // Retrieve token from local storage

        if (!token) {
          setError("You need to be logged in to view your scan history.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://127.0.0.1:5000/dashboard/scan-history",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token for authentication
            },
          }
        );

        console.log("Scan history response:", response.data); // Debug log to check response
        if (response.data && response.data?.data) {
          setScanHistory(response.data?.data);
        } else {
          setError("Unable to fetch scan history.");
        }
      } catch (err) {
        console.error("Error fetching scan history:", err); // Log the error for debugging
        setError("An error occurred while fetching scan history.");
      } finally {
        setLoading(false);
      }
    };

    fetchScanHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-[92vh] bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Your Scan History</h2>
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Scan Result
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Scan Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {scanHistory?.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No scan history available
                  </td>
                </tr>
              ) : (
                scanHistory?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <File className="h-5 w-5 text-teal-400 mr-2" />
                        <span>{item.fileName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <td>{item.scan_result}</td>
                      {/* <div className="flex items-center">
                        {item.scanResult === 'Clean' && (
                          <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                        )}
                        {item.scanResult === 'Malicious' && (
                          <XCircle className="h-5 w-5 text-red-400 mr-2" />
                        )}
                        {item.scanResult === 'Unknown' && (
                          <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                        )}
                        <span className={
                          item.scanResult === 'Clean' ? 'text-green-400' :
                          item.scanResult === 'Malicious' ? 'text-red-400' :
                          'text-yellow-400'
                        }>
                          {item.scanResult}
                        </span>
                      </div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(item.scan_date).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>

    // <div className="scan-history-container">
    //   <h1>Your Scan History</h1>
    //   {scanHistory?.length === 0 ? (
    //     <p>No scan history available.</p>
    //   ) : (
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>File Name</th>
    //           <th>Scan Result</th>
    //           <th>Scan Date</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {scanHistory?.map((scan, index) => (
    //           <tr key={index}>
    //             <td>{scan.file_name}</td>
    //             <td>{scan.scan_result}</td>
    //             <td>{new Date(scan.scan_date).toLocaleString()}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}
    // </div>
  );
};

export default ScanHistory;
