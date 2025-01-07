
/** @type {import('next').NextConfig} */
const nextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wbnrjcpywhmxymiyafjg.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/authors/**',
        search: '',
      },
    ],
  },
  // experimental: {
  //   webpackBuildWorker: true,
  //   parallelServerBuildTraces: true,
  //   parallelServerCompiles: true,
  // },
}

export default nextConfig