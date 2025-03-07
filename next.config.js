const path = require('path')
 
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
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
  // Configuración para manejar mejor la hidratación
  reactStrictMode: true,
  // Ayuda a prevenir problemas comunes relacionados con extensiones del navegador
  experimental: {
    // Configuración para mejor manejo de errores de hidratación
    optimizeCss: true,
    scrollRestoration: true,
  }
}