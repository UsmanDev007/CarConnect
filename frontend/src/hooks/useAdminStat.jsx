import { useEffect, useCallback, useState } from "react";
import API from "../api/axios";

export const useAdminStat = () => {
  const [stat, setStat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStat = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get("/admin/admin-stat-dashboard");
      setStat(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch admin stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStat();
  }, [fetchStat]);

  return { stat, loading, error, fetchStat };
};
