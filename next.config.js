/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
