import { Box, Button, Container, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export function Main() {
  const isMedium = useMediaQuery("(min-width: 900px)");
  return (
    <Container>
      <Box
        sx={{
          maxWidth: "800px",
          width: "100%",
          zIndex: 1,
          position: "relative",
        }}
        color="text.secondary">
        <Typography
          component="h1"
          sx={{
            fontSize: {
              fontSize: "48px",
              md: "60px",
              lg: "72px",
              xl: "96px",
            },
            lineHeight: "1",
            color: "text.primary",
          }}>
          Human <br /> stories & ideas
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body1" fontSize={"22px"}>
          A place to read, write, and deepen your understanding
        </Typography>
        <Button
          sx={{ mt: 2 }}
          size="large"
          color={isMedium ? "accent" : "primary"}
          variant="contained">
          Start Reading
        </Button>
      </Box>
    </Container>
  );
}

export function Image() {
  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        height: "600px",
        left: "0%",
        top: "50%",
        transform: "translate(0%, -50%)",
        display: "flex",
      }}>
      <Box
        sx={{
          flex: 1,
          shrink: 0,
          minWidth: "700px",
        }}></Box>
      <Box
        sx={{
          height: "600px",
          width: "460px",

          display: "none",
          "@media (min-width: 900px)": {
            display: "block",
          },
        }}>
        <img
          style={{
            objectFit: "cover",
            display: "block",
            height: "600px",
            width: "460px",
          }}
          alt="decorative image"
          loading="lazy"
          src="/images/welcome-decoration.webp"
        />
      </Box>
    </Box>
  );
}
