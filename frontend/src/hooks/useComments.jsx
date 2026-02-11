import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import API from "../api/axios";

/* ---------------- API FUNCTIONS ---------------- */
const getComments = async (carId) => {
  const res = await API.get(`/user/comments/${carId}`);
  return res.data || [];
};

const addComment = async (payload) => {
  const res = await API.post("/user/add-comment", payload);
  return res;
};

/* ---------------- HOOK ---------------- */
export const useComment = (carId) => {
  const queryClient = useQueryClient();

  /* -------- FETCH COMMENTS -------- */
  const {
    data: comments = [],
    isLoading: loading,
    error,
    refetch: fetchComments, // manual trigger
  } = useQuery({
    queryKey: ["comments", carId], // ✅ queryKey per car
    queryFn: () => getComments(carId),
    enabled: !!carId, // only fetch if carId exists
    staleTime: 1000 * 60, // 1 minute cache
  });

  /* -------- POST COMMENT -------- */
  const { mutateAsync } = useMutation({
    mutationFn: addComment,

    onMutate: () => {
      toast.loading("Adding comment...", { id: "add-comment" });
    },

    onSuccess: (response) => {
      if (response.status === 201) {
        // update cache instantly
        queryClient.setQueryData(
          ["comments", carId],
          (old = []) => [response.data, ...old]
        );
        toast.success("Comment added", { id: "add-comment" });
      }
    },

    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to add comment",
        { id: "add-comment" }
      );
    },
  });

  const postComment = async (payload) => {
    try {
      await mutateAsync(payload);
      return { success: true };
    } catch {
      return { success: false };
    }
  };

  return {
    comments,
    loading,
    error,
    fetchComments, 
    postComment,
  };
};
