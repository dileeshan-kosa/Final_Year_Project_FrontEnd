import React from "react";

const CreateElection = () => {
  return (
    <div>
      <form className="flex flex-col items-center p-10 font-semibold text-black gap-6 w-1/2 rounded-lg shadow-md">
        <select className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none">
          <option value="">Election Type</option>
          <option value="">President</option>
          <option value="">Sis Election</option>
        </select>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Date</label>
          <input
            type="text"
            //value={data.reasone}
            //onChange={(e) => handleOnChange("reasone", e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Enter the Date"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">
            Nomination Duration
          </label>
          <input
            type="text"
            //value={data.reasone}
            //onChange={(e) => handleOnChange("reasone", e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Enter the Duration"
            required
          />
        </div>
        <button className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded mt-8">
          Start
        </button>
      </form>
    </div>
  );
};

export default CreateElection;
