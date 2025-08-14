import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["api-dev.hakeem.com.sa"],
  },

  rewrites: () => [
    {
      source: "/backend/:path*",
      destination: false
        ? "https://api.hakeem.com.sa/:path*"
        : "https://api-dev.hakeem.com.sa/:path*",
    },
  ],
  // Add headers for .well-known files
  async headers() {
    return [
      {
        source: "/.well-known/assetlinks.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
        ],
      },
      {
        source: "/.well-known/apple-app-site-association",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
