// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const VoterDetails = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const storedVoter = localStorage.getItem("voterDetails");

//     if (storedVoter) {
//       try {
//         const parsed = JSON.parse(storedVoter);
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
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="w-[420px] p-8 bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 "
//       >
//         <h1 className="text-3xl font-bold text-center text-white mb-8">
//           Voter Profile
//         </h1>

//         <div className="flex flex-col gap-6 text-white">
//           {/* Profile Avatar */}
//           <div className="flex justify-center mb-2">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-300 flex items-center justify-center text-3xl font-bold shadow-lg">
//               {data.name ? data.name.charAt(0).toUpperCase() : "?"}
//             </div>
//           </div>

//           {/* Details */}
//           <div className="space-y-4 text-center">
//             <div className="bg-white/10 rounded-lg px-5 py-3 border border-white/20 shadow-inner">
//               <p className="text-sm text-blue-800 uppercase tracking-wide">
//                 Name
//               </p>
//               <p className="text-lg font-semibold text-white">
//                 {data.name || "No data captured"}
//               </p>
//             </div>

//             <div className="bg-white/10 rounded-lg px-5 py-3 border border-white/20 shadow-inner">
//               <p className="text-sm text-blue-800 uppercase tracking-wide">
//                 NIC
//               </p>
//               <p className="text-lg font-semibold text-white">
//                 {data.nic || "No data fetched"}
//               </p>
//             </div>

//             <div className="bg-white/10 rounded-lg px-5 py-3 border border-white/20 shadow-inner">
//               <p className="text-sm text-blue-800 uppercase tracking-wide">
//                 District
//               </p>
//               <p className="text-lg font-semibold text-white">
//                 {data.district || "No data fetched"}
//               </p>
//             </div>
//           </div>

//           {/* Next Button */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleNext}
//             className="w-full mt-2 py-3 rounded-lg font-bold text-lg bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white shadow-lg hover:shadow-amber-500/40 transition-all"
//           >
//             Next →
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default VoterDetails;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const VoterDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const storedVoter = localStorage.getItem("voterDetails");

    if (storedVoter) {
      try {
        const parsed = JSON.parse(storedVoter);
        setData(parsed);

        // Show popup automatically after 3 seconds
        const timer = setTimeout(() => {
          setShowPopup(true);
        }, 3000);

        return () => clearTimeout(timer);
      } catch (err) {
        console.error("Failed to parse voter data from localStorage", err);
      }
    }
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/placedvotes");
  };

  // Text Content in both languages
  const text = {
    en: {
      title: "Please Review & Read Carefully",
      content: [
        "✅ First, please verify that your profile details are correct.",
        "🗳️ After confirming, you will proceed to the voting screen.",
        "👇 The list of candidates will be displayed — including their photo, symbol, and name.",
        "✅ Select one candidate by clicking the circular selection box. Only one candidate can be chosen since this is a general election.",
        "👉 Once selected, a message will appear asking you to place your finger on the fingerprint scanner before confirming your vote.",
        "🔒 If your fingerprint matches, your vote will be securely cast and you’ll be automatically logged out.",
      ],
      checkbox: "I have read and understood the instructions.",
      continue: "Continue →",
    },

    si: {
      title: "කරුණාකර නිරීක්ෂණය කර සැලකිල්ලෙන් කියවන්න",
      content: [
        "✅ පළමුව, ඔබගේ පැතිකඩ තොරතුරු නිවැරදිදැයි සනාථ කරගන්න.",
        "🗳️ තහවුරු කළ පසු, ඔබ ඡන්ද විධානය වෙත යොමු කෙරෙනු ඇත.",
        "👇 අපේක්ෂකයන්ගේ ලැයිස්තුව එමගේ ඡායාරූපය, සංකේතය සහ නම ඇතුළුව පෙන්වා දෙනු ඇත.",
        "✅ සාමාන්‍ය ඡන්ද මැතිවරණයක් වන නිසා ඔබට තනි අපේක්ෂකයෙකු පමණක් තෝරා ගැනීමට හැකි වේ.",
        "👉 තෝරා ගැනීමෙන් පසු, ඔබට ඔබගේ ඇඟිලි සලකුණ ස්කෑනරයට තැබිය යුතු බව පණිවිඩයක් දිස්වනු ඇත.",
        "🔒 ඔබගේ ඇඟිලි සලකුණ ගැලපේ නම්, ඔබගේ ඡන්දය ආරක්ෂිතව ඇතුළත් වන අතර ඔබ ස්වයංක්‍රීයව පිටවෙනු ඇත.",
      ],
      checkbox: "මම උපදෙස් කියවා තේරුම්ගෙන ඇතිමි.",
      continue: "ඉදිරියට →",
    },
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100 relative">
      {/* --- Profile Card --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[420px] p-8 bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 z-10"
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
              <p className="text-sm text-emerald-400 uppercase tracking-wide">
                Name
              </p>
              <p className="text-lg font-semibold text-white">
                {data.name || "No data captured"}
              </p>
            </div>

            <div className="bg-white/10 rounded-lg px-5 py-3 border border-white/20 shadow-inner">
              <p className="text-sm text-emerald-400 uppercase tracking-wide">
                NIC
              </p>
              <p className="text-lg font-semibold text-white">
                {data.nic || "No data fetched"}
              </p>
            </div>

            <div className="bg-white/10 rounded-lg px-5 py-3 border border-white/20 shadow-inner">
              <p className="text-sm text-emerald-400 uppercase tracking-wide">
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
            className="w-full mt-4 py-3 rounded-lg font-bold text-lg bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white shadow-lg hover:shadow-amber-500/40 transition-all"
          >
            Next →
          </motion.button>
        </div>
      </motion.div>

      {/* --- Popup Modal --- */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-emerald-950 to-emerald-200 bg-opacity-90 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 border border-white/20 rounded-2xl p-8 text-white max-w-lg mx-4 shadow-2xl backdrop-blur-md"
            >
              {/* 🌐 Language Switcher */}
              <div className="flex justify-center gap-4 mb-3">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded-md text-sm font-semibold ${
                    language === "en"
                      ? "bg-amber-500 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("si")}
                  className={`px-3 py-1 rounded-md text-sm font-semibold ${
                    language === "si"
                      ? "bg-amber-500 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  සිංහල
                </button>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-4 text-center text-yellow-400">
                {text[language].title}
              </h2>

              {/* Animated Text Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={language}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="text-base space-y-3 leading-relaxed"
                >
                  {text[language].content.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Checkbox + Continue Button */}
              <div className="mt-6 text-center">
                <label className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                  <span>{text[language].checkbox}</span>
                </label>

                <motion.button
                  whileHover={{ scale: isChecked ? 1.05 : 1 }}
                  whileTap={{ scale: isChecked ? 0.95 : 1 }}
                  disabled={!isChecked}
                  onClick={() => setShowPopup(false)}
                  className={`px-6 py-2 rounded-lg font-bold text-white shadow-md transition-all 
                    ${
                      isChecked
                        ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:shadow-amber-500/40"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                  {text[language].continue}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoterDetails;
