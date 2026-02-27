// import axios from "axios";
// import { motion } from "framer-motion";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

// const VotersLogin = () => {
//   const [data, setData] = useState({
//     nic: "",
//     fingerprint: "",
//   });

//   const navigate = useNavigate();

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;

//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value,
//       };
//     });
//   };

//   //Handle fingerprint scan
//   const handleFingerprintScan = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/logincapture-fingerprint/${data.nic}`
//       );
//       if (response.status === 200) {
//         const { voter } = response.data;

//         setData((prev) => ({
//           ...prev,
//           fingerprint: voter?.fingerprint || "MATCHED", // optional storage
//         }));
//         toast.success(`✅ Fingerprint matched! Welcome, ${voter.name}`, {
//           position: "top-center",
//         });
//       }

//       const fingerprintBase64 = response.data.fingerprintBase64;
//       // console.log("Fingerprint Data:", fingerprintBase64);
//       setData((prev) => ({
//         ...prev,
//         fingerprint: fingerprintBase64,
//       }));
//       console.log("✅ Fingerprint Captured:", fingerprintBase64);
//     } catch (error) {
//       console.error("Error scanning fingerprint:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `http://localhost:8000/api/signupvoter`,
//         data,
//         {
//           withCredentials: true,
//         }
//       );
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     console.log("Update response:", response);
//   };
//   console.log("data loging", data);

//   const navigate = useNavigate();
//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
//       <div className="w-96 p-8 bg-white bg-opacity-5 rounded-lg shadow-md text-center">
//         <h1 className="text-4xl font-bold text-white mb-6">Voter Login</h1>
//         {/* NIC Input */}
//         <input
//           type="text"
//           onChange={handleOnChange}
//           name="nic"
//           value={data.nic}
//           placeholder="Enter NIC number"
//           className="w-full py-3 px-4 mb-8 rounded-lg bg-gray-300 text-black focus:outline-none"
//         />
//         {/* Enter Fingerprint Button */}
//         <div className="flex flex-col w-full mb-5">
//           <button
//             type="button"
//             onClick={handleFingerprintScan}
//             className="w-full py-3 mb-4  rounded-lg bg-blue-500 mt-4 px-8 hover:bg-blue-600 text-white"
//           >
//             Scan Fingerprint
//           </button>
//           {data.fingerprint && (
//             <p className="text-green-500 mt-2">
//               Fingerprint scanned successfully!
//             </p>
//           )}
//         </div>
//         {/* <button className="w-full py-3 mb-6 rounded-lg bg-blue-500 text-white font-bold text-lg hover:bg-blue-700 focus:outline-none">
//           Scan Fingerprint
//         </button> */}
//         {/* Back to Admin Button */}
//         {/* <button
//           onClick={() => navigate("/administrationlogin")}
//           className="w-full py-3 rounded-lg bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 focus:outline-none"
//         >
//           Back to Admin
//         </button> */}
//         <motion.button
//           onClick={handleSubmit}
//           // type="submit"
//           // onClick={() => navigate("/details")}
//           className="w-44 py-3 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 hover:scale-110 focus:outline-none center"
//         >
//           Login
//         </motion.button>
//       </div>
//     </div>
//   );
// };

// export default VotersLogin;

import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useElectionStatus } from "../hooks/useElectionStatus";

// Convert milliseconds to hours, minutes, seconds
const splitTime = (ms) => {
  if (ms <= 0) return { h: "00", m: "00", s: "00" };

  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");

  return { h, m, s };
};

// Single Timer Card
const TimerCard = ({ label, time }) => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-[#028c0b] to-[#028a51] text-white rounded-2xl shadow-2xl p-6 w-72">
      <h3 className="text-lg font-semibold mb-4">{label}</h3>
      <div className="flex justify-center gap-4 text-2xl font-bold">
        <div className="bg-white/20 px-4 py-2 rounded-lg">
          {time.h} <span className="text-sm">h</span>
        </div>
        <div className="bg-white/20 px-4 py-2 rounded-lg">
          {time.m} <span className="text-sm">min</span>
        </div>
        <div className="bg-white/20 px-4 py-2 rounded-lg">
          {time.s} <span className="text-sm">s</span>
        </div>
      </div>
    </div>
  );
};

