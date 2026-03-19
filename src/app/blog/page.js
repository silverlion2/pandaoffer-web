import React from 'react';
import { getSortedPostsData } from '@/lib/markdown';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogGrid from '@/components/home/BlogGrid';

export const metadata = {
  title: 'Blog & Guides — Study in China Tips & Scholarships',
  description: 'Expert guides on CSC Scholarships, MBBS in China, student visas, cost of living, and survival tips for international students planning to study in China.',
  openGraph: {
    title: 'Blog & Guides — Study in China Tips & Scholarships',
    description: 'Expert guides on CSC Scholarships, MBBS in China, student visas, cost of living, and survival tips for international students planning to study in China.',
    url: 'https://www.pandaoffer.top/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pandaoffer.top/blog',
  },
};

export default function BlogHome() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto p-8 w-full mt-4">
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">PandaOffer Blog</h1>
        <p className="text-slate-500 mb-8">Expert guides, scholarship tips, and living survival hacks — organized by your journey stage.</p>
        
        <BlogGrid posts={posts} />
      </div>
      <Footer />
    </div>
  );
}