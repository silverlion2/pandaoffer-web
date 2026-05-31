const studyCitySlugs = [
  'beijing',
  'changsha',
  'chengdu',
  'dalian',
  'guangzhou',
  'hangzhou',
  'harbin',
  'hefei',
  'nanjing',
  'shanghai',
  'tianjin',
  'wuhan',
  'xi-an',
  'xiamen',
];

const cityRedirects = studyCitySlugs.map((city) => ({
  source: `/study-in-${city}`,
  destination: `/study-in/${city}`,
  permanent: true,
}));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure consistent URLs by not adding trailing slashes
  trailingSlash: false,

  async redirects() {
    return cityRedirects;
  },

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
