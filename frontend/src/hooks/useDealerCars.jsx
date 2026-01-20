import { useCallback, useState, useEffect } from "react";
import API from "../api/axios";

export const useDealerCar = () => {
  const [car, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get("dealer/get-cars");
      setCars(response?.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch dealer cars");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data when the hook is used
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return { car, fetchCars, loading, error };
};
