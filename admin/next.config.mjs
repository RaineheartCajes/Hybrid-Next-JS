/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"], // Add other domains if your API is hosted elsewhere in production
    deviceSizes: [640, 768, 1024, 1280, 1600], // Example device sizes for responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Sizes for images used in components
  },
};

export default nextConfig;
