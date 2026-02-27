import React from "react";
import LeftSectionAdminA from "../components/AdminA/LeftSectionAdminA";
import RightSectionAdminA from "../components/AdminA/RightSectionAdminA";

const AdiminADashbord = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-gradient-to-b from-emerald-950 to-emerald-100">
      <LeftSectionAdminA />
      <RightSectionAdminA />
    </div>
  );
};

export default AdiminADashbord;
