import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, LogOut } from "lucide-react";

const LoginHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoginHistory = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/login-history",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`, // Use the correct token key
            },
          }
        );

        // Ensure the response contains success flag and data
        if (response.data && response.data.success && response.data.data) {
          setHistory(response.data.data); // Set the history data
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        console.error("Error fetching login history:", err);
        setError("Failed to fetch login history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoginHistory();
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
        <h2 className="text-2xl font-semibold mb-6">Login History</h2>
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Login Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Logout Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {history?.length > 0 &&
                history?.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-teal-400 mr-2" />
                        <span>
                          {new Date(entry.login_time).toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <LogOut className="h-5 w-5 text-teal-400 mr-2" />
                        <span>
                          {entry.logout_time
                            ? new Date(entry.logout_time).toLocaleString()
                            : "Still Logged In"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>

    // <div className="login-history-container">
    //     <h1>Login History</h1>
    //     {history.length === 0 ? (
    //         <p>No login history available.</p>
    //     ) : (
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>Login Time</th>
    //                     <th>Logout Time</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {history.map((entry, index) => (
    //                     <tr key={index}>
    //                         <td>{new Date(entry.login_time).toLocaleString()}</td>
    //                         <td>{entry.logout_time ? new Date(entry.logout_time).toLocaleString() : 'Still Logged In'}</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     )}
    // </div>
  );
};

export default LoginHistory;
