/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['clientes.agenciawbp.com'],
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
