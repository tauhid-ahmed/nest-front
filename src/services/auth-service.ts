import { apiClient } from "@/api/client";

export async function signin(email: string, password: string) {
  return await apiClient.post("/authentication/sign-in", {
    email,
    password,
  });
}

export async function signup(
  email: string,
  password: string,
  full_name: string,
  confirm_password: string
) {
  return await apiClient.post("/authentication/sign-up", {
    email,
    password,
    full_name,
    confirm_password,
  });
}

export async function signout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
