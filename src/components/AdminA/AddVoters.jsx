// import axios from "axios";
// import React, { useState } from "react";

// const AddVoters = () => {
//   const initialData = {
//     name: "",
//     nic: "",
//     dob: "",
//     gender: "",
//     district: "",
//     fingerprintAttempts: [], // Store multiple fingerprint attempts
//   };
//   const [data, setData] = useState(initialData);
//   // const [fingerprintAttempts, setFingerprintAttempts] = useState([]);

//   // const handleOnChange = (field, value) => {
//   //   setData((prevData) => ({
//   //     ...prevData,
//   //     [field]: value,
//   //   }));
//   // };
//   const handleOnChange = (field, value) => {
//     setData((prevData) => {
//       const newData = { ...prevData, [field]: value };
//       console.log(`${field}:`, value); // Log value to console
//       return newData;
//     });
//   };

//   // Function to trigger fingerprint scan using WebAuthn
//   const handleFingerprintScan = async () => {
//     try {
//       // Create a new credential (this will prompt fingerprint scan)
//       const publicKey = {
//         challenge: Uint8Array.from("randomChallengeString", (c) =>
//           c.charCodeAt(0)
//         ),
//         rp: { name: "Your Application Name" },
//         user: {
//           id: Uint8Array.from(data.nic, (c) => c.charCodeAt(0)), // Use NIC as unique ID
//           name: data.name,
//           displayName: data.name,
//         },
//         pubKeyCredParams: [
//           { type: "public-key", alg: -7 }, // ES256 (ECDSA with SHA-256)
//           { type: "public-key", alg: -257 }, // RS256 (RSASSA-PKCS1-v1_5 with SHA-256)
//         ],
//         authenticatorSelection: {
//           authenticatorAttachment: "platform", // Use platform authenticator (fingerprint)
//           userVerification: "required",
//         },
//         timeout: 60000,
//         attestation: "direct",
//       };

//       const credential = await navigator.credentials.create({ publicKey });

//       // Convert the credential into a numeric fingerprint (for storage)
//       const fingerprintValue = new Uint8Array(credential.rawId).reduce(
//         (acc, val) => acc + val,
//         0
//       );

//       if (!data.fingerprintAttempts.includes(fingerprintValue)) {
//         setData((prevData) => ({
//           ...prevData,
//           fingerprint: fingerprintValue,
//           fingerprintAttempts: [
//             ...prevData.fingerprintAttempts,
//             fingerprintValue,
//           ],
//         }));
//         console.log("Fingerprint scanned and converted:", fingerprintValue);
//       } else {
//         console.warn("Fingerprint already scanned. Try another finger.");
//       }
//     } catch (error) {
//       console.error("Fingerprint scan failed:", error);
//     }
//   };

//   //save voter data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `http://localhost:8000/api/manage-voters`,
//         data
//       );
//       console.log("response", response);
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };
//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col items-center p-10 font-semibold text-black gap-6 w-1/2 rounded-lg shadow-md "
//       >
//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Name</label>
//           <input
//             type="text"
//             value={data.name}
//             onChange={(e) => handleOnChange("name", e.target.value)}
//             //onChange={(e) => handleOnChange("reasone", e.target.value)}
//             className="w- h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Name"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">NIC</label>
//           <input
//             type="text"
//             value={data.nic}
//             onChange={(e) => handleOnChange("nic", e.target.value)}
//             className="w- h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the NIC"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5 overflow-auto">
//           <label className="text-lg mb-2 text-center">DOB</label>
//           <input
//             type="text"
//             value={data.dob}
//             onChange={(e) => handleOnChange("dob", e.target.value)}
//             className="w- h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the DOB"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Gender</label>
//           <select
//             value={data.gender}
//             onChange={(e) => handleOnChange("gender", e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         {/* <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Gender</label>
//           <input
//             type="text"
//             //value={data.reasone}
//             //onChange={(e) => handleOnChange("reasone", e.target.value)}
//             className="w- h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Gender"
//             required
//           />
//         </div> */}

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">District</label>
//           <input
//             type="text"
//             value={data.district}
//             onChange={(e) => handleOnChange("district", e.target.value)}
//             className="w- h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Distric"
//             required
//           />
//         </div>

//         {/* <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Fingerprint</label>
//           <input
//             type="text"
//             //value={data.reasone}
//             //onChange={(e) => handleOnChange("reasone", e.target.value)}
//             className="w- h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Fingerprint"
//             required
//           />
//         </div> */}

