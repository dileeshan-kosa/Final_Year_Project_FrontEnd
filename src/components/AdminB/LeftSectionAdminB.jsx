import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAdminDetails } from "../../store/adminSlice";
import { useElectionStatus } from "../../hooks/useElectionStatus";

const LeftSectionAdminB = () => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");
  const { isNominationPeriod, isElectionRunning, isIdle } = useElectionStatus();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const adminhandleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/adminLogout",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        dispach(setAdminDetails(null));
        navigate("/");
      }

      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("cannot log out student", error);
    }
  };

  return (
    <div className="h-full p-12 flex flex-col bg-gradient-to-b from-emerald-950 to-emerald-100 backdrop-blur-md shadow-2xl min-w-96 w-96 gap-3 overflow-auto">
      <hr className="mt-28 " />
      <ul className="flex flex-col gap-44 mt-36 mb-auto">
        <NavLink
          to={"/adminbdashbord/create-election"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/adminbdashbord/create-election"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } text-white hover:bg-emerald-950`}
          onClick={() => handleLinkClick("/adminbdashbord/create-election")}
        >
          <span>Create Election</span>
        </NavLink>

        <NavLink
          to={isNominationPeriod ? "/adminbdashbord/add-candidates" : "#"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/adminbdashbord/add-candidates"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } ${
            !isNominationPeriod
              ? "opacity-50 cursor-not-allowed hover:none text-white"
              : "hover:bg-emerald-950 text-white"
          }`}
          onClick={() =>
            isNominationPeriod &&
            handleLinkClick("/adminbdashbord/add-candidates")
          }
          disabled={!isNominationPeriod}
        >
          <span>Add Candidates</span>
        </NavLink>

        {/* <NavLink
          to={isElectionRunning ? "/adminbdashbord/election-result" : "#"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/adminbdashbord/election-result"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } ${
            !isElectionRunning
              ? "opacity-50 cursor-not-allowed hover:none text-white"
              : "hover:bg-emerald-950 text-white"
          }`}
          onClick={() =>
            isElectionRunning &&
            handleLinkClick("/adminbdashbord/election-result")
          }
        >
          <span>Election Result</span>
        </NavLink> */}

        {/* developing purpose */}

        <NavLink
          to="/adminbdashbord/election-result"
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/adminbdashbord/election-result"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } hover:bg-emerald-950 text-white`}
          onClick={() => handleLinkClick("/adminbdashbord/election-result")}
        >
          <span>Election Result</span>
        </NavLink>

        <NavLink
          to={"/adminbdashbord/previous-result"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/adminbdashbord/previous-result"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } text-white hover:bg-emerald-950`}
          onClick={() => handleLinkClick("/adminbdashbord/previous-result")}
        >
          <span>Previous Election Results</span>
        </NavLink>

        <NavLink
          to={"/adminbdashbord/candidates-details"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/adminbdashbord/candidates-details"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } text-white hover:bg-emerald-950`}
          onClick={() => handleLinkClick("/adminbdashbord/candidates-details")}
        >
          <span>Candidates Details</span>
        </NavLink>

        <button
          onClick={adminhandleLogout}
          className="bg-orange-600 hover:bg-orange-500 text text-black py-2 px-4 rounded mt-8"
        >
          Sign Out
        </button>
      </ul>
    </div>
  );
};

export default LeftSectionAdminB;
