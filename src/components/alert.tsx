import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface NotificationProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

export default function Notification({
  open,
  message,
  severity,
  onClose,
}: NotificationProps) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
