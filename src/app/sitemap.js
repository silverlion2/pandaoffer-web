import { postsDB } from '@/data/blog';

export default function sitemap() {
  const baseUrl = 'https://www.pandaoffer.top';

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic routes (Blog Posts)
  const blogRoutes = Object.keys(postsDB).map((slug) => {
    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(postsDB[slug].date),
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...blogRoutes];
}
