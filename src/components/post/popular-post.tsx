import { Stack, Typography } from "@mui/material";
import { popularPosts } from "@/services/post-service";
import { type PostProps } from "./post";
import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";

export default function PopularPost() {
  const { data, isLoading } = popularPosts();
  if (isLoading) return <div>Loading...</div>;

  const posts = data;

  return (
    <Stack spacing={3} sx={{ margin: 2 }}>
      <Typography variant="h3" component="h2">
        Popular Posts
      </Typography>
      <Stack>
        {posts?.map((post: PostProps) => (
          <MUILink
            component={Link}
            to={`/posts/${post.id}`}
            key={post.id}
            typography="body1"
            color="text.primary"
            fontWeight={"medium"}
            sx={{
              textDecoration: "none",
              padding: 1,
              borderRadius: 1,
              display: "block",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "primary.main",
              },
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}>
            {post.title}
          </MUILink>
        ))}
      </Stack>
    </Stack>
  );
}
