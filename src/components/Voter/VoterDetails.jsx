import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";

const VoterDetails = () => {
  const voterDetails = localStorage.getItem("voterDetails");
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const storedVoter = localStorage.getItem("voterDetails");

    if (storedVoter) {
      try {
        const parsed = JSON.parse(storedVoter); // 👈 parse the JSON string
        setData(parsed);
      } catch (err) {
        console.error("Failed to parse voter data from localStorage", err);
      }
    }
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/placedvotes");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
      <div className="w-96 p-8 bg-white bg-opacity-5 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Voter Details
        </h1>
        {/* Only the form will be shown with placeholders */}
        <form className="flex flex-col gap-5" onSubmit={handleNext}>
          <input
            type="text"
            readOnly
            value={data.name || "No data captured"}
            placeholder="Name"
            className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
          />

          <input
            type="text"
            value={data.nic || "No data Fatched"}
            readOnly
            placeholder="NIC"
            className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
          />

          <input
            type="text"
            value={data.district || "No data Fatched"}
            readOnly
            placeholder="District"
            className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 focus:outline-none"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoterDetails;
