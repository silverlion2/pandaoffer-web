export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth/', '/api/'],
      },
    ],
    sitemap: 'https://www.pandaoffer.top/sitemap.xml',
  };
}
