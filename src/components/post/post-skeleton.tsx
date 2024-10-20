import { Card, CardContent, Stack, Skeleton, Box, Container } from "@mui/material";
import { grey as gray } from "@mui/material/colors";

export default function PostSkeleton() {
  return (
    <Container maxWidth="lg">
      {[...Array(10)].map((_, index) => (
        <Card
          key={index}
          sx={{
            mb: 4,
            backgroundColor: "transparent",
          }}
          elevation={0}>
          <CardContent sx={{ borderBottom: `1px double ${gray[200]}`, padding: 0 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton width="60%" />
            </Stack>
            <Stack
              sx={{
                "@media (min-width: 600px)": {
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                },
              }}>
              <Box sx={{ "@media (min-width: 600px)": { flex: 2 } }}>
                <Skeleton width="80%" sx={{ mb: 1 }} />
                <Skeleton width="60%" sx={{ mb: 2 }} />
              </Box>
              <Box sx={{ "@media (min-width: 600px)": { flex: 1 } }}>
                <Skeleton
                  variant="rectangular"
                  sx={{ mb: 2, borderRadius: 2, height: "100px" }}
                />
              </Box>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width="30%" />
              <Skeleton width="15%" />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
