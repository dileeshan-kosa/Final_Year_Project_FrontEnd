import React from "react";
import CreateElection from "./CreateElection";
import AddCandidates from "./AddCandidates";
import ElectionResult from "./ElectionResult";
import PreviousElectionResult from "./PreviousElectionResult";
import CandidatesDetails from "./CandidatesDetails";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AdminBackground from "./AdminBackground";
import DashboardGuidePopup from "./DashboardGuidePopup";
import DashboardTimers from "../DashboardTimers";

const RightSectionAdminB = () => {
  const location = useLocation();
  return (
    <div className="relative flex flex-col py-12 flex-1 h-full bg-gradient-to-b from-emerald-950 to-emerald-100 overflow-auto">
      <h1 className=" flex-col text-center font-semibold text-5xl relative z-10">
        Electoral Process Administration
      </h1>
      <hr className="mt-16 relative z-10" /> {/* The Line(herderow) */}
      <Routes>
        <Route path="/create-election" element={<CreateElection />} />
        <Route path="/add-candidates" element={<AddCandidates />} />
        <Route path="/election-result" element={<ElectionResult />} />
        <Route path="/previous-result" element={<PreviousElectionResult />} />
        <Route path="/candidates-details" element={<CandidatesDetails />} />
      </Routes>
      {location.pathname === "/adminbdashbord" && (
        <>
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AdminBackground />
          </div>

          <DashboardGuidePopup />

          <div className="relative z-20">
            <DashboardTimers />
          </div>
        </>
      )}
      {/* {location.pathname === "/adminbdashbord" && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AdminBackground />
          <DashboardGuidePopup />
          <DashboardTimers />
        </div>
      )} */}
      {/* <div>
        <AdminBackground />
      </div> */}
    </div>
  );
};

export default RightSectionAdminB;
