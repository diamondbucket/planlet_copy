import axios from "axios";

// Create an Axios instance with a base URL for the backend API
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
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
    return response.data; // Returns token and user info
  } catch (error) {
    throw error.response?.data?.message || "Server error";
  }
};

// Save business info function
export const saveBusinessInfo = async (businessData, token) => {
  try {
    
    const response = await api.post(
      "/save-business-info", // The route in productRoutes
      businessData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token for authentication
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error saving business info";
  }
};

// Other API functions can be added here in a similar way

export default api;
