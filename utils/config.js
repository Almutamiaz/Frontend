/**
 * Environment configuration for the Hakeem application
 * This file centralizes all environment-specific settings
 */

const config = {
  // API Configuration
  api: {
    development: {
      baseUrl: "https://api-dev.hakeem.com.sa",
      frontendUrl: "https://dev.hakeem.com.sa",
    },
    production: {
      baseUrl: "https://api.hakeem.com.sa",
      frontendUrl: "https://hakeem.com.sa",
    },
  },
  
  // Get current environment
  get isProduction() {
    return process.env.NODE_ENV === "production";
  },
  
  // Get current API base URL
  get apiBaseUrl() {
    return this.isProduction 
      ? this.api.production.baseUrl 
      : this.api.development.baseUrl;
  },
  
  // Get current frontend URL
  get frontendUrl() {
    return this.isProduction 
      ? this.api.production.frontendUrl 
      : this.api.development.frontendUrl;
  },
  
  // CSRF Configuration
  csrf: {
    cookieName: "XSRF-TOKEN",
    headerName: "X-CSRF-TOKEN",
  },
};

export default config;
