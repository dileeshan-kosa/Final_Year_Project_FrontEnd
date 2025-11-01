// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const PreviousElectionResult = () => {
//   const [selectedYear, setSelectedYear] = useState(null);
//   const availableYears = ["presidential-2024", "presidential-2025"];
//   const [loading, setLoading] = useState(false);

//   // Function to fetch votes from backend based on selected election
//   const fetchElectionVotes = async (selectedYear = null) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `http://localhost:8000/api/get-awsBackupVotes?electionName/selectedYear=${
//           selectedYear ? selectedYear : "presidential-2024"
//         }`
//       );
//       // setResults(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching votes:", err);
//       setResults(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch results whenever selectedYear changes
//   // useEffect(() => {
//   //   fetchElectionVotes;
//   // }, [selectedYear]);

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//       {/* Header & Year selector */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">
//           President Election
//         </h2>

//         <select
//           value={selectedYear}
//           onChange={(e) => {
//             // setSelectedYear(e.target.value)
//             fetchElectionVotes(e.target.value);
//           }}
//           className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
//         >
//           {availableYears.map((y) => (
//             <option key={y} value={y}>
//               {y}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default PreviousElectionResult;

import axios from "axios";
import React, { useEffect, useState } from "react";

const PreviousElectionResult = () => {
  const [selectedYear, setSelectedYear] = useState("presidential-2024");
  const availableYears = ["presidential-2024", "presidential-2025"];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Fetch votes from backend
  const fetchElectionVotes = async (year) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/get-awsBackupVotes?electionName=${year}`
      );
      console.log("✅ Election Data:", res.data);
      setResult(res.data);
    } catch (err) {
      console.error("❌ Error fetching votes:", err);
      setError("Failed to fetch election results. Please try again later.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data on mount
  useEffect(() => {
    fetchElectionVotes(selectedYear);
  }, [selectedYear]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      {/* Header & Year selector */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Presidential Election Results
        </h2>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
        >
          {availableYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* 🌀 Loading Spinner */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-3 text-sm">Loading election data…</p>
        </div>
      )}

      {/* Loading / Error */}
      {/* {loading && <p className="text-gray-600">Loading election data…</p>} */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Render results */}
      {!loading && !error && result && (
        <>
          {/* Summary stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Total Votes</p>
              <p className="text-2xl font-bold text-gray-900">
                {result.totalVotes || 0}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Positions</p>
              <p className="text-2xl font-bold text-gray-900">
                {result.positions || 1}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Candidates</p>
              <p className="text-2xl font-bold text-gray-900">
                {result.candidates ? result.candidates.length : 0}
              </p>
            </div>
          </div>

          {/* Winner highlight */}
          <div className="mb-6 border-2 border-yellow-300 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="mr-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <span className="text-yellow-700 font-bold">1</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {result.winner || "—"}
                </h3>
                <p className="text-sm text-gray-600">
                  Winner with{" "}
                  {(() => {
                    const w = result.candidates?.reduce(
                      (prev, curr) => (prev.votes > curr.votes ? prev : curr),
                      result.candidates[0] || { votes: 0 }
                    ) || { votes: 0 };
                    return w ? w.votes : 0;
                  })()}{" "}
                  votes
                </p>
              </div>
            </div>
          </div>

          {/* Candidates list */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.candidates &&
                result.candidates.map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow-sm border"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {c.name}
                        </h4>
                        <p className="text-sm text-gray-600">{c.votes} votes</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800">
                          {typeof c.percentage === "number"
                            ? c.percentage.toFixed(1)
                            : c.percentage}
                          %
                        </p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${
                            typeof c.percentage === "number"
                              ? c.percentage
                              : Number(c.percentage) || 0
                          }%`,
                          backgroundColor: "#3B82F6",
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}

      {/* No data fallback */}
      {!loading &&
        !error &&
        (!result || !result.candidates || result.candidates.length === 0) && (
          <p className="text-gray-600 mt-4">
            No election data available for {selectedYear}.
          </p>
        )}
    </div>
  );
};
export default PreviousElectionResult;
