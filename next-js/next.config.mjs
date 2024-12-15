/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["34.141.203.80"],
  },
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
