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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VotersLogin = () => {
  const [data, setData] = useState({
    nic: "",
    fingerprint: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isLoginEnabled = data.nic.trim() !== "" && data.fingerprint !== "";

  // Handle fingerprint scan
  const handleFingerprintScan = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/logincapture-fingerprint/${data.nic}`
      );

      if (response.status === 200) {
        const { voter } = response.data;
        if (voter) {
          localStorage.setItem("voterDetails", JSON.stringify(voter));
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
      // const response = await axios.post(
      //   `http://localhost:8000/api/signupvoter`,
      //   data,
      //   {
      //     withCredentials: true,
      //   }
      // );
      // console.log("Update response:", response);
      localStorage.setItem("isLoggedIn", "true");

      navigate("/voterdetails");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
      <ToastContainer />
      <div className="w-96 p-8 bg-white bg-opacity-5 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Voter Login</h1>
        <input
          type="text"
          onChange={handleOnChange}
          name="nic"
          value={data.nic}
          placeholder="Enter NIC number"
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
            <p className="text-green-500 mt-2">
              Fingerprint scanned successfully!
            </p>
          )}
        </div>

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
        </motion.button>
      </div>
    </div>
  );
};

export default VotersLogin;
