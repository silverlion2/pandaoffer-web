export default function manifest() {
  return {
    name: 'PandaOffer',
    short_name: 'PandaOffer',
    description: 'Zero BS. Just Your Best Fit in China. AI-driven university matching, WHO/NMC certification, and CSC Scholarship guidance.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10b981',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
