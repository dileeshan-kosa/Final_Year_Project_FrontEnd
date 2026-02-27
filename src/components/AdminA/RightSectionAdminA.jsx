import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AddVoters from "./AddVoters";
import AdminviewVoterDetails from "./AdminviewVoterDetails";
import AdminBackground from "../AdminB/AdminBackground";
import DashboardTimers from "../DashboardTimers";
import DashboardGuidePopup from "../AdminB/DashboardGuidePopup";
import DashboardGuidPopupAdmin_A from "./DashboardGuidPopupAdmin_A";

const RightSectionAdminA = () => {
  const location = useLocation();
  return (
    <div className=" relative flex flex-col py-12 flex-1 h-full bg-gradient-to-b from-emerald-950 to-emerald-100 overflow-auto">
      <h1 className=" flex-col text-center font-semibold text-5xl relative z-10">
        Voters Enrollment Unit
      </h1>
      <hr className="mt-16 relative z-10" /> {/* The Line(herderow) */}
      <div>
        <Routes>
          <Route path="/addvoters" element={<AddVoters />} />
          <Route
            path="/adminviewvoterdetails"
            element={<AdminviewVoterDetails />}
          />
        </Routes>
        {location.pathname === "/adminadashbord" && (
          <>
            <div className="absolute inset-0 z-0 overflow-hidden">
              <AdminBackground />
            </div>
            {/* <DashboardGuidePopup /> */}
            <DashboardGuidPopupAdmin_A />

            <div className="relative z-20">
              <DashboardTimers />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RightSectionAdminA;
