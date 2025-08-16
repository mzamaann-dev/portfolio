/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove hardcoded basePath and assetPrefix - they should be set via environment variables
  // or dynamically based on the repository name
}

module.exports = nextConfig
