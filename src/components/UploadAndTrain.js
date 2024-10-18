import React, { useState } from "react";
import axios from "axios";
import { File, HardDriveUpload, Link, Shield, Upload } from "lucide-react";
import Sidebar from "./Sidebar";
import FlippingLoader from "./FlippingLoader";

const UploadAndTrain = () => {
  const [activeTab, setActiveTab] = useState("file");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [uploadStatus, setUploadStatus] = useState("Training model...");
  const [uploading, setUploading] = useState(false);

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

    setUploading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload_and_train",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus(`${response.data.message}`);
      alert("Model trained successfully!");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("File upload failed.");
    } finally {
      setTimeout(() => {
        setUploading(false);
      }, 1000);
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

  return (
    <div className="min-h-[92vh] bg-gray-900 text-gray-100 font-sans flex ">
      <Sidebar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          <div className="px-4 bg-gray-700 border-b border-gray-600 flex items-center">
            <HardDriveUpload className="h-6 w-6 text-teal-400 mr-2" />
            <h2 className="text-xl font-semibold text-white pt-5">
              Upload And Train Model
            </h2>
          </div>
          <div className="p-6">
            {activeTab === "file" ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  {uploading ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                      <FlippingLoader />
                      <p className="text-white text-lg">{uploadStatus}</p>
                    </div>
                  ) : (
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                        </p>
                        <p className="text-xs text-gray-400">CSV Files</p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
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
                  disabled={!file || uploading}
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
            {/* {file  && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Uploaded File</h3>
                <ul className="space-y-2">
                    <li  className="flex items-center bg-gray-700 p-2 rounded-md">
                      <File className="h-5 w-5 text-teal-400 mr-2" />
                      <span className="text-sm text-gray-300">{file.name}</span>
                    </li>
                </ul>
              </div>
            )} */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadAndTrain;
