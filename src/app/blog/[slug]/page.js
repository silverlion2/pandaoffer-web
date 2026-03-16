import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getPostData, getAllPostSlugs } from '@/lib/markdown';
import Navbar from '@/components/layout/Navbar';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const post = await getPostData(slug);
    
    if (!post) return { title: 'Post Not Found | PandaOffer' };
    
    const title = `${post.title} | PandaOffer Blog`;
    // We can't easily strip HTML here without an extra package, so a simple summary could be from frontmatter 
    // or just a default string. Let's provide a basic one.
    const description = `Read ${post.title} on PandaOffer Blog`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://www.pandaoffer.top/blog/${slug}`,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        images: [
          {
            url: '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/og-image.jpg'],
      },
    };
  } catch (error) {
    return { title: 'Post Not Found | PandaOffer' };
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  let post;
  
  try {
    post = await getPostData(slug);
  } catch (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Article not found 🐼</h1>
        <p className="text-slate-500 mb-8">The post you are looking for does not exist or has been moved.</p>
        <Link href="/blog" className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-600 transition-all">
          Go back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": post.title,
              "image": [
                "https://www.pandaoffer.top/og-image.jpg"
              ],
              "datePublished": post.date,
              "author": [{
                "@type": "Person",
                "name": post.author,
                "url": "https://www.pandaoffer.top/blog"
              }]
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.pandaoffer.top"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": "https://www.pandaoffer.top/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": post.title,
                  "item": `https://www.pandaoffer.top/blog/${slug}`
                }
              ]
            }
          ])
        }}
      />
      
      <article className="max-w-3xl mx-auto px-6 py-16">
        
        <nav aria-label="Breadcrumb" className="mb-10 text-sm font-medium text-slate-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            </li>
            <li><span className="text-slate-300">/</span></li>
            <li>
              <Link href="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
            </li>
            <li><span className="text-slate-300">/</span></li>
            <li className="text-slate-900 truncate max-w-[200px] md:max-w-[400px]" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>
        
        <header className="mb-12">
          <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-wider border border-emerald-100">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-6 text-slate-500 font-medium">
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 text-sm font-bold">
                {post.author ? post.author[0] : 'U'}
              </div>
              By {post.author || 'Unknown'}
            </span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </header>

        <div className="prose prose-lg prose-emerald max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:text-slate-800 prose-h2:mt-10 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-loose prose-a:text-emerald-600 hover:prose-a:text-emerald-700 prose-strong:text-slate-900" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        <div className="mt-20 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Want to know your exact admission chances?</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">
              Use our free AI calculator to cross-reference your GPA with 50+ top Chinese universities in 2 seconds. No BS, just data.
            </p>
            <Link href="/" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg">
              Try AI Matching for Free &rarr;
            </Link>
          </div>
        </div>

      </article>
    </div>
  );
}