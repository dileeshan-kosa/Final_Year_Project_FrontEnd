import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

const CreateElection = () => {
  const [electionType, setElectionType] = useState("");
  const [nominationStartDate, setNominationStartDate] = useState(null);
  const [nominationEndDate, setNominationEndDate] = useState(null);
  const [nominationStartTime, setNominationStartTime] = useState(null);
  const [nominationEndTime, setNominationEndTime] = useState(null);
  const [delayBeforeStart, setDelayBeforeStart] = useState("");
  const [electionStartDate, setElectionStartDate] = useState(null);
  const [electionEndDate, setElectionEndDate] = useState(null);
  const [electionStartTime, setElectionStartTime] = useState(null);
  const [electionEndTime, setElectionEndTime] = useState(null);

  const handleStartElection = async (e) => {
    e.preventDefault();

    const data = {
      electionType,
      nominationStartDate: nominationStartDate?.format("YYYY-MM-DD"),
      nominationStartTime: nominationStartTime?.format("HH:mm:ss"),
      nominationEndDate: nominationEndDate?.format("YYYY-MM-DD"),
      nominationEndTime: nominationEndTime?.format("HH:mm:ss"),
      delayBeforeStart,
      electionStartDate: electionStartDate?.format("YYYY-MM-DD"),
      electionStartTime: electionStartTime?.format("HH:mm:ss"),
      electionEndDate: electionEndDate?.format("YYYY-MM-DD"),
      electionEndTime: electionEndTime?.format("HH:mm:ss"),
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-100 py-10">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl">
        <Typography
          variant="h4"
          align="center"
          className="font-bold text-emerald-800 mb-10"
        >
          🗳️ Create Election
        </Typography>

        <form
          onSubmit={handleStartElection}
          className="flex flex-col gap-10 text-black"
        >
          {/* Election Type */}
          <FormControl fullWidth>
            <InputLabel>Election Type</InputLabel>
            <Select
              value={electionType}
              onChange={(e) => setElectionType(e.target.value)}
              className="bg-gray-100 rounded-lg"
              required
            >
              <MenuItem value="president">President Election</MenuItem>
              <MenuItem value="sis">SIS Election</MenuItem>
            </Select>
          </FormControl>

          {/* Nomination Period */}
          <div>
            <h2 className="text-xl font-semibold text-emerald-700 mb-4 text-center">
              🧾 Nomination Period
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Nomination Start Date"
                  value={nominationStartDate}
                  onChange={setNominationStartDate}
                />
                <DatePicker
                  label="Nomination End Date"
                  value={nominationEndDate}
                  onChange={setNominationEndDate}
                />
                <TimePicker
                  label="Start Time"
                  value={nominationStartTime}
                  onChange={setNominationStartTime}
                />
                <TimePicker
                  label="End Time"
                  value={nominationEndTime}
                  onChange={setNominationEndTime}
                />
              </LocalizationProvider>
            </div>
          </div>

          {/* Delay Selector */}
          <div>
            <h2 className="text-xl font-semibold text-emerald-700 mb-4 text-center">
              ⏳ Start Election Delay
            </h2>
            <FormControl fullWidth>
              <InputLabel>Delay Before Election Start</InputLabel>
              <Select
                value={delayBeforeStart}
                onChange={(e) => setDelayBeforeStart(e.target.value)}
                className="bg-gray-100 rounded-lg"
                required
              >
                <MenuItem value="10min">10 Minutes</MenuItem>
                <MenuItem value="30min">30 Minutes</MenuItem>
                <MenuItem value="1h">1 Hour</MenuItem>
                <MenuItem value="24h">24 Hours</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Election Period */}
          <div>
            <h2 className="text-xl font-semibold text-emerald-700 mb-4 text-center">
              🗳️ Election Period
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Election Start Date"
                  value={electionStartDate}
                  onChange={setElectionStartDate}
                />
                <DatePicker
                  label="Election End Date"
                  value={electionEndDate}
                  onChange={setElectionEndDate}
                />
                <TimePicker
                  label="Start Time"
                  value={electionStartTime}
                  onChange={setElectionStartTime}
                />
                <TimePicker
                  label="End Time"
                  value={electionEndTime}
                  onChange={setElectionEndTime}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              variant="contained"
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg text-lg"
            >
              Start Election
            </Button>
          </div>
        </form>
      </div>
    </div>
    // <div>
    //   <form className="flex flex-col items-center p-10 font-semibold text-black gap-6 w-1/2 rounded-lg shadow-md">
    //     <select className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none">
    //       <option value="">Election Type</option>
    //       <option value="">President</option>
    //       <option value="">Sis Election</option>
    //     </select>

    //     <div className="flex flex-col w-full mb-5">
    //       <label className="text-lg mb-2 text-center">Date</label>
    //       <input
    //         type="text"
    //         //value={data.reasone}
    //         //onChange={(e) => handleOnChange("reasone", e.target.value)}
    //         className="w- h-12 text-center bg-slate-300 rounded-md p-2"
    //         placeholder="Enter the Date"
    //         required
    //       />
    //     </div>

    //     <div className="flex flex-col w-full mb-5">
    //       <label className="text-lg mb-2 text-center">
    //         Nomination Duration
    //       </label>
    //       <input
    //         type="text"
    //         //value={data.reasone}
    //         //onChange={(e) => handleOnChange("reasone", e.target.value)}
    //         className="w- h-12 text-center bg-slate-300 rounded-md p-2"
    //         placeholder="Enter the Duration"
    //         required
    //       />
    //     </div>
    //     <button className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded mt-8">
    //       Start
    //     </button>
    //   </form>
    // </div>
  );
};

export default CreateElection;
