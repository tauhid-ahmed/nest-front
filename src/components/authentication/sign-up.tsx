import { Box, Button, TextField, Typography } from "@mui/material";
import { signin, signup } from "../../services/auth-service";
import { useAuthentication } from "../../context/auth-context";
import { useNotification } from "../../context/notification-context";

export default function SignUpForm() {
  const { setIsSignedIn } = useAuthentication();
  const { notify } = useNotification();
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    const full_name = formData.name as string;
    const email = formData.email as string;
    const password = formData.password as string;
    const confirm_password = formData.confirm_password as string;
    await signup(email, password, full_name, confirm_password);
    try {
      await signin(email, password);
      setIsSignedIn(true);
      notify("Signed Up Successfully", "success");
    } catch (err) {
      setIsSignedIn(false);
      notify("Sign Up Failed", "error");
    }
  };
  return (
    <Box onSubmit={onSubmit} component="form" sx={{ width: "100%", mt: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Full Name"
        name="name"
        autoComplete="name"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirm_password"
        label="Confirm Password"
        type="password"
        id="confirm_password"
        autoComplete="new-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
}
