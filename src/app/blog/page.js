import React from 'react';
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import Navbar from '@/components/layout/Navbar';

export default function BlogHome() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto p-8 w-full mt-4">
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">PandaOffer Blog</h1>
        <p className="text-slate-500 mb-10">Expert guides, scholarship tips, and living survival hacks in China.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, idx) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={idx} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all block group"
            >
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded">
                {post.category}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-4 group-hover:text-emerald-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-emerald-500 font-medium text-sm mt-6 flex items-center gap-1">
                Read Article <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}