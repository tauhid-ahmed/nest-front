import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@/api/client";
// import { useAuthentication } from "../context/auth-context";
import { useNotification } from "../context/notification-context";
import { useNavigate } from "react-router-dom";

const POST_LIMIT = 10;
export function findPosts() {
  // const { token } = useAuthentication();
  // @ts-ignore
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.get("/posts", {
        params: { page: pageParam, limit: POST_LIMIT },
        // headers: { Authorization: `Bearer ${token}` },
      }),
    getNextPageParam: (_lastPage, pages) => pages.length + 1,
  });
}
export function findPost(id: string) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await apiClient.get(`/posts/${id}`);
      return res.data;
    },
  });
}

export function incrementPostView(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiClient.patch(`/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      throw error;
    },
  });
}

export function popularPosts() {
  return useQuery({
    queryKey: ["popular-posts"],
    queryFn: async () => {
      const res = await apiClient.get("/posts/popular");
      return res.data;
    },
  });
}

export function deletePost(id: string) {
  const { notify } = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => apiClient.delete(`/posts/${id}`),
    onSuccess: () => {
      notify("Post deleted successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
    onError: () => {
      notify("Failed to delete post", "error");
    },
  });
}

export function createPost() {
  const { notify } = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: any) => {
      console.log({ payload });
      return apiClient.post("/posts", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      notify("Post created successfully", "success");
      navigate("/");
    },
    onError: (error) => {
      notify("Failed to create post", "error");
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
export function updatePost() {
  const { notify } = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    // @ts-ignore
    {
      mutationFn: ({ id, payload }: { id: string; payload: UpdatePostPayload }) => {
        return apiClient.patch(`/posts/${id}`, payload);
      },
      onSuccess: () => {
        notify("Post updated successfully", "success");
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        navigate("/");
      },
      // @ts-ignore
      onError: (error) => {
        notify("Failed to update post", "error");
      },
    }
  );
}
