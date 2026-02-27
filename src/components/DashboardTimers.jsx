import axios from "axios";
import React, { useEffect, useState } from "react";

const formatTime = (ms) => {
  if (ms <= 0) return "00:00:00";

  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

const DashboardTimers = () => {
  const [timers, setTimers] = useState({
    nominationStart: "00:00:00",
    nominationEnd: "00:00:00",
    electionStart: "00:00:00",
    electionEnd: "00:00:00",
  });

  const [dates, setDates] = useState({
    nominationStartAt: null,
    nominationEndAt: null,
    electionStartAt: null,
    electionEndAt: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // FETCH ELECTION DATES

  useEffect(() => {
    const fetchElectionDates = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:8000/api/get-electionstatus"
        );

        console.log("Response1111", res.data.data);
        const data = res.data?.data;

        // if (res.data.data) {
        //   setDates({
        //     nominationStartAt: new Date(data.nominationStartAt),
        //     nominationEndAt: new Date(data.nominationEndAt),
        //     electionStartAt: new Date(data.electionStartAt),
        //     electionEndAt: new Date(data.electionEndAt),
        //   });

        //   //   console.log("Now:", now.toString());
        //   // console.log("Nomination Start:", dates.nominationStartAt.toString());
        //   // console.log("Nomination End:", dates.nominationEndAt.toString());
        // }

        if (data) {
          const nominationStart = new Date(data.nominationStartAt);
          const nominationEnd = new Date(data.nominationEndAt);
          const electionStart = new Date(data.electionStartAt);
          const electionEnd = new Date(data.electionEndAt);

          setDates({
            nominationStartAt: nominationStart,
            nominationEndAt: nominationEnd,
            electionStartAt: electionStart,
            electionEndAt: electionEnd,
          });

          console.log("Nomination Start:", nominationStart.toString());
          console.log("Nomination End:", nominationEnd.toString());
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchElectionDates();
  }, []);

  // MASTER COUNTDOWN LOGIC

  useEffect(() => {
    if (
      !dates.nominationStartAt ||
      !dates.nominationEndAt ||
      !dates.electionStartAt ||
      !dates.electionEndAt
    ) {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();

      const ns = dates.nominationStartAt - now;
      const ne = dates.nominationEndAt - now;
      const es = dates.electionStartAt - now;
      const ee = dates.electionEndAt - now;

      if (now < dates.nominationStartAt) {
        setTimers({
          nominationStart: formatTime(ns),
          nominationEnd: "00:00:00",
          electionStart: formatTime(es),
          electionEnd: "00:00:00",
        });
      } else if (
        now >= dates.nominationStartAt &&
        now < dates.nominationEndAt
      ) {
        setTimers({
          nominationStart: "00:00:00",
          nominationEnd: formatTime(ne),
          electionStart: formatTime(es),
          electionEnd: "00:00:00",
        });
      } else if (now >= dates.nominationEndAt && now < dates.electionStartAt) {
        setTimers({
          nominationStart: "00:00:00",
          nominationEnd: "00:00:00",
          electionStart: formatTime(es),
          electionEnd: "00:00:00",
        });
      } else if (now >= dates.electionStartAt && now < dates.electionEndAt) {
        setTimers({
          nominationStart: "00:00:00",
          nominationEnd: "00:00:00",
          electionStart: "00:00:00",
          electionEnd: formatTime(ee),
        });
      } else {
        setTimers({
          nominationStart: "00:00:00",
          nominationEnd: "00:00:00",
          electionStart: "00:00:00",
          electionEnd: "00:00:00",
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [dates]);

  // LOADING + ERROR UI

  if (loading) {
    return (
      <div className="text-center text-white text-lg py-6">
        Loading dashboard timers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-300 text-lg py-6">
        Failed to fetch election status.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col ml-9 mt-10">
      {/* TIMER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[65%] max-w-[550px]">
        <TimerCard
          title="Nomination Starts In"
          time={timers.nominationStart}
          color="from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"
        />

        <TimerCard
          title="Nomination Ends In"
          time={timers.nominationEnd}
          color="from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"
        />

        <TimerCard
          title="Election Starts In"
          time={timers.electionStart}
          color="from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"
        />

        <TimerCard
          title="Election Ends In"
          time={timers.electionEnd}
          color="from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"
        />
      </div>

      {/* BUTTON WRAPPER */}
      {/* <div className="mt-36 w-full flex ml-24 z-50">
        <button className="px-6 py-3 text-white hover:text-blue-200 text-2xl rounded-lg border border-white/30 bg-black/50">
          More Details About the System
        </button>
      </div> */}
    </div>
  );
};

export default DashboardTimers;

// Reusable Timer Card
const TimerCard = ({ title, time, color }) => {
  return (
    <div
      className={`p-6 text-center rounded-2xl bg-gradient-to-br ${color} shadow-xl shadow-black/30 border border-white/20 backdrop-blur-sm`}
    >
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <p className="text-3xl font-bold text-white tracking-wider">{time}</p>
    </div>
  );
};
