"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Plane, ClipboardCheck, Package, MapPin, GraduationCap } from 'lucide-react';

// Map blog categories to journey stages
const CATEGORY_TO_STAGE = {
  'Study 101': 'explore',
  'Admission': 'explore',
  'Compare': 'explore',
  'City Guides': 'explore',
  'Country Guide': 'apply',
  'Lifestyle': null, // split across arrive + thrive based on slug
};

// Slugs that belong to "Arrive" stage (rest of Lifestyle goes to "Thrive")
const ARRIVE_SLUGS = [
  'first-30-days-china-survival',
  'cashless-survival-alipay-wechat',
  'wechat-vpn-digital-survival-guide',
];

// Slugs that belong to "Prepare" stage
const PREPARE_SLUGS = [
  'china-student-visa-x1-x2-guide',
  'culture-shock-china-stages',
];

function getStage(post) {
  if (PREPARE_SLUGS.includes(post.slug)) return 'prepare';
  if (ARRIVE_SLUGS.includes(post.slug)) return 'arrive';
  
  const mapped = CATEGORY_TO_STAGE[post.category];
  if (mapped) return mapped;
  
  // Lifestyle posts not in ARRIVE_SLUGS → thrive
  if (post.category === 'Lifestyle') return 'thrive';
  
  return 'explore'; // fallback
}

const STAGES = [
  { id: 'all', label: 'All Guides', icon: null },
  { id: 'explore', label: '🔍 Explore', icon: Search, desc: 'Research universities, costs & scholarships' },
  { id: 'apply', label: '📝 Apply', icon: ClipboardCheck, desc: 'Documents, deadlines & country guides' },
  { id: 'prepare', label: '📦 Prepare', icon: Package, desc: 'Visa, packing & mental prep' },
  { id: 'arrive', label: '✈️ Arrive', icon: Plane, desc: 'First days, payments & digital setup' },
  { id: 'thrive', label: '🎓 Thrive', icon: GraduationCap, desc: 'Food, friends & campus life' },
];

export default function BlogGrid({ posts }) {
  const [activeStage, setActiveStage] = useState('all');
  const [activeTag, setActiveTag] = useState(null);

  // Filter by stage first
  const stagedPosts = activeStage === 'all' 
    ? posts 
    : posts.filter(post => getStage(post) === activeStage);

  // Extract unique tags for the currently visible staged posts
  const availableTags = Array.from(
    new Set(stagedPosts.flatMap(post => post.tags || []))
  ).sort();

  // Filter by tag if selected
  const filteredPosts = activeTag 
    ? stagedPosts.filter(post => post.tags?.includes(activeTag))
    : stagedPosts;

  const activeStageData = STAGES.find(s => s.id === activeStage);

  const handleStageClick = (stageId) => {
    setActiveStage(stageId);
    setActiveTag(null); // Reset tag when changing stage
  };

  const handleTagClick = (tag) => {
    setActiveTag(activeTag === tag ? null : tag); // Toggle tag
  };

  return (
    <>
      {/* Stage Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STAGES.map(stage => (
          <button
            key={stage.id}
            onClick={() => handleStageClick(stage.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeStage === stage.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            {stage.label}
          </button>
        ))}
      </div>

      {/* Stage description & Tags Row */}
      <div className="mb-8 empty:hidden">
        {activeStageData?.desc && (
          <p className="text-sm text-slate-500 mb-4">{activeStageData.desc}</p>
        )}
        
        {availableTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all border ${
                  activeTag === tag
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200 shadow-sm'
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post, idx) => {
          const stage = getStage(post);
          return (
            <Link 
              href={`/blog/${post.slug}`} 
              key={idx} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all block group flex flex-col h-full"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">
                  {STAGES.find(s => s.id === stage)?.label.replace(/^[^\p{L}\p{N}]*\s*/u, '')}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-sm text-slate-500 mt-2 line-clamp-2 flex-grow">{post.description}</p>
              )}
              
              {/* Post Tags Preview */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-4">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] font-medium text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              <p className="text-emerald-500 font-medium text-sm mt-5 pt-4 border-t border-slate-50 flex items-center gap-1">
                Read Article <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </p>
            </Link>
          );
        })}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg font-medium">No guides found for this filter.</p>
          <button 
            onClick={() => setActiveTag(null)}
            className="text-sm mt-2 text-emerald-500 hover:text-emerald-600 underline"
          >
            Clear tag filter
          </button>
        </div>
      )}

      {/* Count */}
      <p className="text-center text-xs text-slate-400 mt-8">
        {filteredPosts.length} of {posts.length} guides
      </p>
    </>
  );
}