//         {/* <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Fingerprint</label>
//           <input
//             type="text"
//             value={data.fingerprint}
//             readOnly
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Scan fingerprint to auto-fill"
//           />
//           <button
//             type="button"
//             onClick={handleFingerprintScan}
//             className="bg-blue-500 mt-4 px-8 py-2 hover:bg-blue-600 rounded-full text-white"
//           >
//             Scan Fingerprint
//           </button>
//           {data.fingerprint && (
//             <p className="text-green-500 mt-2">
//               Fingerprint scanned successfully!
//             </p>
//           )}
//         </div> */}

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Fingerprint</label>
//           <button
//             type="button"
//             onClick={handleFingerprintScan}
//             className="bg-blue-500 mt-4 px-8 py-2 hover:bg-blue-600 rounded-full text-white"
//           >
//             Scan Fingerprint
//           </button>
//           {data.fingerprint && (
//             <p className="text-green-500 mt-2">
//               Fingerprint scanned successfully!
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           onClick={(e) => handleSubmit}
//           className="bg-orange-500 px-12 py-4 hover:bg-orange-600 rounded-full text-center w-44 max-w-[150px] text-xl hover:scale-110 transition-all mt-8"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddVoters;

// import axios from "axios";
// import React, { useState } from "react";

// const AddVoters = () => {
//   const initialData = {
//     name: "",
//     nic: "",
//     dob: "",
//     gender: "",
//     district: "",
//     fingerprintAttempts: [], // Store multiple fingerprint attempts
//   };

//   const [data, setData] = useState(initialData);

//   const handleOnChange = (field, value) => {
//     setData((prevData) => {
//       const newData = { ...prevData, [field]: value };
//       console.log(`${field}:`, value); // Log value to console
//       return newData;
//     });
//   };

//   // Function to trigger fingerprint scan using WebAuthn
//   const handleFingerprintScan = async () => {
//     try {
//       const publicKey = {
//         challenge: new Uint8Array(32), // Generate a random challenge
//         rp: { name: "Your Application Name" },
//         user: {
//           id: Uint8Array.from(data.nic, (c) => c.charCodeAt(0)), // Use NIC as unique ID
//           name: data.name,
//           displayName: data.name,
//         },
//         pubKeyCredParams: [
//           { type: "public-key", alg: -7 }, // ES256 (ECDSA with SHA-256)
//           { type: "public-key", alg: -257 }, // RS256 (RSASSA-PKCS1-v1_5 with SHA-256)
//         ],
//         authenticatorSelection: {
//           authenticatorAttachment: "platform", // Use platform authenticator (fingerprint)
//           userVerification: "required",
//         },
//         timeout: 60000,
//         attestation: "direct",
//       };

//       const credential = await navigator.credentials.create({ publicKey });

//       // Generate a consistent fingerprint hash
//       const fingerprintBuffer = new Uint8Array(credential.rawId);
//       const fingerprintValue = fingerprintBuffer.reduce(
//         (acc, val) => (acc * 31 + val) % 1000000007,
//         7
//       );

//       if (!data.fingerprintAttempts.includes(fingerprintValue)) {
//         setData((prevData) => ({
//           ...prevData,
//           fingerprint: fingerprintValue,
//           fingerprintAttempts: [
//             ...prevData.fingerprintAttempts,
//             fingerprintValue,
//           ],
//         }));
//         console.log("Fingerprint scanned and converted:", fingerprintValue);
//       } else {
//         console.warn("Fingerprint already scanned. Try another finger.");
//       }
//     } catch (error) {
//       console.error("Fingerprint scan failed:", error);
//     }
//   };

