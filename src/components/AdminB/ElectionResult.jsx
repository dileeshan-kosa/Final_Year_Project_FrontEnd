import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const ElectionResult = () => {
  const navigate = useNavigate();

  // Candidate vote data from backend
  const [candidates, setCandidates] = useState([]);
  // Valid vote total
  const [totalVotes, setTotalVotes] = useState(0);
  // invalide Vote count
  const [rejectedCount, setRejectedCount] = useState(0);

  // Color palette for up to 20 unique candidates
  const colorPalette = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#F97316",
    "#22D3EE",
    "#6366F1",
    "#EAB308",
    "#14B8A6",
    "#F43F5E",
    "#A855F7",
    "#0EA5E9",
    "#84CC16",
    "#D946EF",
    "#FB7185",
    "#FACC15",
    "#F472B6",
    "#6EE7B7",
  ];

  // Function to fetch valid votes from backend

  const fetchVotes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/get-blockchainVotes");
      const data = res.data;

      const total = data.reduce((sum, c) => sum + c.votes, 0);
      setCandidates(data);
      setTotalVotes(total);
    } catch (err) {
      console.error("❌ Error fetching vote results:", err);
    }
  };

  // Initial fetch + poll every 5 seconds
  useEffect(() => {
    fetchVotes();
    // fetchRejectedVotes();

    const interval = setInterval(() => {
      fetchVotes();
      // fetchRejectedVotes();
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const barData = {
    labels: candidates.map((c) => `${c.name} (#${c.number})`),
    datasets: [
      {
        label: "Votes",
        data: candidates.map((c) => c.votes),
        backgroundColor: candidates.map(
          (_, i) => colorPalette[i % colorPalette.length]
        ),
      },
    ],
  };

  const pieData = {
    labels: candidates.map((c) => `${c.name} (#${c.number})`),
    datasets: [
      {
        data: candidates.map((c) => c.votes),
        backgroundColor: candidates.map(
          (_, i) => colorPalette[i % colorPalette.length]
        ),
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">
          President Election Results
        </h1>
        <p className="text-orange-300 mb-8">Total Votes Cast: {totalVotes}</p>
        {/* Rejected Votes Count */}
        <p className="text-red-600 font-semibold mb-6">
          Invalid Votes: {rejectedCount}
        </p>

        <button
          className="flex items-center text-white hover:text-blue-200 mb-4"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="mr-2" />
          Back to Dashboard
        </button>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Vote Distribution
          </h2>
          <div className="h-96">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 },
                    grid: { drawBorder: false },
                  },
                  x: { grid: { display: false } },
                },
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>

        {/* Candidate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {candidates.map((c, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:scale-105"
            >
              <div className="p-4">
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={c.image || "https://via.placeholder.com/150"}
                    alt={c.name}
                    className="w-24 h-24 rounded-full object-cover border-4 mb-3"
                    style={{
                      borderColor: colorPalette[idx % colorPalette.length],
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                  <h3 className="font-bold text-gray-800 text-center">
                    {c.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-semibold">
                    Number - {c.number}
                  </p>
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Votes:</span>
                    <span className="font-semibold">
                      {c.votes} (
                      {totalVotes > 0
                        ? ((c.votes / totalVotes) * 100).toFixed(1)
                        : 0}
                      %)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${
                          totalVotes > 0 ? (c.votes / totalVotes) * 100 : 0
                        }%`,
                        backgroundColor:
                          colorPalette[idx % colorPalette.length],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Vote Percentage
          </h2>
          <div className="h-96">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "right" },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || "";
                        const value = context.raw || 0;
                        const percentage = totalVotes
                          ? ((value / totalVotes) * 100).toFixed(1)
                          : 0;
                        return `${label}: ${value} votes (${percentage}%)`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionResult;
