import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["api-dev.hakeem.com.sa"],
  },
  rewrites: () => [
    {
      source: "/backend/:path*",
      destination: "https://api-dev.hakeem.com.sa/:path*",
    },
  ],
};

export default withNextIntl(nextConfig);