//   // Save voter data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `http://localhost:8000/api/manage-voters`,
//         data
//       );
//       console.log("response", response);
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col items-center p-10 font-semibold text-black gap-6 w-1/2 rounded-lg shadow-md "
//       >
//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Name</label>
//           <input
//             type="text"
//             value={data.name}
//             onChange={(e) => handleOnChange("name", e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Name"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">NIC</label>
//           <input
//             type="text"
//             value={data.nic}
//             onChange={(e) => handleOnChange("nic", e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the NIC"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">DOB</label>
//           <input
//             type="text"
//             value={data.dob}
//             onChange={(e) => handleOnChange("dob", e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the DOB"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Gender</label>
//           <select
//             value={data.gender}
//             onChange={(e) => handleOnChange("gender", e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">District</label>
//           <input
//             type="text"
//             value={data.district}
//             onChange={(e) => handleOnChange("district", e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the District"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Fingerprint</label>
//           <button
//             type="button"
//             onClick={handleFingerprintScan}
//             className="bg-blue-500 mt-4 px-8 py-2 hover:bg-blue-600 rounded-full text-white"
//           >
//             Scan Fingerprint
//           </button>
//           {data.fingerprint && (
//             <p className="text-green-500 mt-2">
//               Fingerprint scanned successfully!
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="bg-orange-500 px-12 py-4 hover:bg-orange-600 rounded-full text-center w-44 max-w-[150px] text-xl hover:scale-110 transition-all mt-8"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddVoters;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddVoters = () => {
  const initialData = {
    name: "",
    nic: "",
    dob: "",
    gender: "",
    district: "",
    fingerprint: "", // Store fingerprint data here
  };

  const [data, setData] = useState(initialData);

  const handleOnChange = (field, value) => {
    setData((prevData) => {
      const newData = { ...prevData, [field]: value };
      return newData;
    });
  };

  // NIC validation (Sri Lanka Old + New NIC formats)
  const isValidNIC = (nic) => {
    const oldNIC = /^[0-9]{9}[VvXx]$/; // Old: 9 digits + V/X
    const newNIC = /^[0-9]{12}$/; // New: 12 digits
    return oldNIC.test(nic) || newNIC.test(nic);
  };

  // Handle fingerprint scan
  const handleFingerprintScan = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/capture-fingerprint"
      );

      const base64Data = response.data.fingerprintBase64;
      console.log("Fingerprint Data:", base64Data);
      setData((prevData) => ({ ...prevData, fingerprint: base64Data }));

      // Show success toast notification
      toast.success("Fingerprint scanned successfully!", {
        // position: "top-center",
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error scanning fingerprint:", error);
      toast.error("Fingerprint scan failed");
    }
  };

  useEffect(() => {
    console.log("form data :", data);
  }, [data]);

  // Save voter data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // NIC validation before submitting
    if (!isValidNIC(data.nic)) {
      toast.error("Invalid NIC. Use 9 digits + V/X OR 12-digit NIC.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/manage-voters",
        data
      );
      console.log("response", response);
      toast.success("Voter added successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setData(initialData); // <-- Clear form after success
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong while adding voter", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-10 font-semibold text-black gap-6 w-[70%] max-w-2xl rounded-[50px] shadow-2xl from-emerald-700 to-emerald-900"
      >
        {/* Form Fields */}
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleOnChange("name", e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the Name"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">NIC</label>
          <input
            type="text"
            value={data.nic}
            onChange={(e) => handleOnChange("nic", e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the NIC"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5 overflow-auto">
          <label className="text-lg mb-2 text-center">DOB</label>
          <input
            type="date"
            value={data.dob}
            onChange={(e) => handleOnChange("dob", e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Select the DOB"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Gender</label>
          <select
            value={data.gender}
            onChange={(e) => handleOnChange("gender", e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">District</label>
          <input
            type="text"
            value={data.district}
            onChange={(e) => handleOnChange("district", e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the Distric"
            required
          />
        </div> */}
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">District</label>
          <select
            value={data.district}
            onChange={(e) => handleOnChange("district", e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            required
          >
            <option value="">Select District</option>
            <option value="Ampara">Ampara</option>
            <option value="Anuradhapura">Anuradhapura</option>
            <option value="Badulla">Badulla</option>
            <option value="Batticaloa">Batticaloa</option>
            <option value="Colombo">Colombo</option>
            <option value="Galle">Galle</option>
            <option value="Gampaha">Gampaha</option>
            <option value="Hambantota">Hambantota</option>
            <option value="Jaffna">Jaffna</option>
            <option value="Kalutara">Kalutara</option>
            <option value="Kandy">Kandy</option>
            <option value="Kegalle">Kegalle</option>
            <option value="Kilinochchi">Kilinochchi</option>
            <option value="Kurunegala">Kurunegala</option>
            <option value="Mannar">Mannar</option>
            <option value="Matale">Matale</option>
            <option value="Matara">Matara</option>
            <option value="Monaragala">Monaragala</option>
            <option value="Mullaitivu">Mullaitivu</option>
            <option value="Nuwara Eliya">Nuwara Eliya</option>
            <option value="Polonnaruwa">Polonnaruwa</option>
            <option value="Puttalam">Puttalam</option>
            <option value="Ratnapura">Ratnapura</option>
            <option value="Trincomalee">Trincomalee</option>
            <option value="Vavuniya">Vavuniya</option>
          </select>
        </div>

        {/* More Form Fields */}

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Fingerprint</label>
          <button
            type="button"
            onClick={handleFingerprintScan}
            className="bg-blue-500 mt-4 px-8 py-2 hover:bg-blue-600 rounded-full text-white"
          >
            Scan Fingerprint
          </button>
          {data.fingerprint && (
            <p className="text-blue-800 text-xl mt-4 font-bold tracking-wide text-center">
              Fingerprint scanned successfully!
            </p>
          )}
        </div>

        <button
          type="submit"
          className=" w-60 mt-4 px-10 py-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white font-bold text-lg rounded-full shadow-md hover:shadow-amber-400/40 transition-all"
        >
          Submit
        </button>
      </form>
      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default AddVoters;
