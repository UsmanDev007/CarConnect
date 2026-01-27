import { useCallback, useState } from "react";
import { toast } from "sonner";
import API from "../api/axios";

export const useComment = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async (id) => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      const response = await API.get(`/user/comments/${id}`);
      setComments(response?.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err.response || err);
      setError(err.response?.data?.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  }, []);

  const postComment = async (newCarComment) => {
    const toastId = toast.loading("Adding comment...");
    try {
      const response = await API.post("/user/add-comment", newCarComment);
      if (response.status === 201) {
        setComments((prev) => [response?.data, ...prev]);
        toast.success("Comment added", { id: toastId });
        return { success: true };
      }
    } catch (err) {
      console.error("POST ERROR:", err.response || err);
      toast.error(err.response?.data?.message || "Failed to add comment", {
        id: toastId,
      });
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
