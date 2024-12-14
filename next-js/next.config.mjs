/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["bookstorestatic.s3.eu-north-1.amazonaws.com"],
  },
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
