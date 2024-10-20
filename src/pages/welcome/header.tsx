import React from "react";
import { Container, List, ListItem, Button, styled, Paper } from "@mui/material";
import { Link, Link as RouterLink } from "react-router-dom";
import { Logo } from "@/components/logo";

const HeaderContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "75px",
  gap: theme.spacing(2),
  padding: theme.spacing(0, 2),
}));

const HeaderSection = styled(List)(() => ({
  display: "flex",
  alignItems: "center",
}));

const HeaderItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  "&:last-child": {
    paddingRight: theme.spacing(0),
  },
}));

const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
  whiteSpace: "nowrap",
  "&:hover": {
    textDecoration: "underline",
  },
}));

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <HeaderItem>
    <StyledLink to={to}>{children}</StyledLink>
  </HeaderItem>
);

const navItems = [
  { to: "/", label: "Our Story" },
  { to: "/", label: "Membership" },
  { to: "/", label: "Write" },
];

interface HeaderProps {
  onModalOpen: () => void;
  onInitialAuthMode: (mode: "signIn" | "signUp") => void;
}

export function Header({ onModalOpen, onInitialAuthMode }: HeaderProps) {
  return (
    <Paper
      component="header"
      sx={{
        borderRadius: 0,
        backgroundColor: "transparent",
        zIndex: 100,
      }}>
      <HeaderContainer maxWidth="lg">
        <StyledLink sx={{ marginRight: "auto" }} to="/">
          <Logo sx={{ width: 100 }} />
        </StyledLink>
        <HeaderSection
          sx={{ display: "none", "@media (min-width: 900px)": { display: "flex" } }}>
          {navItems.map((item, i) => (
            <NavLink key={i} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </HeaderSection>
        <HeaderSection>
          <HeaderItem>
            <Button
              onClick={(event: any) => {
                event.preventDefault();
                onInitialAuthMode("signIn");
                onModalOpen();
              }}
              color="accent"
              variant="outlined"
              component={Link}
              to="/">
              Sign in
            </Button>
          </HeaderItem>
          <HeaderItem>
            <Button
              onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault();
                onInitialAuthMode("signUp");
                onModalOpen();
              }}
              color="accent"
              variant="contained"
              component={Link}
              to="/sign-up">
              Get Started
            </Button>
          </HeaderItem>
        </HeaderSection>
      </HeaderContainer>
    </Paper>
  );
}
