import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "./Sidebar";

const ModelReport = () => {
    const [modelReports, setModelReports] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchModelReports = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:5000/dashboard/model-reports`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("API Response:", response.data);
                setModelReports(response.data.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch model reports. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchModelReports();
    }, []);

    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <div className="text-red-500 text-lg">{error}</div>;
    if (!modelReports) return <div className="text-center text-lg">No data available</div>;

    return (
        <div className="flex flex-row min-h-[92vh] bg-gray-800">
            <Sidebar />
            <div className="flex-grow p-6">
                <h1 className="text-3xl font-bold text-white mb-6">Model Reports</h1>
                {Object.keys(modelReports).map(model => (
                    <div key={model} className="bg-gray-700 p-4 rounded-lg shadow-lg mb-6">
                        <h2 className="text-xl font-semibold text-teal-300">{model}</h2>
                        <h3 className="text-lg font-medium text-teal-200 mt-4">Classification Report</h3>
                        <table className="min-w-full bg-gray-600 text-white mt-2 rounded-lg">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Class</th>
                                    <th className="px-4 py-2">F1-Score</th>
                                    <th className="px-4 py-2">Precision</th>
                                    <th className="px-4 py-2">Recall</th>
                                    <th className="px-4 py-2">Support</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modelReports[model].classification_report && Object.entries(modelReports[model].classification_report).map(([className, metrics]) => (
                                    <tr key={className} className="border-b border-gray-500">
                                        <td className="px-4 py-2">{className}</td>
                                        <td className="px-4 py-2">{metrics['f1-score']}</td>
                                        <td className="px-4 py-2">{metrics['precision']}</td>
                                        <td className="px-4 py-2">{metrics['recall']}</td>
                                        <td className="px-4 py-2">{metrics['support']}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3 className="text-lg font-medium text-teal-200 mt-4">Confusion Matrix</h3>
                        <table className="min-w-full bg-gray-600 text-white mt-2 rounded-lg">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2"></th>
                                    {modelReports[model].confusion_matrix && modelReports[model].confusion_matrix[0].map((_, index) => (
                                        <th key={index} className="px-4 py-2">{index}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {modelReports[model].confusion_matrix && modelReports[model].confusion_matrix.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="border-b border-gray-500">
                                        <td className="px-4 py-2">{rowIndex}</td>
                                        {row.map((value, colIndex) => (
                                            <td key={colIndex} className="px-4 py-2">{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="text-lg text-white mt-4">Test Accuracy: <span className="font-bold">{modelReports[model].test_accuracy}</span></p>
                        <p className="text-lg text-white">Train Accuracy: <span className="font-bold">{modelReports[model].train_accuracy}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModelReport;
