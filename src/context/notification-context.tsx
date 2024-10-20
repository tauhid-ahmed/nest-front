import React, { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

interface NotificationContextType {
  notify: (message: string, severity: "success" | "error" | "info" | "warning") => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const SlideTransition = (props: TransitionProps) => {
  // @ts-ignore
  return <Slide {...props} direction="left"></Slide>;
};
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notificationState, setNotificationState] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
    vertical: "top";
    horizontal: "right";
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    message: "",
    severity: "success",
    vertical: "top",
    horizontal: "right",
    Transition: SlideTransition,
  });

  const { open, message, severity, vertical, horizontal } = notificationState;

  const notify = (
    message: string,
    severity: "success" | "error" | "info" | "warning" = "success"
  ) => {
    setNotificationState({ ...notificationState, open: true, message, severity });
  };

  const handleClose = () => {
    setNotificationState({ ...notificationState, open: false });
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={notificationState.Transition}
        anchorOrigin={{
          vertical: vertical,
          horizontal: horizontal,
        }}
        key={vertical + horizontal}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
