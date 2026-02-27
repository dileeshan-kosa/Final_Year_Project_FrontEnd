// import axios from "axios";
// import React, { useState } from "react";

// const AddVoters = () => {
//   const initialData = {
//     name: "",
//     nic: "",
//     dob: "",
//     gender: "",
//     district: "",
//     fingerprint: "", // Store fingerprint data as a string
//   };

//   const [data, setData] = useState(initialData);

//   // const handleOnChange = (field, value) => {
//   //   setData((prevData) => {
//   //     const newData = { ...prevData, [field]: value };
//   //     console.log(`${field}:`, value); // Log value to console
//   //     return newData;
//   //   });
//   // };

//   const handleOnChange = (field, value) => {
//     setData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };

//   // Simulating fingerprint scan function
//   const handleFingerprintScan = async () => {
//     try {
//       // Send request to the backend to scan fingerprint (assuming API exists)
//       const response = await axios.get(
//         `http://localhost:8000/api/scan-fingerprint`
//       );
//       if (response.data.fingerprint) {
//         setData((prevData) => ({
//           ...prevData,
//           fingerprint: response.data.fingerprint, // Assign scanned fingerprint
//         }));
//         console.log("Fingerprint scanned:", response.data.fingerprint);
//       } else {
//         console.log("Fingerprint scan failed.");
//       }
//     } catch (error) {
//       console.log("Error scanning fingerprint:", error);
//     }
//   };

//   // Function to trigger fingerprint scan using WebAuthn
//   // const handleFingerprintScan = async () => {
//   //   try {
//   //     const publicKey = {
//   //       challenge: new Uint8Array(32), // Generate a random challenge
//   //       rp: { name: "Your Application Name" },
//   //       user: {
//   //         id: Uint8Array.from(data.nic, (c) => c.charCodeAt(0)), // Use NIC as unique ID
//   //         name: data.name,
//   //         displayName: data.name,
//   //       },
//   //       pubKeyCredParams: [
//   //         { type: "public-key", alg: -7 }, // ES256 (ECDSA with SHA-256)
//   //         { type: "public-key", alg: -257 }, // RS256 (RSASSA-PKCS1-v1_5 with SHA-256)
//   //       ],
//   //       authenticatorSelection: {
//   //         authenticatorAttachment: "platform", // Use platform authenticator (fingerprint)
//   //         userVerification: "required",
//   //       },
//   //       timeout: 60000,
//   //       attestation: "direct",
//   //     };

//   //     const credential = await navigator.credentials.create({ publicKey });

//   //     // Generate a consistent fingerprint hash
//   //     const fingerprintBuffer = new Uint8Array(credential.rawId);
//   //     const fingerprintValue = fingerprintBuffer.reduce(
//   //       (acc, val) => (acc * 31 + val) % 1000000007,
//   //       7
//   //     );

//   //     if (!data.fingerprintAttempts.includes(fingerprintValue)) {
//   //       setData((prevData) => ({
//   //         ...prevData,
//   //         fingerprint: fingerprintValue,
//   //         fingerprintAttempts: [
//   //           ...prevData.fingerprintAttempts,
//   //           fingerprintValue,
//   //         ],
//   //       }));
//   //       console.log("Fingerprint scanned and converted:", fingerprintValue);
//   //     } else {
//   //       console.warn("Fingerprint already scanned. Try another finger.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Fingerprint scan failed:", error);
//   //   }
//   // };

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


















// import React, { useState } from "react";

// // Import images from your assets folder
// import candidate1 from "../assets/images/candidate1.png";
// import candidate2 from "../assets/images/candidate2.png";
// import candidate3 from "../assets/images/candidate3.png";
// import candidate4 from "../assets/images/candidate4.png";
// import { symbol1, symbol2, symbol3, symbol4 } from "../assets";

// const candidates = [
//   {
//     id: 1,
//     candidateImg: candidate1,
//     symbolImg: symbol1,
//     details: "Kasun Subasignha\nNumber 1",
//   },
//   {
//     id: 2,
//     candidateImg: candidate2,
//     symbolImg: symbol2,
//     details: "Upuli Seerashinha\nNumber 2",
//   },
//   {
//     id: 3,
//     candidateImg: candidate3,
//     symbolImg: symbol3,
//     details: "Radun Ganukkaduwa\nNumber 3",
//   },
//   {
//     id: 4,
//     candidateImg: candidate4,
//     symbolImg: symbol4,
//     details: "Inuru Radawadunna\nNumber 4",
//   },
// ];

// // hash generator part for the vote
// const generateBinaryHash = (candidateId) => {
//   // 1. Candidate identifier (4 bits)
//   const candidateBinary = candidateId.toString(2).padStart(4, "0");

//   // 2. Random component (8 bits)
//   const randomBits = Math.floor(Math.random() * 256)
//     .toString(2)
//     .padStart(8, "0");

//   // 3. Timestamp component (milliseconds since epoch, variable length)
//   const timestampBinary = Date.now().toString(2);

//   // 4. Combine all components with separators
//   return ${candidateBinary}-${randomBits}-${timestampBinary};
// };

// const Placevotes = () => {
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [currentBinaryHash, setCurrentBinaryHash] = useState("");
//   const [generatedHashes, setGeneratedHashes] = useState([]);

