import { Box, Container, Stack } from "@mui/material";
import Post from "@/components/post/post";
import { findPosts } from "@/services/post-service";
import React from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Aside } from "@/components/aside";
import PostSkeleton from "@/components/post/post-skeleton";
import PopularPost from "@/components/post/popular-post";

export default function Layout() {
  const { isLoading, data, error, status, isFetchingNextPage, hasNextPage, ref } =
    useInfiniteScroll(findPosts);

  if (isLoading) return <PostSkeleton />;
  if (status === "error") return <p>Error: {(error as Error).message}</p>;

  return (
    <>
      <Container maxWidth="lg">
        <Stack direction={"row"} spacing={2} mt={4}>
          <Box
            sx={{
              flex: 1,
            }}>
            <Box
              sx={{
                flex: 1,
                maxWidth: {
                  xs: "100%",
                  md: "700px",
                },
              }}>
              {/* @ts-ignore */}
              {data?.pages.map((page: any, i: number) => (
                <React.Fragment key={i}>
                  {page?.data.data.map((post: Record<string, string>) => (
                    <Post key={post.id} post={post} />
                  ))}
                </React.Fragment>
              ))}
              <Box sx={{ display: "flex", justifyContent: "center" }} ref={ref}>
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
              </Box>
            </Box>
          </Box>
          <Aside>
            <PopularPost />
          </Aside>
        </Stack>
      </Container>
    </>
  );
}
