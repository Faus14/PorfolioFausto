const path = require('path')
 
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  
  // ✅ Optimización de imágenes mejorada
  images: {
    formats: ['image/avif', 'image/webp'], // Formatos modernos primero
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 año
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
    ],
  },
  
  // ✅ Configuración para mejor performance
  reactStrictMode: true,
  // swcMinify está habilitado por defecto en Next.js 15+
  
  // ✅ Compresión y optimización
  compress: true,
  poweredByHeader: false, // Seguridad básica
  
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }
}