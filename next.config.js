/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}
