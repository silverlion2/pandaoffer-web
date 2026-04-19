/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure consistent URLs by not adding trailing slashes
  trailingSlash: false,

  async rewrites() {
    return [
      {
        source: '/tools/simulator',
        destination: '/tools/simulator/index.html',
      },
      {
        source: '/tools/simulator/',
        destination: '/tools/simulator/index.html',
      },
    ];
  },

  // Security and SEO headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

export default nextConfig;
