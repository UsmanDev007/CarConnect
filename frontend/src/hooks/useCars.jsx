import { useState, useEffect, useCallback } from "react";
import API from "../api/axios";
import { toast } from "sonner";
export const useCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. FETCH ALL CARS
  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get("admin/allAdminCars");
      setCars(response.data?.data || []);

      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. DELETE A CAR
  const deleteCar = async (id) => {
    try {
      toast.loading("Deleting car...", { id: "delete-car" });

      const response = await API.delete(`admin/deleteCar/${id}`);

      if (response.status === 200) {
        setCars((prev) => prev.filter((car) => car._id !== id));

        toast.success("Car deleted successfully", {
          id: "delete-car",
        });

        return { success: true };
      }
    } catch (err) {
      toast.error("Failed to delete car", {
        id: "delete-car",
        description: err.message,
      });

      return { success: false, error: err.message };
    }
  };
  const updateCar = async (id, updatedData) => {
    try {
      toast.loading("Updating car...", { id: "update-car" });

      const response = await API.put(`admin/updateCar/${id}`, updatedData);

      if (response.status === 200) {
        setCars((prev) =>
          prev.map((car) => (car._id === id ? updatedData : car)),
        );

        toast.success("Car Updated successfully", {
          id: "update-car",
        });

        return { success: true };
      }
    } catch (err) {
      toast.error("Failed to update car", {
        id: "update-car",
        description: err.message,
      });

      return { success: false, error: err.message };
    }
  };

  const addCar = async (newCarData) => {
    try {
      toast.loading("Adding car...", { id: "add-car" });
      const response = await API.post("/admin/addCar", newCarData);
      if (response.status === 201) {
        const createdCar = response.data?.data || { ...newCarData };
        setCars((prev) => [createdCar, ...prev]);
        toast.success("Car added successfully", { id: "add-car" });
        return { success: true };
      }
    } catch (error) {
      toast.error("Failed to add car", {
        id: "add-car",
        description: error.response?.data?.message || error.message,
      });
      return { success: false };
    }
  };

  // Run fetch on mount
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return {
    cars,
    loading,
    error,
    deleteCar,
    updateCar,
    addCar,
    refresh: fetchCars,
  };
};
