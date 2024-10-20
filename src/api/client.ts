import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// nest-back-production.up.railway.app
// https://nest-back-production.up.railway.app
// baseURL: "http://localhost:3000",

export const apiClient = axios.create({
  baseURL: "https://nest-back-production.up.railway.app",
  withCredentials: true,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const parsedToken = localStorage.getItem("accessToken");
    if (parsedToken) {
      config.headers["Authorization"] = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.log("logged out.....");
    console.error("Request error:", error.message);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    if (response.data.refreshToken) {
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    return Promise.reject(error);
  }
);
