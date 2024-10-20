import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Stack,
  Avatar,
  Tooltip,
} from "@mui/material";
import * as Icons from "@/components/icons";
import { grey as gray } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { dateFormatter } from "@/utils";

interface HeaderProps {
  username: string;
}

export interface PostProps {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  publishedTime: string;
  views: number;
  comments: Comment[];
  user_id: string;
  cover_image: string;
  created_at: string;
  user: {
    full_name: string;
  };
}

interface BodyProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

interface FooterProps {
  publishedTime: string;
  views: number;
  comments: number;
}

const PostHeader = ({ username }: HeaderProps) => (
  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
    <Avatar sx={{ width: 24, height: 24 }} />
    <Stack>
      <Typography variant="caption">{username}</Typography>
    </Stack>
  </Stack>
);

const PostBody = ({ title, subtitle, imageUrl }: BodyProps) => (
  <Stack
    sx={{
      "@media (min-width: 600px)": {
        display: "flex",
        flexDirection: "row",
        gap: 10,
      },
    }}>
    <Box sx={{ "@media (min-width: 600px)": { flex: 2 } }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ lineHeight: "1.2", fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography
        component="h3"
        variant="body1"
        color="text.hint"
        sx={{ mt: 1, fontWeight: "normal" }}>
        {subtitle}
      </Typography>
    </Box>
    <Box
      sx={{ marginTop: "16px", "@media (min-width: 600px)": { flex: 1, marginTop: 0 } }}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={title}
        height="110px"
        sx={{ borderRadius: 1, border: `1px solid ${gray[200]}` }}
      />
    </Box>
  </Stack>
);

const PostFooter = ({ publishedTime, views, comments }: FooterProps) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    mt="10px"
    fontSize={14}>
    <Stack direction="row" alignItems="center" gap={2}>
      <Icons.MembersOnly sx={{ width: 16, height: 16 }} />
      <Box component="span">{dateFormatter(publishedTime)}</Box>

      <Stack direction={"row"} alignItems={"center"} gap={0.5}>
        <Icons.View sx={{ width: 16, height: 16 }} />
        {views}
      </Stack>

      <Stack direction={"row"} alignItems={"center"} gap={0.5}>
        <Icons.Comments sx={{ width: 16, height: 16 }} />
        {comments}
      </Stack>
    </Stack>
    <Stack direction="row" gap={2} alignItems="center">
      <Tooltip title="Show less like this" placement="top">
        <IconButton size="small">
          <Icons.Dislike sx={{ width: 20, height: 20 }} />
        </IconButton>
      </Tooltip>
      <IconButton size="small">
        <Icons.ThreeDot />
      </IconButton>
    </Stack>
  </Stack>
);

export default function Post({ post }: { post: PostProps }) {
  console.log(post);

  return (
    <Link to={`/posts/${post.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          mb: 4,
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        elevation={0}>
        <CardContent sx={{ borderBottom: `1px double ${gray[200]}`, padding: 0 }}>
          <PostHeader username={post?.user?.full_name} />
          <PostBody
            title={post.title}
            subtitle={post.subtitle}
            imageUrl={post.cover_image}
          />
          <PostFooter
            publishedTime={post.created_at}
            views={post.views}
            comments={post.comments?.length || 0}
          />
        </CardContent>
      </Card>
    </Link>
  );
}
