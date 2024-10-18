import { AlertTriangle, BarChartIcon } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PredictionResults = ({ predictionData }) => {
  const chartData = Object.entries(predictionData).map(
    ([name, probability]) => ({
      name,
      probability: Number(probability),
    })
  );

  const topPrediction = chartData.reduce((max, item) =>
    max.probability > item.probability ? max : item
  );

  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <AlertTriangle className="mr-2 text-yellow-400" /> Prediction Results
        </h2>
        <p className="text-lg mb-2">
          Top prediction:{" "}
          <span className="font-bold text-teal-400">{topPrediction?.name}</span>
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
        <h3 className="text-xl font-semibold mb-4">Detailed Probabilities</h3>
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Malware Type</th>
              <th className="px-4 py-2 text-left">Probability</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(predictionData)?.map(([name, probability]) => (
              <tr key={name} className="border-b border-gray-700">
                <td className="px-4 py-2">{name}</td>
                <td className="px-4 py-2">{(probability * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PredictionResults;
