import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/get-electionstatus";

export const useElectionStatus = () => {
  const [status, setStatus] = useState("idle");
  const [isNominationPeriod, setIsNominationPeriod] = useState(false);
  const [isElectionRunning, setIsElectionRunning] = useState(false);
  const [isIdle, setIsIdle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = res.data?.data;

      if (!data) {
        setStatus("idle");
        setIsNominationPeriod(false);
        setIsElectionRunning(false);
        setIsIdle(true);
        return;
      }

      const now = new Date();
      const nominationStart = new Date(data.nominationStartAt);
      const nominationEnd = new Date(data.nominationEndAt);
      const electionStart = new Date(data.electionStartAt);
      const electionEnd = new Date(data.electionEndAt);

      let currentStatus = "idle";

      if (now >= nominationStart && now <= nominationEnd) {
        currentStatus = "nomination";
      } else if (now >= electionStart && now <= electionEnd) {
        currentStatus = "running";
      } else if (now > electionEnd) {
        currentStatus = "completed";
      }

      setStatus(currentStatus);
      setIsNominationPeriod(currentStatus === "nomination");
      setIsElectionRunning(currentStatus === "running");
      setIsIdle(currentStatus === "idle" || currentStatus === "completed");
      setError(null);
    } catch (err) {
      console.error("Error fetching election status:", err);
      setError(err);
      setStatus("idle");
      setIsIdle(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // auto refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return {
    status,
    isNominationPeriod,
    isElectionRunning,
    isIdle,
    loading,
    error,
  };
};
