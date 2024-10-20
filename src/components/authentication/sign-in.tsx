import { Box, Button, TextField, Typography } from "@mui/material";
import { signin } from "@/services/auth-service";
import { useAuthentication } from "@/context/auth-context";
import { useNotification } from "@/context/notification-context";

export default function SignInForm() {
  const { setIsSignedIn } = useAuthentication();
  const { notify } = useNotification();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    const email = formData.email;
    const password = formData.password;
    try {
      await signin(email, password);
      setIsSignedIn(true);
      notify("Signed In Successfully", "success");
    } catch (err) {
      setIsSignedIn(false);
      notify("Sign In Failed", "error");
    }
  };
  return (
    <Box onSubmit={onSubmit} component="form" sx={{ width: "100%", mt: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign In
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
}
