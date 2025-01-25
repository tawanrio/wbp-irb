/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clientes.agenciawbp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'irbauto.com.br',
        port: '',
        pathname: '/**',
      },
    ],
  },
  i18n: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
  },
  async redirects() {
    return [
      {
        source: '/en/blog',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
