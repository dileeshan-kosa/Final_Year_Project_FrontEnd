// import React, { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// const DashboardGuidePopup = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);

//   useEffect(() => {
//     // ⏱️ Show popup automatically after 5 seconds
//     const timer = setTimeout(() => setShowPopup(true), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleClose = () => {
//     if (isChecked) setShowPopup(false);
//   };

//   return (
//     <AnimatePresence>
//       {showPopup && (
//         <motion.div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white/10 border border-white/20 rounded-2xl p-28 text-white max-w-6xl mx-4 shadow-2xl backdrop-blur-md"
//           >
//             <h2 className="text-6xl font-bold mb-6 text-center text-amber-400">
//               👋 Welcome, Admin!
//             </h2>

//             <div className="space-y-5 text-base leading-relaxed">
//               <p className="text-center text-4xl font-semibold text-amber-300">
//                 ✨ Welcome to{" "}
//                 <span className="text-amber-400">Administration B</span>
//               </p>

//               <ul className="list-disc list-inside space-y-3 text-white/90 text-3xl">
//                 <li>
//                   Here you can <strong>create new elections</strong> for the
//                   system.
//                 </li>
//                 <li>
//                   Add and manage <strong>candidates</strong> participating in
//                   each election.
//                 </li>
//                 <li>
//                   Watch <strong>real-time live election results</strong> as
//                   votes are submitted.
//                 </li>
//                 <li>
//                   View <strong>past election summaries</strong> and historical
//                   voting records.
//                 </li>
//                 <li>
//                   Review complete <strong>candidate details & profiles</strong>{" "}
//                   at any time.
//                 </li>
//               </ul>
//             </div>

//             {/* Checkbox + Continue Button */}
//             <div className="mt-6 text-center">
//               <label className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={isChecked}
//                   onChange={() => setIsChecked(!isChecked)}
//                   className="w-4 h-4 accent-amber-500 cursor-pointer"
//                 />
//                 <span>I’ve read and understood these guidelines.</span>
//               </label>

//               <motion.button
//                 whileHover={{ scale: isChecked ? 1.05 : 1 }}
//                 whileTap={{ scale: isChecked ? 0.95 : 1 }}
//                 disabled={!isChecked}
//                 onClick={handleClose}
//                 className={`px-6 py-2 rounded-lg font-bold text-white shadow-md transition-all ${
//                   isChecked
//                     ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:shadow-amber-500/40"
//                     : "bg-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 Got it →
//               </motion.button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default DashboardGuidePopup;

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DashboardGuidePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Show popup automatically after 5 seconds
    const timer = setTimeout(() => setShowPopup(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (isChecked) setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 border border-white/20 rounded-2xl p-12 text-white max-w-5xl mx-4 shadow-2xl backdrop-blur-md"
          >
            <h2 className="text-4xl font-bold mb-4 text-center text-amber-400">
              👋 Welcome, Admin!
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-center">
              <p className="text-2xl font-semibold text-amber-300">
                ✨ Welcome to{" "}
                <span className="text-amber-400">Administration B</span>
              </p>

              <ul className="list-disc list-inside space-y-2 text-white/90 text-lg text-left">
                <li>
                  Here you can <strong>create new elections</strong> for the
                  system.
                </li>
                <li>
                  Add and manage <strong>candidates</strong> participating in
                  each election.
                </li>
                <li>
                  Watch <strong>real-time live election results</strong> as
                  votes are submitted.
                </li>
                <li>
                  View <strong>past election summaries</strong> and historical
                  voting records.
                </li>
                <li>
                  Review complete <strong>candidate details & profiles</strong>{" "}
                  at any time.
                </li>
              </ul>
            </div>

            {/* Checkbox + Continue Button */}
            <div className="mt-4 text-center">
              <label className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
                <span>I’ve read and understood these guidelines.</span>
              </label>

              <motion.button
                whileHover={{ scale: isChecked ? 1.05 : 1 }}
                whileTap={{ scale: isChecked ? 0.95 : 1 }}
                disabled={!isChecked}
                onClick={handleClose}
                className={`px-6 py-2 rounded-lg font-bold text-white shadow-md transition-all ${
                  isChecked
                    ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:shadow-amber-500/40"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Got it →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DashboardGuidePopup;
