import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { useNotification } from "../context/notification-context";
import { useNavigate } from "react-router-dom";

export function findComments(postId: string) {
  return useQuery({
    queryKey: ["comments"],
    queryFn: () => apiClient.get(`/posts/${postId}/comments`),
  });
}
// // tobe updated
// export function findComment(id: string) {
//   return useQuery({
//     queryKey: ["comment", id],
//     queryFn: async () => {
//       // link to be updated
//       const res = await apiClient.get(`/posts/${post_id}/comments`);
//       return res.data;
//     },
//   });
// }
// // tobe updated
// export function deleteComment(id: string) {
//   const { notify } = useNotification();
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   return useMutation({
//     // link to be updated
//     mutationFn: async () => apiClient.delete(`/posts/${post_id}/comments`),
//     onSuccess: () => {
//       notify("Comment deleted successfully", "success");
//       queryClient.invalidateQueries({ queryKey: ["comments"] });
//       navigate("/");
//     },
//     onError: (error) => {
//       notify("Failed to delete comment", "error");
//       throw error;
//     },
//   });
// }

export function createComment(post_id: string) {
  const { notify } = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: any) => {
      return apiClient.post(`/posts/${post_id}/comments`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      notify("Comment created successfully", "success");
      navigate(".");
    },
    onError: (error) => {
      notify("Failed to create comment", "error");
      throw error;
    },
  });
}

interface UpdatePostPayload {
  title: string;
  content: string;
  cover_image: string;
  user_id: string;
}
export function updateComment() {
  const { notify } = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    // @ts-ignore
    {
      mutationFn: ({ id, payload }: { id: string; payload: UpdatePostPayload }) => {
        return apiClient.patch(`/comments/${id}`, payload);
      },
      onSuccess: () => {
        notify("Comment updated successfully", "success");
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        navigate("/");
      },
      // @ts-ignore
      onError: (error) => {
        notify("Failed to update comment", "error");
      },
    }
  );
}
