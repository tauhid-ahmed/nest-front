import {
  Container,
  List,
  ListItem,
  Link,
  styled,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterProps {
  desktopLinks: FooterLink[];
  mobileLinks: FooterLink[];
}

const FooterContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  height: "75px",
  [theme.breakpoints.up("md")]: {
    justifyContent: "center",
  },
  alignItems: "center",
}));

const FooterList = styled(List)(({}) => ({
  display: "flex",
  whiteSpace: "nowrap",
  fontSize: "14px",
  alignItems: "center",
}));

const FooterListItem = styled(ListItem)({
  width: "auto",
  padding: "0 8px",
});

const FooterLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontWeight: 500,
  color: "#fff",
  [theme.breakpoints.up("md")]: {
    color: "#000",
  },
  "&:hover": {
    textDecoration: "underline",
  },
}));

export function Footer({ desktopLinks, mobileLinks }: FooterProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const renderLinks = (links: FooterLink[], isMobileView: boolean) => (
    <FooterList>
      {links.map(({ title, href }) => (
        <FooterListItem key={title}>
          <FooterLink
            href={href}
            color={isMobileView ? "secondary.contrastText" : "text.secondary"}>
            {title}
          </FooterLink>
        </FooterListItem>
      ))}
    </FooterList>
  );

  return (
    <Paper
      sx={{
        backgroundColor: isMobile ? "#000" : "transparent",
        borderRadius: 0,
        borderTop: `1px solid #000`,
      }}
      elevation={0}>
      <FooterContainer maxWidth="lg">
        {renderLinks(isMobile ? mobileLinks : desktopLinks, isMobile)}
      </FooterContainer>
    </Paper>
  );
}
