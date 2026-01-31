import { useQuery } from "@tanstack/react-query";
import API from "../api/axios";

export const useAdminStat = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await API.get("/admin/admin-stat-dashboard");
      return res.data;
    }
  });
};
