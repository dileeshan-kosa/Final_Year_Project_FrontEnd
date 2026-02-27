// import React, { useState } from "react";
// import axios from "axios";

// const FingerprintScanner = () => {
//   const [scanResult, setScanResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleScan = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/scan-fingerprint"
//       );
//       setScanResult(response.data);
//     } catch (error) {
//       setScanResult({
//         success: false,
//         message: "Error connecting to the scanner.",
//       });
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <h1 className="text-2xl font-bold mb-4">Fingerprint Scanner</h1>
//       <button
//         onClick={handleScan}
//         disabled={loading}
//         className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
//       >
//         {loading ? "Scanning..." : "Scan Fingerprint"}
//       </button>
//       {scanResult && (
//         <div className="mt-4 p-4 border rounded-md bg-white shadow-md">
//           <p
//             className={`font-bold ${
//               scanResult.success ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {scanResult.message}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FingerprintScanner;
