import React from "react";
import LeftSectionAdminB from "../components/AdminB/LeftSectionAdminB";
import RightSectionAdminB from "../components/AdminB/RightSectionAdminB";

const AdminBDashbord = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-gradient-to-b from-emerald-950 to-emerald-100">
      <LeftSectionAdminB />
      <RightSectionAdminB />
    </div>
  );
};

export default AdminBDashbord;
