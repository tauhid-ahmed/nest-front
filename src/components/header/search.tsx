import { InputBase, InputAdornment, styled } from "@mui/material";
import * as Icons from "@/components/icons";

const SearchInput = styled(InputBase)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: "2px 8px",
  height: "32px",
  display: "none",
  alignItems: "center",
  "@media (min-width: 600px)": {
    display: "flex",
  },
  "& .MuiInputBase-input": {
    padding: 0,
    height: "22px",
    fontSize: "14px",
  },
}));

export default function Search() {
  return (
    <SearchInput
      placeholder="Search..."
      startAdornment={
        <InputAdornment position="start">
          <Icons.Magnify sx={{ width: "16px", height: "16px" }} />
        </InputAdornment>
      }
    />
  );
}
