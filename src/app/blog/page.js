"use client";
import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BlogHome() {
  // 模拟的博客文章列表
  const posts = [
    { title: "The Ultimate CSC Scholarship Guide 2026", category: "Study 101" },
    { title: "Cashless Survival: Alipay & WeChat Pay in China", category: "Lifestyle" },
    { title: "Top Medical Universities recognized by WHO/NMC", category: "Admission" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <a href="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:underline">
        <ArrowLeft size={16} /> Back to PandaOffer
      </a>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">PandaOffer Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-all">
            <span className="text-xs font-bold text-slate-500 uppercase">{post.category}</span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">{post.title}</h2>
            <p className="text-emerald-500 font-medium text-sm mt-4">Read Article &rarr;</p>
          </div>
        ))}
      </div>
    </div>
  );
}