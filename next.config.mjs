import { ORIGINAL_BASE_URL } from "./src/constants.js";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: false,
  images: {
    domains: ["api-dev.hakeem.com.sa", "api.hakeem.com.sa"],
  },

  rewrites: () => [
    {
      source: "/backend/:path*",
      destination: ORIGINAL_BASE_URL,
    },
  ],
  
  // Add headers for .well-known files
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
    ];
  },
};

export default withNextIntl(nextConfig);
