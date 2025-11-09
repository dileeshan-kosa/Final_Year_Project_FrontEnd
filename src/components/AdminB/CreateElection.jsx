import React, { useState } from "react";
import dayjs from "dayjs";

const DELAYS = [
  { label: "5 minutes", value: "5min", minutes: 5 },
  { label: "10 minutes", value: "10min", minutes: 10 },
  { label: "30 minutes", value: "30min", minutes: 30 },
  { label: "1 hour", value: "1h", minutes: 60 },
  { label: "2 hours", value: "2h", minutes: 120 },
  { label: "24 hours", value: "24h", minutes: 1440 },
];

function formatSecondsToHMS(totalSeconds) {
  if (!totalSeconds || totalSeconds <= 0) return "00:00:00";
  const s = Math.floor(totalSeconds % 60);
  const m = Math.floor((totalSeconds / 60) % 60);
  const h = Math.floor(totalSeconds / 3600);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

const CreateElection = () => {
  const [form, setForm] = useState({
    electionType: "",
    nominationStartAt: "",
    nominationEndAt: "",
    delayBeforeStart: "",
    electionStartAt: "",
    electionEndAt: "",
  });

  const [errors, setErrors] = useState({});
  const [serverStatus, setServerStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [nomCountdown, setNomCountdown] = useState(0);
  const [delayCountdown, setDelayCountdown] = useState(0);
  const [elecCountdown, setElecCountdown] = useState(0);
  const [activeMsg, setActiveMsg] = useState("");

  const pollRef = useRef(null);
  const tickRef = useRef(null);

  const fetchStatus = async () => {
    try {
      // Fetch API Code part
    } catch (err) {
      console.error("Failed to fetch election status:", err.message || err);
    } finally {
      setStatusLoading(false);
    }
  };

  // instant 1s backend polling
  useEffect(() => {
    fetchStatus();
    pollRef.current = setInterval(fetchStatus, 1000);
    return () => clearInterval(pollRef.current);
  }, []);

  // auto fill electionStartAt
  useEffect(() => {
    const { nominationEndAt, delayBeforeStart } = form;
    if (nominationEndAt && delayBeforeStart) {
      const d = DELAYS.find((x) => x.value === delayBeforeStart);
      const suggested = dayjs(nominationEndAt).add(d ? d.minutes : 0, "minute");
      setForm((prev) => ({
        ...prev,
        electionStartAt: suggested.format("YYYY-MM-DDTHH:mm"),
      }));
    }
  }, [form.nominationEndAt, form.delayBeforeStart]);

  const validate = () => {
    const e = {};
    const {
      electionType,
      nominationStartAt,
      nominationEndAt,
      delayBeforeStart,
      electionStartAt,
      electionEndAt,
    } = form;
    if (!electionType) e.electionType = "Choose election type.";
    if (!nominationStartAt) e.nominationStartAt = "Nomination start required.";
    if (!nominationEndAt) e.nominationEndAt = "Nomination end required.";
    if (!delayBeforeStart) e.delayBeforeStart = "Select delay.";
    if (!electionStartAt) e.electionStartAt = "Election start required.";
    if (!electionEndAt) e.electionEndAt = "Election end required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const payload = {
      electionType: form.electionType,
      nominationStartAt: dayjs(form.nominationStartAt).toISOString(),
      nominationEndAt: dayjs(form.nominationEndAt).toISOString(),
      delayBeforeStart: form.delayBeforeStart,
      electionStartAt: dayjs(form.electionStartAt).toISOString(),
      electionEndAt: dayjs(form.electionEndAt).toISOString(),
    };

    try {
      // Post Api code part
    } catch (err) {
      console.error(
        "Create election error:",
        err.response?.data || err.message
      );
    }
  };

  const isFormDisabled = () => {
    if (!serverStatus) return false;
    return serverStatus.status && serverStatus.status !== "completed";
  };

  // countdown tick logic
  useEffect(() => {
    function tick() {
      const now = dayjs();
      if (!serverStatus) return;
      const ns = dayjs(serverStatus.nominationStartAt);
      const ne = dayjs(serverStatus.nominationEndAt);
      const es = dayjs(serverStatus.electionStartAt);
      const ee = dayjs(serverStatus.electionEndAt);

      // nomination countdown runs only between start & end
      if (now.isAfter(ns) && now.isBefore(ne))
        setNomCountdown(Math.max(0, ne.diff(now, "second")));
      else setNomCountdown(0);

      if (now.isAfter(ne) && now.isBefore(es))
        setDelayCountdown(Math.max(0, es.diff(now, "second")));
      else setDelayCountdown(0);

      if (now.isAfter(es) && now.isBefore(ee))
        setElecCountdown(Math.max(0, ee.diff(now, "second")));
      else setElecCountdown(0);
    }

    tickRef.current = setInterval(tick, 1000);
    tick();
    return () => clearInterval(tickRef.current);
  }, [serverStatus]);

  // active election message logic
  useEffect(() => {
    if (serverStatus?.status && serverStatus.status !== "completed") {
      setActiveMsg(
        "⚠️ You can’t create another election until the current one ends."
      );
    } else {
      setActiveMsg("");
    }
  }, [serverStatus?.status]);

  const active = serverStatus?.status || null;
  const getBox = (label, isActive, gradient, textColor) => (
    <div
      className={`w-1/4 text-center rounded-full px-4 py-2 shadow font-semibold ${
        isActive
          ? `${gradient} ${textColor}`
          : "bg-white text-gray-600 border border-gray-300"
      }`}
    >
      {label}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100/60 to-white py-8 px-6">
      
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
