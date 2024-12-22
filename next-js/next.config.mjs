/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storage.googleapis.com", "leflaneuramsterdam.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/leflaneur_bucket/**", // Match signed Google Storage URLs
      },
      {
        protocol: "https",
        hostname: "leflaneuramsterdam.com",
        pathname: "/static/book_images/**", // Nginx-proxied static paths
      },
    ],
  },
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
