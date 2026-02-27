import React, { useEffect, useState } from "react";
import imageTobase64 from "../../helpers/imageTobase64";
import axios from "axios";
import { useElectionStatus } from "../../hooks/useElectionStatus";
import { useNavigate } from "react-router-dom";

const AddCandidates = () => {
  const initialData = {
    name: "",
    nic: "",
    dob: "",
    district: "",
    politicalparty: "",
    symbol: "",
    number: "",
    image: "",
  };
  const [data, setData] = useState(initialData);
  const [remainingTime, setRemainingTime] = useState(null);
  const navigate = useNavigate();

  // Hook to get election timing
  const { isNominationPeriod, status, loading } = useElectionStatus();

  const handleOnChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUploadPic = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await imageTobase64(file);
      setData((prevData) => ({
        ...prevData,
        [type]: base64Image,
      }));
    }
  };

  //save voter data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/add-candidates`,
        data
      );
      console.log("response", response);
      setData(initialData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Timer Logic
  useEffect(() => {
    let timer;
    const fetchTimer = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/get-electionstatus");
        const json = await res.json();
        const data = json?.data;
        if (!data) return;

        const end = new Date(data.nominationEndAt).getTime();
        timer = setInterval(() => {
          const now = new Date().getTime();
          const diff = end - now;

          if (diff <= 0) {
            clearInterval(timer);
            navigate("/adminbdashbord");
          } else {
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
          }
        }, 1000);
      } catch (err) {
        console.error("Timer error:", err);
      }
    };
    fetchTimer();
    return () => clearInterval(timer);
  }, [navigate]);

  //Access Control
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold text-gray-600">
        Checking Election Status...
      </div>
    );
  }

  if (!isNominationPeriod) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-3">
          🚫 Nomination Period is not active.
        </h2>
        <button
          onClick={() => navigate("/adminbdashbord")}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen w-full mt-4">
      {remainingTime && (
        <div className="mb-5 ml-2 text-center text-lg font-bold text-orange-600 bg-white p-3 rounded-lg shadow-md">
          🕒 Nomination period ends in: {remainingTime}
        </div>
      )}

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 
                   p-10 rounded-t-[60px] shadow-2xl text-black gap-6 w-[550px] max-w-lg mx-auto"
      >
        <h2 className="text-3xl font-bold text-emerald-950 mb-4">
          Add Candidate
        </h2>

        {/* Name */}
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleOnChange("name", e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the Name"
            required
          />
        </div>

        {/* NIC */}
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">NIC</label>
          <input
            type="text"
            value={data.nic}
            onChange={(e) => handleOnChange("nic", e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the NIC"
            required
          />
        </div>

        {/* DOB */}
        <div className="flex flex-col w-full mb-5 overflow-auto">
          <label className="text-lg mb-2 text-center">DOB</label>
          <input
            type="date"
            value={data.dob}
            onChange={(e) => handleOnChange("dob", e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Select the DOB"
            required
          />
        </div>

        {/* District */}
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">District</label>
          <input
            type="text"
            value={data.district}
            onChange={(e) => handleOnChange("district", e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Enter the District"
            required
          />
        </div>

        {/* Political Party */}
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Political party</label>
          <input
            type="text"
            value={data.politicalparty}
            onChange={(e) => handleOnChange("politicalparty", e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Enter the Political party"
            required
          />
        </div>

        {/* Symbol Upload */}
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">SYMBOL</label>

          <label>
            <div className="text-xl bg-slate-300 p-2 rounded-md w- h-12 text-center relative cursor-pointer">
              Upload Symbol
            </div>
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleUploadPic(e, "symbol")}
            />
          </label>

          {/* <input
            // type="text"
            // value={data.symbol}
            //onChange={(e) => handleOnChange("reasone", e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            // placeholder="Type the SYMBOL"
            required
          /> */}
        </div>

        {/* Number */}
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">NUMBER</label>
          <input
            type="text"
            value={data.number}
            onChange={(e) => handleOnChange("number", e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Enter the NUMBER"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">IMAGE</label>

          <label>
            <div className="text-xl bg-slate-300 p-2 rounded-md w- h-12 text-center relative cursor-pointer">
              Upload Your Photo
            </div>
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleUploadPic(e, "image")}
            />
          </label>

          {/* <input
            type="text"
            // value={data.image}
            //onChange={(e) => handleOnChange("image", e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Drag the IMAGE"
            required
          /> */}
        </div>

        <button
          className=" w-60 mt-4 px-10 py-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white font-bold text-lg rounded-full shadow-md hover:shadow-amber-400/40 transition-all"
          //onClick={""}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCandidates;
