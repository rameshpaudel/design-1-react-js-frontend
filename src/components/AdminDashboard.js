import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Bar, Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from "axios"; // For API requests
import "./AdminDashboard.css";
import Sidebar from "./Sidebar";
import { FileText, Users } from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
} from "recharts";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [userCount, setUserCount] = useState(0);
  const [fileData, setFileData] = useState({ malicious: 0, safe: 0 });

  // Fetch user data from API when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/dashboard/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token
            },
          }
        );
        setUserCount(response.data.data.length); // Update user count
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch scan history data from the Reports API
    const fetchScanHistory = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/dashboard/scan-history",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const scanHistory = response.data.data || [];
        // Count malicious and safe files from scan history
        const maliciousCount = scanHistory.filter(
          (scan) => scan.status === "Malicious"
        ).length;
        const safeCount = scanHistory.filter(
          (scan) => scan.status !== "Malicious"
        ).length;
        setFileData({ malicious: maliciousCount, safe: safeCount });
      } catch (error) {
        console.error("Error fetching scan history:", error);
      }
    };

    fetchUserData(); // Fetch user data from the backend
    fetchScanHistory(); // Fetch scan history data from the API
  }, []);

  // Data for user count chart (fetched from backend)
  //   const userData = {
  //     labels: ["Total Users"],
  //     datasets: [
  //       {
  //         label: "Number of Users",
  //         data: [userCount],
  //         backgroundColor: "rgba(75, 192, 192, 0.6)",
  //         borderColor: "rgba(75, 192, 192, 1)",
  //         borderWidth: 1,
  //       },
  //     ],
  //   };

  //   // Data for file status chart (fetched from scan history API)
  //   const chartFileData = {
  //     labels: ["Malicious", "Safe"],
  //     datasets: [
  //       {
  //         data: [fileData.malicious, fileData.safe],
  //         backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
  //         hoverBackgroundColor: [
  //           "rgba(255, 99, 132, 1)",
  //           "rgba(75, 192, 192, 1)",
  //         ],
  //       },
  //     ],
  //   };

  const userData = [{ name: "Total Users", users: userCount }];

  const chartFileData = [
    { name: "Malicious", value: fileData.malicious },
    { name: "Safe", value: fileData.safe },
  ];

  // You can define the colors array for the Pie chart
  const COLORS = ["#FF6384", "#4BC0C0"];

  // Function to handle navigation when buttons are clicked
  const handleButtonClick = (buttonName, route) => {
    navigate(route); // Navigate to the corresponding route
    setActiveButton(buttonName); // Set the active button state
  };

  //   const COLORS = ["#4ade80", "#f87171", "#fbbf24"];

  return (
    // <div className="dashboard-container">

    //     <main className="main-content">
    //         <h1>Welcome to the Admin Dashboard</h1>
    //         <div className="charts-wrapper">
    //             <div className="chart-container">
    //                 <h2>Number of Users</h2>
    //                 <Bar data={userData} options={{ responsive: true }} />
    //             </div>
    //             <div className="chart-container">
    //                 <h2>Status of Files</h2>
    //                 <Doughnut data={chartFileData} options={{ responsive: true }} />
    //             </div>
    //         </div>
    //     </main>
    // </div>

    <div className="min-h-[92vh] bg-gray-900 text-gray-100 font-sans flex">
      <Sidebar />

      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">
          Welcome to the Admin Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2" /> Number of Users
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                  }}
                  itemStyle={{ color: "#D1D5DB" }}
                />
                <Bar dataKey="users" fill="#14B8A6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2" /> Status of Files
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartFileData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartFileData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                  }}
                  itemStyle={{ color: "#D1D5DB" }}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ paddingLeft: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
