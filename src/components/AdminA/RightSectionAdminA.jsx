import React from "react";
import { Route, Routes } from "react-router-dom";
import AddVoters from "./AddVoters";
import AdminviewVoterDetails from "./AdminviewVoterDetails";

const RightSectionAdminA = () => {
  return (
    <div className="flex flex-col py-12 flex-1 h-full bg-gradient-to-b from-emerald-950 to-emerald-100 overflow-auto">
      <h1 className=" flex-col text-center font-semibold text-5xl">
        ADMINISTRATION A
      </h1>
      <hr className="mt-16" /> {/* The Line(herderow) */}
      <div>
        <Routes>
          <Route path="/addvoters" element={<AddVoters />} />
          <Route path="/adminviewvoterdetails" element={<AdminviewVoterDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default RightSectionAdminA;
