import { Box, Typography, Paper, Avatar } from "@mui/material";

import PostActions from "./post-actions";

interface Post {
  id: string;
  title: string;
  content: string;
  cover_image: string;
  created_at: Date;
  user_id: string;
  user: {
    full_name: string;
  };
}

export default function PostDetailsPage({ post }: { post: Post }) {
  return (
    <>
      <Box display="flex" alignItems="flex-start" py={4}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            mr: 2,
            fontWeight: "bold",
            textTransform: "uppercase",
          }}>
          {post.user.full_name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h6" component="h2">
            {post.user.full_name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {new Date(post.created_at).toLocaleDateString("bn-BD", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            &nbsp;
            {new Date(post.created_at).toLocaleTimeString("bn-BD", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </Typography>
        </Box>

        <PostActions ml="auto" post={post} />
      </Box>

      <Typography variant="h3" mb={2} component="h1">
        {post.title}
      </Typography>

      {post.cover_image && (
        <Box mb={4}>
          <img
            src={post.cover_image}
            alt={post.title}
            style={{
              width: "100%",
              maxHeight: 200,
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        </Box>
      )}

      <Paper
        elevation={0}
        sx={{
          padding: 4,
          marginBottom: 4,
          backgroundColor: "transparent",
          typography: "body1",
          "& img": {
            maxWidth: "100%",
            height: "auto",
            objectFit: "contain",
          },
          "& p": {
            fontSize: "1.1rem",
          },
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </>
  );
}
