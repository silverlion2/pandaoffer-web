import { PlayCircle, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function SocialProof() {
  return (
    <div className="mt-8 bg-slate-900 rounded-3xl p-8 text-center text-white relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-10"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-left gap-8">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 font-heading">Trusted by 10,000+ Students</h2>
          <p className="text-slate-400 text-sm">
            Watch vlogs, read reviews, and connect directly with international students from 120+ countries.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-white text-slate-900 font-bold px-6 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-sm flex items-center justify-center gap-2">
            <PlayCircle size={18} className="text-emerald-500" /> Watch Vlogs
          </button>
          <a 
            href={siteConfig.links.discord} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Ask questions on Discord"
            className="bg-slate-800 border border-slate-700 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <MessageSquare size={16} /> Ask on Discord
          </a>
        </div>
      </div>
    </div>
  );
}
