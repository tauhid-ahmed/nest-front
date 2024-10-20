import { Box, Button, Container, Paper, Stack, styled } from "@mui/material";
import { Logo } from "../logo";
import { Link } from "react-router-dom";
import * as Icons from "../icons";
import Search from "./search";
import { grey as gray } from "@mui/material/colors";
import Profile from "./profile";

const HeaderSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export default function Header() {
  return (
    <Paper
      elevation={0}
      sx={{ backgroundColor: "transparent", borderBottom: `1px solid ${gray[200]}` }}>
      <Container>
        <Stack
          component="header"
          direction={"row"}
          sx={{ zIndex: 100, height: "52px" }}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <HeaderSection>
            <Link to="/">
              <Logo sx={{ width: 100 }} />
            </Link>
            <Search />
          </HeaderSection>
          <HeaderSection>
            <Button
              color="accent"
              component={Link}
              to="/new-story"
              sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
              <Icons.WriteNote sx={{ width: 20, height: 20 }} />
              Write
            </Button>
            <Icons.Magnify
              sx={{
                "@media (min-width: 600px)": { display: "none" },
                width: 20,
                height: 20,
              }}
            />
            <Icons.Bell sx={{ width: 20, height: 20, mr: 0.5 }} />
            <Profile />
          </HeaderSection>
        </Stack>
      </Container>
    </Paper>
  );
}
