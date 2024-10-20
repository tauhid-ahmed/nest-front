import { Box, Button, Paper, Portal, Theme } from "@mui/material";
import { motion } from "framer-motion";
import SignInForm from "./sign-in";
import SignUpForm from "./sign-up";
import CloseIcon from "@mui/icons-material/Close";

const styles = {
  overlay: (theme: Theme) => ({
    position: "fixed",
    height: "100vh",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: theme.zIndex.modal,
    display: "grid",
    placeItems: "center",
    background: "rgba(255,255,255,0.95)",
  }),
  modalContent: (theme: Theme) => ({
    background: "#fff",
    padding: theme.spacing(7.5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "690px",
    width: "100%",
    height: "100%",
    position: "relative",
    [theme.breakpoints.up("md")]: {
      maxHeight: "700px",
      boxShadow: theme.shadows[10],
    },
  }),
  closeButton: (theme: Theme) => ({
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
  }),
};

// Animation variants
const modalVariants = {
  hidden: { y: 30, scale: 0.9, opacity: 0 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

interface AuthenticationModalProps {
  onModalClose: () => void;
  isModalOpen: boolean;
  authMode: "signIn" | "signUp" | "";
}

export function AuthenticationModal({
  onModalClose,
  isModalOpen,
  authMode,
}: AuthenticationModalProps) {
  if (!isModalOpen) return null;

  return (
    isModalOpen && (
      <Portal>
        <Box sx={styles.overlay}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={modalVariants}
            transition={{ duration: 0.2 }}
            style={{
              width: "100%",
              display: "grid",
              placeItems: "center",
              height: "100%",
            }}>
            <Paper elevation={0} sx={styles.modalContent}>
              <Button
                onClick={onModalClose}
                sx={styles.closeButton}
                aria-label="Close modal">
                <CloseIcon />
              </Button>

              {authMode === "signIn" ? <SignInForm /> : <SignUpForm />}
            </Paper>
          </motion.div>
        </Box>
      </Portal>
    )
  );
}
