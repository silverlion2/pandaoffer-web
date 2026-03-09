import React from 'react';
import { ArrowLeft } from 'lucide-react';

// 本地静态数据库 (MVP 阶段极其好用，之后有了 Supabase 再换)
// 您以后每天用 DeepSeek 写的新文章，直接按这种格式粘贴在下面即可！
const postsDB = {
  "csc-scholarship-guide-2026": {
    title: "The Ultimate CSC Scholarship Guide 2026",
    category: "Study 101",
    date: "Mar 10, 2026",
    author: "PandaOffer Team",
    content: `
      <h2>What is the CSC Scholarship?</h2>
      <p>The Chinese Government Scholarship (CSC) is a fully funded scholarship program set up by the Ministry of Education of China to support international students.</p>
      
      <h2>What Does It Cover?</h2>
      <ul>
        <li>Full tuition waiver</li>
        <li>Free on-campus accommodation</li>
        <li>Comprehensive medical insurance</li>
        <li>Monthly stipend (up to 3500 RMB for Master's/Ph.D.)</li>
      </ul>

      <h2>How to Apply?</h2>
      <p>The application period usually opens in December and closes in April. You need to prepare your transcripts, a strong study plan, and two recommendation letters.</p>
    `
  },
  "mbbs-in-china-who-recognized": {
    title: "Top Medical Universities in China Recognized by WHO & NMC",
    category: "Admission",
    date: "Mar 11, 2026",
    author: "Dr. Panda",
    content: `
      <h2>Why Study MBBS in China?</h2>
      <p>China has become the top destination for international medical students, especially from South Asia and Africa, due to its world-class infrastructure and affordable tuition fees.</p>
      
      <h2>Top 3 Universities for Indian Students</h2>
      <p><strong>1. Zhejiang University (ZJU)</strong> - Part of the prestigious C9 League. Fully approved by NMC and WHO.</p>
      <p><strong>2. Huazhong University of Science and Technology (HUST)</strong> - Located in Wuhan, known for its excellent clinical exposure.</p>
      <p><strong>3. Dalian Medical University</strong> - Offers a highly internationalized campus and great coastal living experience.</p>

      <h2>Important Warning</h2>
      <p>Always double-check the latest NMC Gazette before paying any application fees. Do not trust local agents blindly!</p>
    `
  }
};

// Next.js 自动生成网页头部 SEO 信息 (极其重要！帮您白嫖 Google 搜索流量)
export async function generateMetadata({ params }) {
  const post = postsDB[params.slug];
  if (!post) return { title: 'Post Not Found | PandaOffer' };
  
  return {
    title: `${post.title} | PandaOffer Blog`,
    // 自动把 HTML 标签过滤掉，取前 150 个字作为 Google 搜索展示的简介
    description: post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
  };
}

export default function BlogPost({ params }) {
  const { slug } = params;
  const post = postsDB[slug];

  // 找不到文章时的 404 页面
  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Article not found 🐼</h1>
        <p className="text-slate-500 mb-8">The post you are looking for does not exist or has been moved.</p>
        <a href="/blog" className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-600 transition-all">
          Go back to Blog
        </a>
      </div>
    );
  }

  // 正常的文章渲染页面
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <article className="max-w-3xl mx-auto px-6 py-16">
        
        {/* 返回按钮 */}
        <a href="/blog" className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-10 hover:underline transition-all">
          <ArrowLeft size={16} /> Back to Articles
        </a>
        
        {/* 文章头部 (标题、日期、作者) */}
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
                {post.author[0]}
              </div>
              By {post.author}
            </span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </header>

        {/* 文章正文 (使用 dangerouslySetInnerHTML 来渲染我们在数据库里存的 HTML 标签，并加上了手写 Tailwind 版式防止样式错乱) */}
        <div 
          className="prose-headings:font-bold prose-h2:text-2xl prose-h2:text-slate-800 prose-h2:mt-10 prose-h2:mb-4 prose-p:text-lg prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-emerald-600 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:text-lg prose-li:text-slate-600 prose-li:mb-2 prose-strong:text-slate-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* 底部高转化率 CTA (Call to Action) 模块 - 强行将阅读博客的流量导回主页的测算漏斗 */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Want to know your exact admission chances?</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">
              Use our free AI calculator to cross-reference your GPA with 50+ top Chinese universities in 2 seconds. No BS, just data.
            </p>
            <a href="/" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg">
              Try AI Matching for Free &rarr;
            </a>
          </div>
        </div>

      </article>
    </div>
  );
}