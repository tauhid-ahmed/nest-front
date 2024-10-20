import { useParams } from "react-router-dom";
import { apiClient } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import PostDetails from "@/components/post/post-details";
import PostDetailsSkeleton from "@/components/post/post-details-skeleton";
import { Container } from "@mui/material";
import Comments from "../../components/post/comments";
import CommentEditor from "../../components/post/comment-editor";

export default function PostDetailsPage() {
  const { postId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => apiClient.get(`/posts/${postId}`),
  });

  if (isLoading) return <PostDetailsSkeleton />;
  const post = data?.data;

  return (
    <Container maxWidth="lg">
      <PostDetails post={post} />
      <Comments />
      <CommentEditor />
    </Container>
  );
}
