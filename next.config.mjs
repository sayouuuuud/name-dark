/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  crons: [
    {
      path: '/api/keep-alive',
      schedule: '0 9 * * *', // Every day at 9 AM UTC
    },
  ],
}

export default nextConfig
