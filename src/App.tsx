import { ReactLenis } from "@studio-freight/react-lenis";
import MUIThemeProvider from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router";
import { AuthProvider } from "./context/auth-context";
import { NotificationProvider } from "./context/notification-context";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ReactLenis root options={{ duration: 0.5 }}>
      <QueryClientProvider client={queryClient}>
        <MUIThemeProvider>
          <NotificationProvider>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </NotificationProvider>
        </MUIThemeProvider>
      </QueryClientProvider>
    </ReactLenis>
  );
}
