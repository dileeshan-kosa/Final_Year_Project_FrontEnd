import React, { useState } from "react";
import imageTobase64 from "../../helpers/imageTobase64";
import axios from "axios";

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

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-10 font-semibold text-black gap-6 w-1/2 rounded-lg shadow-md"
      >
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
          className="mt-6 px-8 py-3 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 focus:outline-none"
          //onClick={""}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCandidates;
