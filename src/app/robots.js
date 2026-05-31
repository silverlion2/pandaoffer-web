export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account/', '/admin/', '/auth/', '/api/'],
      },
    ],
    sitemap: 'https://www.pandaoffer.top/sitemap.xml',
  };
}
