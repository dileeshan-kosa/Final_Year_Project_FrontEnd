import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setAdminDetails } from "../../store/adminSlice";
import { toast } from "react-toastify";
import { useElectionStatus } from "../../hooks/useElectionStatus";

const LeftSectionAdminA = () => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");
  const { isNominationPeriod, isIdle } = useElectionStatus();

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
      <hr className="mt-28" />
      <ul className="flex flex-col gap-44 mt-36 mb-auto">
        <NavLink
          to={isNominationPeriod ? "/adminadashbord/addvoters" : "#"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/adminadashbord/addmembers"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } ${
            !isNominationPeriod
              ? "opacity-50 cursor-not-allowed hover:none text-white"
              : "hover:bg-emerald-950 text-white"
          }`}
          onClick={() =>
            isNominationPeriod && handleLinkClick("/adminadashbord/addmembers")
          }
          disabled={!isNominationPeriod}
        >
          <span>Add Voter</span>
        </NavLink>

        <NavLink
          to={"/adminadashbord/adminviewvoterdetails"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/adminadashbord/viewvoterdetails"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } text-white hover:bg-emerald-950`}
          onClick={() =>
            handleLinkClick("/adminadashbord/adminviewvoterdetails")
          }
        >
          <span>View Voter Details</span>
        </NavLink>
        <button
          onClick={adminhandleLogout}
          className="bg-orange-600 hover:bg-orange-500 text text-black py-2 px-4 rounded mt-8"
        >
          Sign Out
        </button>
        {/* <button className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded mt-8">
          Sign Out
        </button> */}
      </ul>
    </div>
  );
};

export default LeftSectionAdminA;
