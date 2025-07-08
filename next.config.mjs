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
      destination: isProd
        ? "https://api.hakeem.com.sa/:path*"
        : "https://api-dev.hakeem.com.sa/:path*",
    },
  ],
};

export default withNextIntl(nextConfig);
