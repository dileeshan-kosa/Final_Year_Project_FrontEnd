// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const candidates = [
//   { id: 1, details: "Kasun Subasignha\nNumber 1" },
//   {
//     id: 2,
//     details: "Upuli Seerashinha\nNumber 2",
//   },
// ];
// const PlacedVotes = () => {
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [currentBinaryHash, setCurrentBinaryHash] = useState("");
//   const [generatedHashes, setGeneratedHashes] = useState([]);
//   const [candidatesData, setCandidatesData] = useState([]);

//   const handleSelection = (id) => {
//     if (!hasVoted) {
//       setSelectedCandidate(id);
//       // Generate new binary hash immediately when candidate is selected(change on the)
//       const newHash = generateBinaryHash(id);
//       setCurrentBinaryHash(newHash);

//       // Log the generation to console
//       console.log(`Generated binary hash for Candidate ${id}:, newHash`);

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

//   const fetchCandidateData = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/get-candidates");
//       setCandidatesData(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchCandidateData();
//   }, []);

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
//           `Your vote for Candidate ${selectedCandidate} has been recorded!\nUnique Binary Code: ${currentBinaryHash}`
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
//                           // src={candidate.candidateImg}
//                           alt={`Candidate ${candidate.id}`}
//                           className="h-16 w-16 rounded-full object-cover border-2 border-gray-500"
//                         />
//                         <span className="ml-3 font-medium">
//                           Candidate {candidate.id}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4">
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

// export default PlacedVotes;

import React, { useEffect, useState } from "react";
import axios from "axios";
import forge from "node-forge";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SHA256 from "crypto-js/sha256";
import { v4 as uuidv4 } from "uuid";

