import { useAuthentication } from "../../context/auth-context";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/client";
import PostEditor from "@/components/post/post-editor";

export default function EditPostDeatailsPage() {
  const { activeUserId } = useAuthentication();
  const { postId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => apiClient.get(`/posts/${postId}`),
  });

  if (isLoading) return <div>Loading...</div>;
  const post = data?.data;

  if (activeUserId !== post?.user_id) {
    console.log({ activeUserId, user: post?.user_id });
    return <div>You are not authorized to edit this post</div>;
  }

  return <PostEditor post={post} />;
}
