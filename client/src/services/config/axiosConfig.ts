import axios from "axios";

const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL
  : import.meta.env.VITE_PROD_API_URL;
  
const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
