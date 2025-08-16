import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// API configuration - should match utils/config.js
const API_CONFIG = {
  development: {
    baseUrl: "https://api-dev.hakeem.com.sa",
    frontendUrl: "https://dev.hakeem.com.sa",
  },
  production: {
    baseUrl: "https://api.hakeem.com.sa",
    frontendUrl: "https://hakeem.com.sa",
  },
};

const currentConfig = false ? API_CONFIG.production : API_CONFIG.development;

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: false,
  images: {
    domains: [currentConfig.baseUrl.replace('https://', '')],
  },

  rewrites: () => [
    {
      source: "/backend/:path*",
      destination: `${currentConfig.baseUrl}/:path*`,
    },
  ],
  
  // Add headers for .well-known files and CORS
  async headers() {
    return [
      {
        source: '/.well-known/assetlinks.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
      // Add CORS headers for API routes
      {
        source: '/backend/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: currentConfig.frontendUrl,
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
