"use client";
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BlogHome() {
  // 这里的 slug 必须和你在 [slug]/page.js 数据库里写的键名一模一样！
  const posts = [
    { 
      title: "The Ultimate CSC Scholarship Guide 2026", 
      category: "Study 101",
      slug: "csc-scholarship-guide-2026"
    },
    { 
      title: "Top Medical Universities in China Recognized by WHO & NMC", 
      category: "Admission",
      slug: "mbbs-in-china-who-recognized"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* 返回主页的链接 */}
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:underline">
          <ArrowLeft size={16} /> Back to PandaOffer
        </Link>
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">PandaOffer Blog</h1>
        <p className="text-slate-500 mb-10">Expert guides, scholarship tips, and living survival hacks in China.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, idx) => (
            // 这里的 Link 组件会自动拼接出对应的文章网址
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