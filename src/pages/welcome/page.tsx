import { Paper, Stack } from "@mui/material";
import { Header } from "./header";
import { Main, Image } from "./main";
import { Footer } from "./footer";
import { mobileLinks, desktopLinks } from "./footerLinks";
import { useState } from "react";
import { AuthenticationModal } from "@/components/authentication";

export default function WelcomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signIn" | "signUp" | "">("");

  const handleAuthModalOpen = () => {
    setIsAuthModalOpen(true);
  };

  const handleSignInModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleInitialAuthMode = (mode: "signIn" | "signUp") => {
    setAuthMode(mode);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#f6f4ee",
          borderRadius: 0,
          height: "100vh",
        }}>
        <Stack direction="column" justifyContent="space-between" sx={{ height: "100%" }}>
          <Header
            onModalOpen={handleAuthModalOpen}
            onInitialAuthMode={handleInitialAuthMode}
          />
          <Main />
          <Image />
          <Footer desktopLinks={desktopLinks} mobileLinks={mobileLinks} />
        </Stack>
      </Paper>
      <AuthenticationModal
        onModalClose={handleSignInModalClose}
        isModalOpen={isAuthModalOpen}
        authMode={authMode}
      />
    </>
  );
}
