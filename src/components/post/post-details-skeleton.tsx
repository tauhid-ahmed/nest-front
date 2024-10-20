import React from "react";
import { Box, Skeleton, Typography, Container } from "@mui/material";

const PostDetailsSkeleton: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <>
        {/* User info (Name, Date) */}
        <Box display="flex" alignItems="center" sx={{ my: 2 }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ marginRight: 2 }} />
          <Box>
            <Skeleton variant="text" width={150} height={20} />
            <Skeleton variant="text" width={100} height={20} />
          </Box>
        </Box>

        {/* Post title */}
        <Skeleton variant="text" height={40} sx={{ marginBottom: 2 }} width="60%" />

        {/* Post cover image */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ marginBottom: 4 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={{ marginBottom: 4 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          sx={{ marginBottom: 4 }}
        />

        {/* Post content */}
        <Skeleton variant="text" height={25} width="80%" />
        <Skeleton variant="text" height={25} width="90%" />
        <Skeleton variant="text" height={25} width="95%" />
        <Skeleton variant="text" height={25} width="85%" />
        <Skeleton variant="text" height={25} width="75%" />

        {/* Comments section */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6">Comments</Typography>
          {[...Array(3)].map((_, index) => (
            <Box key={index} display="flex" alignItems="center" sx={{ marginTop: 2 }}>
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ marginRight: 2 }}
              />
              <Box>
                <Skeleton variant="text" width={150} height={20} />
                <Skeleton variant="text" width={300} height={20} />
              </Box>
            </Box>
          ))}
        </Box>
      </>
    </Container>
  );
};

export default PostDetailsSkeleton;