//   const handleSelection = (id) => {
//     if (!hasVoted) {
//       setSelectedCandidate(id);
//       // Generate new binary hash immediately when candidate is selected(change on the)
//       const newHash = generateBinaryHash(id);
//       setCurrentBinaryHash(newHash);

//       // Log the generation to console
//       console.log(Generated binary hash for Candidate ${id}:, newHash);

//       // Store all generated hashes for reference
//       setGeneratedHashes((prev) => [
//         ...prev,
//         {
//           candidate: id,
//           hash: newHash,
//           time: new Date().toISOString(),
//         },
//       ]);
//     }
//   };

//   const handleSubmit = () => {
//     if (selectedCandidate) {
//       setIsSubmitting(true);

//       // Log complete voting details
//       console.log("Vote submission details:", {
//         candidate: selectedCandidate,
//         binaryHash: currentBinaryHash,
//         timestamp: new Date().toISOString(),
//         allGeneratedHashes: generatedHashes,
//       });

//       // Simulate blockchain submission
//       setTimeout(() => {
//         alert(
//           Your vote for Candidate ${selectedCandidate} has been recorded!\nUnique Binary Code: ${currentBinaryHash}
//         );
//         setHasVoted(true);
//         setIsSubmitting(false);
//       }, 1500);
//     } else {
//       alert("Please select a candidate before submitting!");
//     }
//   };

//   const resetVoting = () => {
//     setSelectedCandidate(null);
//     setHasVoted(false);
//     setCurrentBinaryHash("");
//     setGeneratedHashes([]);
//   };

//   return (
//     <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
//       <h1 className="text-3xl font-bold text-white mb-6">Cast Your Vote</h1>

//       {hasVoted ? (
//         <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center max-w-md">
//           <p className="text-white text-xl mb-4">
//             Your vote has been successfully recorded!
//           </p>
//           {/* <div className="bg-gray-800 p-4 rounded mb-6">
//             <p className="text-gray-300 text-sm">Unique Binary Code:</p>
//             <p className="text-green-400 font-mono text-sm break-all">
//               {currentBinaryHash}
//             </p>
//           </div> */}
//           <button
//             onClick={resetVoting}
//             className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
//           >
//             Demo: Vote Again
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="bg-white bg-opacity-5 p-6 rounded-lg shadow-lg w-full max-w-4xl">
//             <table className="table-auto w-full text-left text-white">
//               <thead>
//                 <tr className="border-b border-gray-600">
//                   <th className="px-4 py-3">Candidate</th>
//                   <th className="px-4 py-3">Symbol</th>
//                   <th className="px-4 py-3">Details</th>
//                   <th className="px-4 py-3 text-center">Select</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {candidates.map((candidate) => (
//                   <tr
//                     key={candidate.id}
//                     className={`border-b border-gray-700 hover:bg-gray-700 transition-all ${
//                       hasVoted && selectedCandidate !== candidate.id
//                         ? "opacity-40"
//                         : ""
//                     } ${
//                       selectedCandidate === candidate.id
//                         ? "bg-gray-700 bg-opacity-70"
//                         : ""
//                     }`}
//                   >
//                     <td className="px-4 py-4">
//                       <div className="flex items-center">
//                         <img
//                           src={candidate.candidateImg}
//                           alt={Candidate ${candidate.id}}
//                           className="h-16 w-16 rounded-full object-cover border-2 border-gray-500"
//                         />
//                         <span className="ml-3 font-medium">
//                           Candidate {candidate.id}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <img
//                         src={candidate.symbolImg}
//                         alt={Symbol ${candidate.id}}
//                         className="h-12 w-12 object-contain"
//                       />
//                     </td>
//                     <td className="px-4 py-4 whitespace-pre-line">
//                       {candidate.details}
//                     </td>
//                     <td className="px-4 py-4 text-center">
//                       <input
//                         type="radio"
//                         name="candidateSelection"
//                         className="h-5 w-5 cursor-pointer"
//                         checked={selectedCandidate === candidate.id}
//                         onChange={() => handleSelection(candidate.id)}
//                         disabled={hasVoted}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-8 flex flex-col items-center">
//             {/* {selectedCandidate && (
//               <div className="mb-4 bg-gray-800 p-3 rounded-lg">
//                 <p className="text-gray-300 text-sm">Generated Binary Code:</p>
//                 <p className="text-green-400 font-mono text-sm break-all">
//                   {currentBinaryHash || "Select a candidate"}
//                 </p>
//               </div>
//             )} */}

//             <button
//               className={`px-10 py-3 text-white font-bold text-lg rounded-lg focus:outline-none transition-all ${
//                 isSubmitting
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : selectedCandidate
//                   ? "bg-orange-500 hover:bg-orange-600"
//                   : "bg-gray-600 cursor-not-allowed"
//               }`}
//               onClick={handleSubmit}
//               disabled={!selectedCandidate || isSubmitting}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Submitting Vote...
//                 </span>
//               ) : (
//                 "CONFIRM VOTE"
//               )}
//             </button>

//             {selectedCandidate && !hasVoted && (
//               <p className="mt-4 text-gray-300 text-sm">
//                 You are voting for:{" "}
//                 <span className="font-bold">Candidate {selectedCandidate}</span>
//               </p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Placevotes;