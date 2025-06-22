import React from "react";
import CreateElection from "./CreateElection";
import AddCandidates from "./AddCandidates";
import ElectionResult from "./ElectionResult";
import PreviousElectionResult from "./PreviousElectionResult";
import CandidatesDetails from "./CandidatesDetails";
import { Route, Routes } from "react-router-dom";

const RightSectionAdminB = () => {
  return (
    <div className="flex flex-col py-12 flex-1 h-full bg-gradient-to-b from-emerald-950 to-emerald-100 overflow-auto">
      <h1 className=" flex-col text-center font-semibold text-5xl">
        ADMINISTRATION B
      </h1>
      <hr className="mt-16" /> {/* The Line(herderow) */}
      <Routes>
        <Route path="/create-election" element={<CreateElection />} />
        <Route path="/add-candidates" element={<AddCandidates />} />
        <Route path="/election-result" element={<ElectionResult />} />
        <Route path="/previous-result" element={<PreviousElectionResult />} />
        <Route path="/candidates-details" element={<CandidatesDetails />} />
      </Routes>
    </div>
  );
};

export default RightSectionAdminB;
