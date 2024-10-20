import { useAuthentication } from "../../context/auth-context";
import { Link as MUILink, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import * as Icons from "../icons";
import { incrementPostView, deletePost } from "../../services/post-service";
import { useEffect } from "react";

interface Post {
  id: string;
  user_id: string;
}

export default function PostActions({ post, ...props }: { post: Post; ml: string }) {
  const { activeUserId } = useAuthentication();
  const mutable = activeUserId && activeUserId === post.user_id;
  const { mutate: incrementView } = incrementPostView(post.id);
  const { mutate: deletePostMutation } = deletePost(post.id);

  useEffect(() => {
    if (post.id) {
      incrementView();
    }
  }, [post.id, incrementView]);

  const handleDelete = () => deletePostMutation();

  return (
    <>
      {mutable && (
        <Stack direction="row" {...props}>
          <MUILink
            color="info"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            component={Link}
            to={`/posts/edit/${post.id}`}>
            <Icons.WriteNote sx={{ width: 16, height: 16 }} />
            Edit
          </MUILink>
          <Button
            color="error"
            onClick={handleDelete}
            sx={{
              display: "flex",
              ml: "auto",
              alignItems: "center",
              gap: 0.5,
              fontWeight: "400",
            }}>
            <Icons.Trash sx={{ width: 16, height: 16 }} />
            Delete
          </Button>
        </Stack>
      )}
    </>
  );
}
