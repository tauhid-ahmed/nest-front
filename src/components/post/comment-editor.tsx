import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuthentication } from "../../context/auth-context";
import { createComment } from "../../services/comment-service";

export default function CommentEditor() {
  const [comment, setComment] = useState("");
  const { activeUserId } = useAuthentication();
  const { postId } = useParams();

  const { mutate: createCommentMutation } = createComment(postId as string);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createCommentMutation({ post_id: postId, content: comment, user_id: activeUserId });
  };

  return (
    <>
      <Box component="form" sx={{ my: 4 }} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Write a comment..."
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </>
  );
}
