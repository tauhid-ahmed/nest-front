import React, { useContext, createContext, useState, useLayoutEffect } from "react";
import { apiClient } from "../api/client";
import { useNotification } from "./notification-context";

interface AuthContextType {
  activeUserId: string;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  handleSignOut: () => void;
  username: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeUserId, setActiveUserId] = useState<string>("");
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const { notify } = useNotification();

  useLayoutEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await apiClient.get("/authentication/user", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const userId = data.userId;
        const { data: user } = await apiClient.get(`/users/${userId}`);

        setActiveUserId(userId);
        setUsername(user.full_name);
        setIsSignedIn(true);
      } catch (error: any) {
        handleFetchError(error);
        setIsSignedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [isSignedIn]);

  const handleFetchError = (error: any) => {
    notify(`Error fetching user: ${error.message}`, "error");
    setUsername("");
    setIsSignedIn(false);
    setActiveUserId("");
    localStorage.removeItem("accessToken");
  };

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    setActiveUserId("");
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        activeUserId,
        isSignedIn,
        setIsSignedIn,
        isLoading,
        handleSignOut,
        username,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthentication must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
