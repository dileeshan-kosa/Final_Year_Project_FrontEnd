import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CandidatesDetails = () => {
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get-candidates`
        );
        // console.log("Candidate Details", response.data);

        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Candidate Details</h1>
        <button
          onClick={() => navigate(-1)} // [-1 is Go tothe back]
          className="flex items-center text-blue-950 hover:text-blue-950"
        >
          Back to Dashboard
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-sky-700 text-white">
            <tr>
              <th className="py-3 px-4 border">#</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">NIC</th>
              <th className="py-3 px-4 border">DOB</th>
              <th className="py-3 px-4 border">District</th>
              <th className="py-3 px-4 border">Party</th>
              <th className="py-3 px-4 border">Symbol</th>
              <th className="py-3 px-4 border">Number</th>
              <th className="py-3 px-4 border">Image</th>
            </tr>
          </thead>

          <tbody>
            {candidates.length > 0 ? (
              candidates.map((candidate, index) => (
                <tr
                  key={candidate._id}
                  className="hover:bg-gray-100 text-indigo-700"
                >
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4">{candidate.name}</td>
                  <td className="py-2 px-4">{candidate.nic}</td>
                  <td className="py-2 px-4">{candidate.dob}</td>
                  <td className="py-2 px-4">{candidate.district}</td>
                  <td className="py-2 px-4">{candidate.politicalparty}</td>
                  {/* <td className="py-2 px-4">{candidate.symbol}</td> */}
                  <td className="py-2 px-4 text-center">
                    {candidate.symbol ? (
                      <img
                        src={candidate.symbol}
                        alt={`${candidate.name} symbol`}
                        className="w-12 h-12 object-contain mx-auto"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">{candidate.number}</td>
                  <td className="py-2 px-4 text-center">
                    {candidate.image ? (
                      <img
                        // src={`data:image/jpeg;base64,${candidate.image}`}
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-4 text-center text-gray-500">
                  No candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidatesDetails;
