import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  AdministrationLogin,
  AdministrationSignUp,
  Main,
  VotesLogin,
} from "./containers";
import AdiminADashbord from "./containers/AdiminADashbord";
import AdminBDashbord from "./containers/AdminBDashbord";
import { PlacedVotes, VoterDetails } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setAdminDetails } from "./store/adminSlice";

const App = () => {
  const dispatch = useDispatch();

  const fetchAdminDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin-details",
        {
          withCredentials: true,
        }
      );
      console.log("response :", response);

      if (response.data.success) {
        dispatch(setAdminDetails(response.data));
      }
    } catch (error) {
      console.log("Not fetching data:", error);
    }
  };

  useEffect(() => {
    // Admin details
    fetchAdminDetails();
  }, []);

  return (
    <Context.Provider
      value={{
        fetchAdminDetails, //admin details fetch
      }}
    >
      <div className="text-red-500 font-semibold">
        <ToastContainer />
        <Routes>
          <Route path="/*" element={<Main />} />
          <Route
            path="/administrationlogin"
            element={<AdministrationLogin />}
          />
          <Route
            path="/administrationsignup"
            element={<AdministrationSignUp />}
          />
          <Route path="/voterslogin" element={<VotesLogin />} />
          <Route path="/adminadashbord/*" element={<AdiminADashbord />} />
          <Route path="/adminbdashbord/*" element={<AdminBDashbord />} />
          <Route path="/placedvotes" element={<PlacedVotes />} />
          <Route path="/voterdetails" element={<VoterDetails />} />

          {/* <Route path="/fingerprint" element={<FingerPrint />} /> */}
          {/* <Route path="/fingerprintscanner" element={<FingerprintScanner />} /> */}
        </Routes>
      </div>
    </Context.Provider>
  );
};

export default App;
