import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const AdminviewVoterDetails = () => {
  //get all voters
  const [votersDetails, setVotersDetails] = useState([]);

  const fetchVoterDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getsfulldetails-voters`
      );
      console.log("Job Details", res.data);

      // Save voters into state
      setVotersDetails(res.data.data);
      // setjobdetailstData(res.data.jobPostsFormatted);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchVoterDetails();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-sky-700 text-white">
              <tr>
                <th className="py-3 px-4 border">#</th>
                <th className="py-3 px-4 border">Name</th>
                <th className="py-3 px-4 border">NIC</th>
                <th className="py-3 px-4 border">DOB</th>
                <th className="py-3 px-4 border">Gender</th>
                <th className="py-3 px-4 border">District</th>
              </tr>
            </thead>
            <tbody>
              {votersDetails.length > 0 ? (
                votersDetails.map((voter, index) => (
                  <tr key={voter._id} className="hover:bg-gray-100 text-indigo-700">
                    <td className="py-2 px-4 border text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {voter.name}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {voter.nic}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {voter.dob}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {voter.gender}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {voter.district}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No voter data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminviewVoterDetails;
