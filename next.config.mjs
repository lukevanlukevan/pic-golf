/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all domains (use specific domains in production, e.g., 'example.com')
      },
      {
        protocol: "http",
        hostname: "**", // Allow all domains for HTTP (useful for local testing)
      },
    ],
  },
};

export default nextConfig;
