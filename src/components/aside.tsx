import { Box } from "@mui/material";
import { grey as gray } from "@mui/material/colors";

export function Aside({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "360px",
        borderLeft: `1px solid ${gray[200]}`,
        paddingLeft: "24px",

        display: { xs: "none", md: "block" },
      }}>
      {children}
    </Box>
  );
}
