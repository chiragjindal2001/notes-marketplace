/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Exclude system folders from being watched
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules',
        '**/.git',
        '**/.next',
        '**/System Volume Information',
        '**/pagefile.sys',
        '**/thumbs.db',
        '**/.DS_Store'
      ].filter(Boolean)
    };
    return config;
  },
}

export default nextConfig
