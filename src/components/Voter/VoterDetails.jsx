// import React, { useEffect, useState } from "react";
// import { data, useNavigate } from "react-router-dom";

// const VoterDetails = () => {
//   const voterDetails = localStorage.getItem("voterDetails");
//   const navigate = useNavigate();
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const storedVoter = localStorage.getItem("voterDetails");

//     if (storedVoter) {
//       try {
//         const parsed = JSON.parse(storedVoter); // 👈 parse the JSON string
//         setData(parsed);
//       } catch (err) {
//         console.error("Failed to parse voter data from localStorage", err);
//       }
//     }
//   }, []);

//   const handleNext = (e) => {
//     e.preventDefault();
//     navigate("/placedvotes");
//   };

//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
//       <div className="w-96 p-8 bg-white bg-opacity-5 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center text-white mb-6">
//           Voter Details
//         </h1>
//         {/* Only the form will be shown with placeholders */}
//         <form className="flex flex-col gap-5" onSubmit={handleNext}>
//           <input
//             type="text"
//             readOnly
//             value={data.name || "No data captured"}
//             placeholder="Name"
//             className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
//           />

//           <input
//             type="text"
//             value={data.nic || "No data Fatched"}
//             readOnly
//             placeholder="NIC"
//             className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
//           />

//           <input
//             type="text"
//             value={data.district || "No data Fatched"}
//             readOnly
//             placeholder="District"
//             className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
//           />

//           <button
//             type="submit"
//             className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 focus:outline-none"
//           >
//             Next
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VoterDetails;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VoterDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const storedVoter = localStorage.getItem("voterDetails");

    if (storedVoter) {
      try {
        const parsed = JSON.parse(storedVoter);
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
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[420px] p-8 bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 "
      >
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Voter Profile
        </h1>

        <div className="flex flex-col gap-6 text-white">
          {/* Profile Avatar */}
          <div className="flex justify-center mb-2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-300 flex items-center justify-center text-3xl font-bold shadow-lg">
              {data.name ? data.name.charAt(0).toUpperCase() : "?"}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 text-center">
            <div className="bg-white/10 rounded-lg px-5 py-3 border border-white/20 shadow-inner">
              <p className="text-sm text-blue-800 uppercase tracking-wide">
                Name
              </p>
              <p className="text-lg font-semibold text-white">
                {data.name || "No data captured"}
              </p>
            </div>

            <div className="bg-white/10 rounded-lg px-5 py-3 border border-white/20 shadow-inner">
              <p className="text-sm text-blue-800 uppercase tracking-wide">
                NIC
              </p>
              <p className="text-lg font-semibold text-white">
                {data.nic || "No data fetched"}
              </p>
            </div>

            <div className="bg-white/10 rounded-lg px-5 py-3 border border-white/20 shadow-inner">
              <p className="text-sm text-blue-800 uppercase tracking-wide">
                District
              </p>
              <p className="text-lg font-semibold text-white">
                {data.district || "No data fetched"}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="w-full mt-2 py-3 rounded-lg font-bold text-lg bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white shadow-lg hover:shadow-amber-500/40 transition-all"
          >
            Next →
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default VoterDetails;
