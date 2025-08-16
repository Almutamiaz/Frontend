import axios from 'axios';
import config from './config';

/**
 * Fetch CSRF token from the appropriate API server based on environment
 * This ensures the CSRF token is fetched from the same domain that will be used for API calls
 */
export const fetchCSRFToken = async (retryCount = 0) => {
  try {
    // Use the centralized configuration
    const apiBaseUrl = config.apiBaseUrl;
    
    console.log(`Fetching CSRF token from: ${apiBaseUrl}/sanctum/csrf-cookie`);
    
    // Fetch CSRF token directly from the API server
    const response = await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    
    console.log("CSRF response received:", response.status);
    
    // Set the CSRF token in the meta tag for axios interceptors to use
    if (typeof document !== 'undefined') {
      const metaTag = document.querySelector('meta[name="csrf-token"]');
      if (metaTag) {
        // Extract the token from cookies or response headers
        const cookies = document.cookie.split(';');
        const csrfCookie = cookies.find(cookie => 
          cookie.trim().startsWith(`${config.csrf.cookieName}=`)
        );
        if (csrfCookie) {
          const token = decodeURIComponent(csrfCookie.split('=')[1]);
          metaTag.setAttribute('content', token);
          console.log("CSRF token set in meta tag:", token.substring(0, 10) + "...");
        } else {
          console.warn("CSRF cookie not found in cookies");
        }
      }
    }
    
    return response;
  } catch (error) {
    console.error("CSRF Token fetch error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      retryCount,
    });
    
    // Retry once if it's a network error or 5xx server error
    if (retryCount < 1 && (!error.response || error.response.status >= 500)) {
      console.log("Retrying CSRF token fetch...");
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      return fetchCSRFToken(retryCount + 1);
    }
    
    throw error;
  }
};

/**
 * Get the appropriate API base URL based on environment
 */
export const getApiBaseUrl = () => {
  return config.apiBaseUrl;
};

/**
 * Clear CSRF token from meta tag and cookies
 */
export const clearCSRFToken = () => {
  if (typeof document !== 'undefined') {
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    if (metaTag) {
      metaTag.setAttribute('content', '');
    }
    
    // Clear the CSRF cookie
    document.cookie = `${config.csrf.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};
