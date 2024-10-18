import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import {
  AlertTriangle,
  BarChart as BarChartIcon,
  File,
  Shield,
  Upload,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

const FileUpload = () => {
  const [activeTab, setActiveTab] = useState("file");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [scanData, setScanData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [topPrediction, setTopPrediction] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setUserId(id);
    }
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/scan/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setUploadStatus(`File uploaded: ${response.data.message}`);
      setScanData(response.data?.[0]);
      console.log(response.data, "Response");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
      setUploadStatus("File upload failed.");
    }
  };

  const handleLinkUpload = async () => {
    if (!link) {
      alert("Please enter a link to upload.");
      return;
    }

    try {
      const response = await axios.post("/api/upload/link", { link });
      setUploadStatus(`Link uploaded: ${response.data.message}`);
    } catch (error) {
      console.error("Error uploading link:", error);
      setUploadStatus("Link upload failed.");
    }
  };

  const switchTab = (tabName) => {
    setActiveTab(tabName);
    setUploadStatus(""); // Reset upload status when switching tabs
  };

  useEffect(() => {
    if (scanData) {
      const chartData = Object.entries(scanData?.probability)?.map(
        ([name, probability]) => ({
          name,
          probability: Number(probability),
        })
      );
      setChartData(chartData);

      const topPrediction = chartData.reduce((max, item) =>
        max.probability > item.probability ? max : item
      );
      setTopPrediction(topPrediction);
    }
  }, [scanData]);

  return (
    <div className="min-h-[92vh] bg-gray-900 text-gray-100 font-sans flex flex-col">
      {!scanData ? (
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-4 bg-gray-700 border-b border-gray-600 flex items-center">
              <Shield className="h-6 w-6 text-teal-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">
                Upload Your Files
              </h2>
            </div>
            <div className="p-6">
              <div className="flex mb-6">
                <button
                  className={`flex-1 py-2 px-4 text-center ${
                    activeTab === "file"
                      ? "bg-teal-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  } rounded-tl-md rounded-bl-md transition-colors`}
                  onClick={() => setActiveTab("file")}
                >
                  <Upload className="inline-block mr-2 h-5 w-5" />
                  Browse Files
                </button>
                {/* <button
                  className={`flex-1 py-2 px-4 text-center ${
                    activeTab === "link"
                      ? "bg-teal-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  } rounded-tr-md rounded-br-md transition-colors`}
                  onClick={() => setActiveTab("link")}
                >
                  <Link className="inline-block mr-2 h-5 w-5" />
                  Link Upload
                </button> */}
              </div>
              {activeTab === "file" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                        </p>
                        <p className="text-xs text-gray-400">PE Header Files</p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  {file && (
                    <div className="bg-gray-700 p-4 rounded-md">
                      <p className="text-sm text-gray-300 mb-2">
                        Selected file: {file.name}
                      </p>
                      {/* <div className="w-full bg-gray-600 rounded-full h-2.5">
                      <div
                        className="bg-teal-500 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div> */}
                    </div>
                  )}
                  <button
                    onClick={handleFileUpload}
                    disabled={!file}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Upload File
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLinkUpload} className="space-y-4">
                  {/* <div>
                  <label htmlFor="link-url" className="block text-sm font-medium text-gray-400 mb-1">
                    File URL
                  </label>
                  <input
                    type="url"
                    id="link-url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com/file.pdf"
                    className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                >
                  Upload Link
                </button> */}
                </form>
              )}
            </div>
          </div>
        </main>
      ) : (
        <div className="min-h-[92vh] bg-gray-900 text-gray-100 font-sans">
          <main className="container mx-auto p-4">
            <div className="flex items-center gap-2 my-4 justify-end">
              <Link to={`/user/${userId}/reports?from=user`}>
                <button className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors">
                  View Scan History
                </button>
              </Link>
              <button
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors"
                onClick={() => {
                  setScanData(null);
                  setChartData([]);
                  setTopPrediction(null);
                  setFile(null);
                }}
              >
                Upload Again
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <AlertTriangle className="mr-2 text-yellow-400" /> Prediction
                Results
              </h2>
              <p className="text-lg mb-2">
                Top prediction:{" "}
                <span className="font-bold text-teal-400">
                  {topPrediction?.name}
                </span>
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Probability: {(topPrediction?.probability * 100).toFixed(2)}%
              </p>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <BarChartIcon className="mr-2 text-teal-400" /> Probability
                  Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis type="number" domain={[0, 1]} />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                      }}
                      formatter={(value) => `${(value * 100).toFixed(2)}%`}
                    />
                    <Bar dataKey="probability" fill="#14B8A6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Detailed Probabilities
              </h3>
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Malware Type</th>
                    <th className="px-4 py-2 text-left">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(scanData?.probability)?.map(
                    ([name, probability]) => (
                      <tr key={name} className="border-b border-gray-700">
                        <td className="px-4 py-2">{name}</td>
                        <td className="px-4 py-2">
                          {(probability * 100).toFixed(2)}%
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      )}
    </div>

    // <div className="file-upload-container">
    //     <h2 className="upload-title">Upload Your Files</h2>

    //     <div className="tabs">
    //         <button
    //             className={`tab ${activeTab === 'file' ? 'active' : ''}`}
    //             onClick={() => switchTab('file')}
    //         >
    //             Browse Files
    //         </button>
    //         <button
    //             className={`tab ${activeTab === 'link' ? 'active' : ''}`}
    //             onClick={() => switchTab('link')}
    //         >
    //             Link Upload
    //         </button>
    //     </div>

    //     <div className="tab-content">
    //         {activeTab === 'file' && (
    //             <div className="upload-option">
    //                 <h3>Browse File Upload</h3>
    //                 <input type="file" onChange={handleFileChange} />
    //                 {file && <p>Selected File: {file.name}</p>}
    //                 <button onClick={handleFileUpload} className="upload-button">Upload File</button>
    //             </div>
    //         )}
    //         {activeTab === 'link' && (
    //             <div className="upload-option">
    //                 <h3>Link Upload</h3>
    //                 <input
    //                     type="text"
    //                     placeholder="Paste your link here..."
    //                     value={link}
    //                     onChange={handleLinkChange}
    //                 />
    //                 <button onClick={handleLinkUpload} className="upload-button">Upload Link</button>
    //             </div>
    //         )}
    //     </div>

    //     {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    // </div>
  );
};

export default FileUpload;
