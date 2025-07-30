import axios from "axios";

const ENV = import.meta.env;
const baseURL = ENV.DEV
  ? `${ENV.VITE_API_URL}/api/${ENV.VITE_API_VERSION}`
  : `${ENV.VITE_PROD_API_URL}/api/${ENV.VITE_API_VERSION}`;

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
