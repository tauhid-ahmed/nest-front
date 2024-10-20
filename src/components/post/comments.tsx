import { Card, CardContent, Typography, Avatar, Stack } from "@mui/material";
import { findComments } from "../../services/comment-service";
import { useParams } from "react-router-dom";

interface Comment {
  user: { full_name: string };
  content: string;
  created_at: string;
}

const Comment = ({ username, text, timestamp }: any) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 1 }}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Avatar>{username.charAt(0)}</Avatar>
          <Stack>
            <Typography variant="body1" fontWeight="bold">
              {username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {timestamp}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const CommentsList = () => {
  const { postId } = useParams();
  const { data, isLoading } = findComments(postId as string);

  if (isLoading) return <div>Loading...</div>;

  const comments = data.data;

  return (
    <Stack spacing={2} sx={{ padding: 1 }}>
      <Typography variant="h5" component="h2">
        Comments ({comments.length})
      </Typography>
      {comments?.map((comment: Comment, index: number) => (
        <Comment
          key={index}
          username={comment.user.full_name}
          text={comment.content}
          timestamp={comment.created_at}
        />
      ))}
    </Stack>
  );
};

export default CommentsList;
