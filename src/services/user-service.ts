import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { useNotification } from "../context/notification-context";

export function findUser(id: string) {
  const { notify } = useNotification();
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      try {
        const res = await apiClient.get(`/users/${id}`);
        return res.data;
      } catch (error) {
        notify("Failed to fetch user", "error");
        throw error;
      }
    },
  });
}