const PlacedVotes = () => {
  const [data, setData] = useState({
    nic: "",
    fingerprint: "",
  });

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedCandidateData, setSelectedCandidateData] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentEncryptedHash, setCurrentEncryptedHash] = useState("");
  const [generatedHashes, setGeneratedHashes] = useState([]);
  const [candidatesData, setCandidatesData] = useState([]);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const navigate = useNavigate();

  const rsaPublicKey = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt+Rqe5bFkGiPaDG/KImZ
  cZ1HXY9SkbAqzYhKldQZiknEDtIQbdY7ZsB9b6MwOrT9JHRPHgf5zQZx2ZxUXHZP
  M9Fq3DhU5IXYrYYCVjU5T6kM2cs+JHZ5i5yzm0g8LRj+pWc9IjVj4EYYjfpqTXXm
  AKKYBfq9iCu8KrkW5J5b7i2FfU4SUGFbSKW8thH3x6sOtR9Zl9Rt2gf78zXfPGOe
  fs6hvOZKAH+c9ISZuHlAMwAVD9O8oNl2qBaUJ+ZV16Q+z+1tSkbtDbO77hzxK/Rl
  W/ztQAw7Pu4DlOHO86iNwzJ8xwZcIkpDP3Um9nO9lf2Fbd2CEPMmDbBpjc6s8zyE
  XwIDAQAB
  -----END PUBLIC KEY-----`;

  const generateBinaryHash = () => {
    return (Math.random() + 1).toString(2).substring(2, 18);
  };

  const encryptWithRSA = (plainText) => {
    const publicKey = forge.pki.publicKeyFromPem(rsaPublicKey);
    const encrypted = publicKey.encrypt(plainText, "RSA-OAEP");
    return forge.util.encode64(encrypted); // base64 encoded output
  };

  const hashNICWithSalt = (nic) => {
    const salt = uuidv4();
    const saltedNIC = nic + salt;
    return SHA256(saltedNIC).toString();
  };

  const handleSelection = (id) => {
    if (!hasVoted) {
      setSelectedCandidate(id);
      const newBinary = generateBinaryHash();
      const encrypted = encryptWithRSA(newBinary);

      console.log("Binary", newBinary);
      setCurrentEncryptedHash(encrypted); // Store current hash only

      // Add to history
      setGeneratedHashes((prev) => [
        ...prev,
        {
          candidate: id,
          encryptedBinary: encrypted,
          time: new Date().toISOString(),
        },
      ]);
      const candidateData = candidatesData.find(
        (candidate) => candidate._id === id
      );
      setSelectedCandidateData(candidateData);
    }
  };

  // fetch candidate data
  const fetchCandidateData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/get-candidates");
      setCandidatesData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCandidateData();
  }, []);

  useEffect(() => {
    if (hasVoted) {
      setIsRedirecting(true); // start spinner
      const timeout = setTimeout(() => {
        localStorage.clear();
        navigate("/voterslogin");
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [hasVoted, navigate]);

  const handleSubmit = async () => {
    const userData = JSON.parse(localStorage.getItem("voterDetails"));
    if (!selectedCandidate) {
      alert("Please select a candidate before submitting!");
      return;
    }
    setIsSubmitting(true); // ← Start loading

    try {
      if (userData) {
        const response = await axios.get(
          `http://localhost:8000/captured-vote/${userData.nic}`
        );

        if (response.status === 200) {
          const { voter } = response.data;
          const rawFingerprint = voter?.fingerprint || "MATCHED";
          const hashedFingerprint = SHA256(rawFingerprint).toString();

          setData((prev) => ({
            ...prev,
            fingerprint: hashedFingerprint,
            // fingerprint: voter?.fingerprint || "MATCHED",
          }));

          const hashedNIC = hashNICWithSalt(userData.nic);
          const encryptedCandidateName = encryptWithRSA(
            selectedCandidateData?.name
          );
          // console.log("Hiiiiii");

          // toast.success(`✅ Fingerprint matched! Welcome, ${voter.name}`, {
          //   position: "top-right",
          // });
          // console.log("gggggggggggggggggggggggg");

          // console.log(
          //   'Voter hash nic and fingerprint :\nObject { Hashed: "' +
          //     hashedNIC +
          //     '" / ' +
          //     encryptedCandidateName +
          //     " }"
          // );

          // console.log(
          //   "Vote submission details: encryptedVote = " +
          //     currentEncryptedHash +
          //     ":" +
          //     encryptedCandidateName
          // );
          const encryptedVote = `${currentEncryptedHash}:${encryptedCandidateName}`;

          console.log("Vote submission:", {
            hashNIC: hashedNIC,
            hashFingerPrint: hashedFingerprint,
            encryptedVote: encryptedVote,
          });

          // // Send to backend
          // await axios.post("http://localhost:8000/api/sendVote", {
          //   hashNIC: hashedNIC,
          //   hashFingerPrint: hashedFingerprint,
          //   encryptedVote: encryptedVote,
          // });

          // Prepare data
          const voteData = {
            hashNIC: hashedNIC,
            hashFingerPrint: hashedFingerprint,
            encryptedVote: encryptedVote,
          };

          // Show what is being sent
          console.log("Sending vote data to backend:", voteData);

          // Send to backend
          await axios.post("http://localhost:8000/api/sendVote", voteData);

          console.log("Data Submit");

          setHasVoted(true);
        }
      }
    } catch (error) {
      setHasVoted(false);
      console.error("Error scanning fingerprint:", error);
      if (error.response?.status === 404) {
        toast.error("❌ No match found for this fingerprint.", {
          position: "top-right",
        });
      } else {
        toast.error("❌ Error during fingerprint scanning.", {
          position: "top-right",
        });

        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-b from-emerald-950 to-emerald-100 p-6 overflow-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Cast Your Vote</h1>

      {hasVoted ? (
        <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center max-w-md">
          <p className="text-white text-xl mb-4">
            Your vote has been successfully recorded!
          </p>
          {/* <button
            onClick={resetVoting}
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Demo: Vote Again
          </button> */}

          {isRedirecting && (
            <div className="flex items-center space-x-2 mt-4">
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-white text-sm">Redirecting to Login...</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="bg-white bg-opacity-5 p-6 rounded-lg shadow-lg w-full max-w-5xl overflow-x-auto">
            <table className="table-auto w-full text-left text-white">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="px-4 py-3">Candidate</th>
                  <th className="px-4 py-3">Symbol</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3 text-center">Select</th>
                </tr>
              </thead>
              <tbody>
                {candidatesData.map((candidate) => (
                  <tr
                    key={candidate._id}
                    className={`border-b border-gray-700 hover:bg-gray-700 transition-all ${
                      hasVoted && selectedCandidate !== candidate._id
                        ? "opacity-40"
                        : ""
                    } ${
                      selectedCandidate === candidate._id
                        ? "bg-gray-700 bg-opacity-70"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-4">
                      <img
                        src={candidate.image}
                        alt={`Candidate ${candidate.name}`}
                        className="h-16 w-16 rounded-full object-cover border-2 border-gray-500"
                      />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <img
                        src={candidate.symbol}
                        alt={`Symbol for ${candidate.name}`}
                        className="h-12 w-12 object-contain "
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-pre-line">
                      <span className="font-semibold text-lg">
                        {candidate.name}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <input
                        type="radio"
                        name="candidateSelection"
                        className="h-5 w-5 cursor-pointer"
                        checked={selectedCandidate === candidate._id}
                        onChange={() => handleSelection(candidate._id)}
                        disabled={hasVoted}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <button
              className={`px-10 py-3 text-white font-bold text-lg rounded-lg focus:outline-none transition-all ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : selectedCandidate
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
              onClick={() => handleSubmit()}
              disabled={!selectedCandidate || isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting Vote...
                </span>
              ) : (
                "CONFIRM VOTE"
              )}
            </button>

            {data.fingerprint && (
              <p className="text-green-500 mt-2">
                Fingerprint scanned successfully!
              </p>
            )}

            {selectedCandidate && !hasVoted && (
              <p className="mt-4 text-gray-500 text-sm">
                You are voting for:{" "}
                <span className="font-bold">
                  {selectedCandidateData?.name || "Unknown Candidate"}
                </span>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlacedVotes;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const PlacedVotes = () => {
//   //get candidates details
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [candidatesData, setCandidatesData] = useState([]);

//   const fetchCandidateData = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/get-candidates");
//       setCandidatesData(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchCandidateData();
//   }, []);

//   const handleSelection = (id) => {
//     setSelectedCandidate(id);
//   };

//   return (
//     <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
//       <h1 className="text-3xl font-bold text-white mb-6">Please Your Vote</h1>
//       <div className="bg-white bg-opacity-5 p-6 rounded-lg shadow-lg w-full max-w-4xl">
//         <table className="table-auto w-full text-left text-white">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Candidate Name</th>
//               <th className="px-4 py-2">Symbol</th>
//               <th className="px-4 py-2">political Party</th>
//               <th className="px-4 py-2 text-center">Click</th>
//             </tr>
//           </thead>
//           <tbody>
//             {candidatesData.map((candidate) => (
//               <tr
//                 key={candidate.id}
//                 className="bg-gray-600 bg-opacity-80 hover:bg-gray-700 transition-all rounded-lg"
//               >
//                 <td className="px-4 py-4 flex text-center">
//                   <span>{candidate.name}</span>
//                 </td>
//                 <td className="px-4 py-4 ">
//                   <img
//                     src={candidate.symbol}
//                     alt="Symbol"
//                     className="h-14 w-14 rounded-full object-cover"
//                   />
//                 </td>
//                 <td className="px-4 py-4 whitespace-pre-line ">
//                   {candidate.politicalparty}
//                 </td>
//                 <td className="px-4 py-4 text-center">
//                   <input
//                     type="checkbox"
//                     className="h-6 w-6"
//                     checked={selectedCandidate === candidate._id}
//                     onChange={() => handleSelection(candidate._id)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <button
//         className="mt-6 px-8 py-3 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 focus:outline-none"
//         onClick={
//           () => alert()
//           //selectedCandidate
//           //</div>? `You selected Candidate ID: ${selectedCandidate}`
//           // : "Please select a candidate"
//         }
//       >
//         DONE
//       </button>
//     </div>
//   );
// };

// export default PlacedVotes;
