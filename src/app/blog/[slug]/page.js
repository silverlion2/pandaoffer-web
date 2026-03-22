import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getPostData, getAllPostSlugs, getSortedPostsData } from '@/lib/markdown';
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
    const description = post.description || `Read ${post.title} — expert advice for international students studying in China.`;

    return {
      title,
      description,
      alternates: {
        canonical: `https://www.pandaoffer.top/blog/${slug}`,
      },
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
  let relatedPosts = [];
  
  try {
    post = await getPostData(slug);
    const allPosts = getSortedPostsData();
    
    // Internal Linking Engine: Find 3 related posts based on tags and category
    const otherPosts = allPosts.filter(p => p.slug !== slug);
    
    relatedPosts = otherPosts.map(p => {
      let score = 0;
      if (p.category === post.category) score += 2;
      const commonTags = (p.tags || []).filter(t => (post.tags || []).includes(t));
      score += commonTags.length * 3;
      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
    .slice(0, 3);
    
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

        {/* Inline AI Advisor Callout */}
        <div className="mb-10 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-2xl">🧠</span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-bold text-slate-900 text-lg mb-1">Got specific questions?</h4>
            <p className="text-slate-600 text-sm">Ask our AI Study Advisor directly. Safe, instant answers based on 500+ official university sources.</p>
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
            <Link href="/tools/advisor" className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg text-sm">
              Ask AI Advisor &rarr;
            </Link>
          </div>
        </div>

        <div className="prose prose-lg prose-emerald max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:text-slate-800 prose-h2:mt-10 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-loose prose-a:text-emerald-600 hover:prose-a:text-emerald-700 prose-strong:text-slate-900" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        {/* Internal Linking Engine: Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 font-heading">Keep Reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all hover:-translate-y-1">
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded inline-block mb-3">
                    {rp.category}
                  </span>
                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                    {rp.title}
                  </h4>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-3 max-h-10 overflow-hidden">{rp.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA to AI Advisor */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Don't search for answers in the dark.</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">
              Get instant, verified answers to all your study abroad questions. Our AI Study Advisor is trained on the latest admission policies, scholarship rules, and visa regulations.
            </p>
            <Link href="/tools/advisor" className="inline-block bg-violet-600 hover:bg-violet-700 border border-violet-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg">
              Chat with AI Advisor for Free &rarr;
            </Link>
          </div>
        </div>

      </article>
    </div>
  );
}