import axios from "axios";
import { routing } from '@/i18n/routing';

// Create an axios instance with server-side safe configuration
const axiosInstance = axios.create({
  baseURL: "/backend/api/site",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    // "Content-Type": "application/json",
    // Don't set Authorization header by default on server
    "X-localization": routing.defaultLocale,
  },
});

// Client-side only code
if (typeof window !== 'undefined') {
  // Function to get the locale from the URL path
  const getLocaleFromPath = () => {
    const pathName = window.location.pathname;
    const segments = pathName.split("/").filter((segment) => segment.length > 0);
    
    // If the first segment is "en", then use "en"
    // Otherwise, for root path or any non-locale-prefixed path, use "ar"
    return segments.length > 0 && segments[0] === "en" 
      ? "en" 
      : "ar";
  };

  // Set locale header based on current path
  axiosInstance.defaults.headers["X-localization"] = getLocaleFromPath();
  
  // Set token if available
  const token = localStorage.getItem("token");
  if (token) {
    axiosInstance.defaults.headers.Authorization = token;
  }

  // Add request interceptor to update headers on each request
  axiosInstance.interceptors.request.use(function (config) {
    // Update locale on each request in case it changed
    config.headers["X-localization"] = getLocaleFromPath();
    
    // Update token on each request in case it changed
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });
}

export default axiosInstance;
