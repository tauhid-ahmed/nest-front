import { Box, Button, Popover, Stack } from "@mui/material";
import { useAuthentication } from "../../context/auth-context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { handleSignOut } = useAuthentication();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { username } = useAuthentication();

  return (
    <>
      <Box
        component="button"
        sx={{
          width: 32,
          aspectRatio: 1,
          borderRadius: "50%",
          backgroundColor: "seagreen",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: 12,
          fontWeight: "normal",
          textTransform: "uppercase",
          cursor: "pointer",
          border: "1px solid yellow",
        }}
        onClick={handleClick}>
        {genUserName(username)}
      </Box>
      <Popover
        id={"profile-popover"}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}>
        <Stack p="10px" color={"text.primary"}>
          <Box component="p" mb-2 fontWeight="bold">
            {username}
          </Box>
          <Button
            variant="text"
            color="inherit"
            onClick={() => {
              handleSignOut();
              navigate("/");
            }}
            sx={{
              p: 2,
              backgroundColor: "white",
              borderRadius: 1,
              fontSize: 12,
              fontWeight: "medium",
            }}>
            Sign Out
          </Button>
        </Stack>
      </Popover>
    </>
  );
}

function genUserName(name: string) {
  const [firstName, lastName] = name?.split(" ");
  return firstName?.[0] + lastName?.[0];
}