const VotersLogin = () => {
  const [data, setData] = useState({
    nic: "",
    fingerprint: "",
  });

  const [dates, setDates] = useState({
    electionStartAt: null,
    electionEndAt: null,
  });
  const [timers, setTimers] = useState({
    electionStart: { h: "00", m: "00", s: "00" },
    electionEnd: { h: "00", m: "00", s: "00" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  //  Get current election result
  const { isElectionRunning, status } = useElectionStatus();

  // Fetch election dates
  useEffect(() => {
    const fetchElectionDates = async () => {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8000/api/get-electionstatus"
      );
      console.log("response",res.data.data)
      if (res.data.data) {
        setDates({
          electionStartAt: new Date(res.data.data.electionStartAt),
          electionEndAt: new Date(res.data.data.electionEndAt),
        });
      }
      try {
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchElectionDates();
  }, []);

  // Countdown logic
  useEffect(() => {
    if (!dates.electionStartAt || !dates.electionEndAt) return;

    const interval = setInterval(() => {
      const now = new Date();
      setTimers({
        electionStart: splitTime(dates.electionStartAt - now),
        electionEnd: splitTime(dates.electionEndAt - now),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dates]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
        <div className="text-white text-xl">Loading election timers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
        <div className="text-red-400 text-xl">
          Failed to fetch election status.
        </div>
      </div>
    );
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isLoginEnabled =
    data.nic.trim() !== "" && data.fingerprint !== "" && isElectionRunning;

  // Block fingerPrint sacn when election is nor running.
  // Handle fingerprint scan
  const handleFingerprintScan = async () => {
    if (!isElectionRunning) {
      toast.error("❌ Election is not running. Login is disabled.", {
        position: "top-right",
      });
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/logincapture-fingerprint/${data.nic}`
      );

      if (response.status === 200) {
        const { voter, permission = false } = response.data;
        if (voter && !voter.permission) {
          localStorage.setItem("voterDetails", JSON.stringify(voter));
          // localStorage.setItem("voterToken", response.data.token);
        }
        setData((prev) => ({
          ...prev,
          fingerprint: voter?.fingerprint || "MATCHED", // optional storage
        }));

        toast.success(`✅ Fingerprint matched! Welcome, ${voter.name}`, {
          position: "top-right",
        });
        // Delay navigation so toast is visible
        // setTimeout(() => {
        //   navigate("/voterdetails");
        // }, 1500); // 1.5 seconds
      } else {
        toast.error("❌ Fingerprint not matched", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error scanning fingerprint:", error);
      if (error.response?.status === 404) {
        toast.error("❌ No match found for this fingerprint.", {
          position: "top-right",
        });
      } else if (error.response?.status === 403) {
        console.log("Warning message :", error);
        // const warningMessage = response.data.
        toast.warning(`You're already voted.`);
      } else {
        toast.error("❌ Error during fingerprint scanning.", {
          position: "top-right",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isElectionRunning) {
        toast.error("❌ Election is not running now. Login disabled.");
        return;
      }

      // const details = JSON.parse(localStorage.getItem("voterDetails"));
      // console.log("details : ", details);

      // const payload = {
      //   nic: details.nic,
      //   fingerprint: details.fingerprint,
      // };

      // const response = await axios.post(
      //   `http://localhost:8000/api/signupvoter`,
      //   // data,
      //   payload
      //   // {
      //   //   withCredentials: true,
      //   // }
      // );
      // console.log("Login response :", response);
      localStorage.setItem("isLoggedIn", "true");

      navigate("/voterdetails");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    // <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-200">
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-200 p-6">
      {/* Countdown Timer Cards */}
      <div className="flex flex-col md:flex-row gap-6 items-center mb-14">
        <TimerCard label="Election Starts In" time={timers.electionStart} />
        <TimerCard label="Election Ends In" time={timers.electionEnd} />
      </div>

      {/* Warning Message */}
      {/* <div className="text-center text-yellow-400 font-semibold text-lg mb-6">
        You can't access the system until the election starts.
      </div> */}

      <ToastContainer />
      <div className="w-96 p-8 bg-white bg-opacity-5 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Voter Login</h1>
        <input
          type="text"
          onChange={handleOnChange}
          name="nic"
          value={data.nic}
          placeholder="Enter Your NIC Number"
          className="w-full py-3 px-4 mb-8 rounded-lg bg-gray-300 text-black focus:outline-none"
        />
        <div className="flex flex-col w-full mb-5">
          <button
            type="button"
            onClick={handleFingerprintScan}
            className="w-full py-3 mb-4  rounded-lg bg-blue-500 mt-4 px-8 hover:bg-blue-600 text-white"
          >
            Scan Fingerprint
          </button>
          {data.fingerprint && (
            <p className="text-blue-800 text-lg mt-3 font-bold tracking-wide text-center">
              Fingerprint scanned successfully!
            </p>
          )}
        </div>
        {/* 
        <motion.button
          onClick={handleSubmit}
          disabled={!isLoginEnabled}
          className={`w-44 py-3 rounded-lg font-bold text-lg focus:outline-none center transition duration-200 ${
            isLoginEnabled
              ? "bg-orange-500 text-white hover:bg-orange-600 hover:scale-110"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Login
        </motion.button> */}

        <motion.button
          onClick={handleSubmit}
          disabled={!isLoginEnabled}
          className={`w-44 py-3 rounded-lg font-bold text-lg focus:outline-none transition duration-200 ${
            isLoginEnabled
              ? "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white shadow-md hover:scale-105"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Login
        </motion.button>
      </div>
    </div>
  );
};

export default VotersLogin;
