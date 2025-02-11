import axios from "axios";

// Create an Axios instance with a base URL for the backend API
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Sign-up function
export const register = async (name, email, password) => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong";
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data; // Returns token and user info
  } catch (error) {
    throw error.response?.data?.message || "Server error";
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error sending reset email";
  }
};

export const resetPassword = async (email, token, newPassword) => {
  try {
    const response = await api.post("/auth/reset-password", {
      email,
      token,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error resetting password";
  }
};

// Save business info function
export const saveBusinessInfo = async (businessData) => {
  try {
    const response = await api.post("/save-business-info", businessData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error saving business info";
  }
};

// Other API functions can be added here in a similar way

export default api;
