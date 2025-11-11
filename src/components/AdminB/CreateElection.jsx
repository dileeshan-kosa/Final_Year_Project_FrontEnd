import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

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

    // 🟩 Log all filled details in console
    console.log("🗳️ Election Form Details:");
    console.log("Election Type:", form.electionType);
    console.log("Nomination Start:", form.nominationStartAt);
    console.log("Nomination End:", form.nominationEndAt);
    console.log("Delay Before Start:", form.delayBeforeStart);
    console.log("Election Start:", form.electionStartAt);
    console.log("Election End:", form.electionEndAt);

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
      const res = await axios.post(
        `http://localhost:8000/api/create-election`,
        payload
      );

      if (res.data && res.data.success) {
        setForm({
          electionType: "",
          nominationStartAt: "",
          nominationEndAt: "",
          delayBeforeStart: "",
          electionStartAt: "",
          electionEndAt: "",
        });
        fetchStatus();
      } else {
        console.error("Create failed:", res.data?.message || res.data);
      }
    } catch (err) {
      console.error(
        "Create election error:",
        err.response?.data || err.message
      );
    }
  };
  // console.log("data", data);

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
    <div className="min-h-screen bg-gradient-to-b from-emerald-700/60 via-emerald-300 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-extrabold">Create Election 🗳️</h1>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-100 rounded-md p-4 text-black">
              <label className="text-lg font-semibold block mb-2">
                Election Type
              </label>
              <select
                value={form.electionType}
                onChange={(e) =>
                  setForm({ ...form, electionType: e.target.value })
                }
                className="w-full rounded-md p-3 bg-gray-200 border-none"
                disabled={isFormDisabled()}
              >
                <option value="">Select Election Type</option>
                <option value="president">President</option>
                <option value="sis">SIS Election</option>
              </select>
            </div>

            <h2 className="text-2xl font-bold text-center my-2">
              Set The Nomination Period
            </h2>
            <div className="grid grid-cols-2 gap-3 text-black">
              <div>
                <label className="block text-sm font-medium mb-4">
                  Nomination Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={form.nominationStartAt}
                  onChange={(e) =>
                    setForm({ ...form, nominationStartAt: e.target.value })
                  }
                  className="w-full rounded-md p-3 bg-gray-100"
                  disabled={isFormDisabled()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-4">
                  Nomination End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={form.nominationEndAt}
                  onChange={(e) =>
                    setForm({ ...form, nominationEndAt: e.target.value })
                  }
                  className="w-full rounded-md p-3 bg-gray-100"
                  disabled={isFormDisabled()}
                />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold my-4">Election Delay</h3>
              <select
                value={form.delayBeforeStart}
                onChange={(e) =>
                  setForm({ ...form, delayBeforeStart: e.target.value })
                }
                className="rounded-md p-3 bg-gray-200 w-2/3 text-black"
                disabled={isFormDisabled()}
              >
                <option value="">Delay Before Election</option>
                {DELAYS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <h2 className="text-xl font-bold text-center my-2">
              Set The Election Period
            </h2>
            <div className="grid grid-cols-2 gap-4 text-black">
              <div>
                <label className="block text-sm font-medium mb-4">
                  Election Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={form.electionStartAt}
                  onChange={(e) =>
                    setForm({ ...form, electionStartAt: e.target.value })
                  }
                  className="w-full rounded-md p-3 bg-gray-100"
                  disabled={isFormDisabled()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-4">
                  Election End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={form.electionEndAt}
                  onChange={(e) =>
                    setForm({ ...form, electionEndAt: e.target.value })
                  }
                  className="w-full rounded-md p-3 bg-gray-100"
                  disabled={isFormDisabled()}
                />
              </div>
            </div>

            <div className="text-center pt-6">
              <button
                onClick={handleSubmit}
                disabled={isFormDisabled()}
                className={`px-7 py-2 rounded-full text-white font-bold text-lg shadow-lg ${
                  isFormDisabled()
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-[#6d4bde] hover:bg-[#593bd1]"
                }`}
              >
                Start Election
              </button>

              {/* Message under button */}
              {activeMsg && (
                <p className="text-red-600 font-medium mt-3 text-sm">
                  {activeMsg}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-3xl font-extrabold text-center mb-4">
            Count Down Timers
          </h2>
          <div className="grid grid-cols-3 gap-3 mb-4 text-black">
            {[
              { time: nomCountdown, label: "Nomination phase Ending..." },
              { time: delayCountdown, label: "Delay Time Ending.." },
              { time: elecCountdown, label: "Election Phase Ending.." },
            ].map((x, i) => (
              <div key={i} className="bg-gray-100 rounded-md p-4 text-center">
                <div className="text-2xl font-mono bg-white text-black rounded-md px-3 py-2 inline-block shadow-sm">
                  {formatSecondsToHMS(x.time)}
                </div>
                <div className="mt-2 text-sm font-medium">{x.label}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-b py-3 mb-4">
            <h3 className="text-xl font-semibold text-center mb-3">
              Indicators
            </h3>
            <div className="flex justify-between items-center gap-2">
              {getBox(
                "Now In Nomination",
                active === "nomination",
                "bg-gradient-to-r from-blue-600 to-blue-800",
                "text-white"
              )}
              {getBox(
                "Now In Delay",
                active === "waiting",
                "bg-gradient-to-r from-yellow-600 to-amber-800",
                "text-black"
              )}
              {getBox(
                "Now In Election",
                active === "running",
                "bg-gradient-to-r from-green-400 to-green-800",
                "text-white"
              )}
              {getBox(
                "Ending The Election",
                active === "completed",
                "bg-gradient-to-r from-purple-600 to-violet-800",
                "text-white"
              )}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-2xl font-bold text-center mb-3">
              Current Election Status
            </h3>
            <div className="bg-white p-4 rounded-md shadow-inner min-h-[160px]">
              {statusLoading ? (
                <p className="text-sm text-gray-500">Loading status...</p>
              ) : serverStatus ? (
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Type:</strong> {serverStatus.electionType}
                  </div>
                  <div>
                    <strong>Nomination:</strong>{" "}
                    {dayjs(serverStatus.nominationStartAt).format(
                      "YYYY/MM/DD hh:mm A"
                    )}{" "}
                    -{" "}
                    {dayjs(serverStatus.nominationEndAt).format(
                      "YYYY/MM/DD hh:mm A"
                    )}
                  </div>
                  <div>
                    <strong>Delay:</strong> {serverStatus.delayBeforeStart}
                  </div>
                  <div>
                    <strong>Election:</strong>{" "}
                    {dayjs(serverStatus.electionStartAt).format(
                      "YYYY/MM/DD hh:mm A"
                    )}{" "}
                    -{" "}
                    {dayjs(serverStatus.electionEndAt).format(
                      "YYYY/MM/DD hh:mm A"
                    )}
                  </div>
                  <div>
                    <strong>Current status:</strong> {serverStatus.status}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No active election. Create a new one using the form.
                </p>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={fetchStatus}
                className="px-6 py-2 rounded-full bg-[#6d4bde] text-white font-semibold shadow hover:bg-[#593bd1]"
              >
                Refresh status
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Indicator Guide</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-black">
              <li>Nomination Open (blue)</li>
              <li>Nomination Closed / Waiting (gold)</li>
              <li>Election Running (green)</li>
              <li>Election Completed (purple)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateElection;
