import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            P
          </div>
          <span className="font-extrabold text-xl tracking-tight">PandaOffer</span>
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-1.5 cursor-not-allowed group" title="Working on this exciting feature!">
          <span className="text-sm font-medium text-slate-400">Universities</span>
          <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">Soon</span>
        </div>
        <Link href="/tools" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">
          Tools <span className="hidden md:inline">& Calculators</span>
        </Link>
        <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-emerald-600 hidden md:block">
          Blog & Guides
        </Link>
        <div className="hidden md:flex items-center gap-1.5 cursor-not-allowed group" title="Compiling data for you!">
          <span className="text-sm font-medium text-slate-400">Scholarships</span>
          <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">Soon</span>
        </div>
        
        <a 
          href={siteConfig.links.discord} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Join our Discord Community"
          className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
        >
          <MessageSquare size={16} />
          <span className="hidden sm:inline">Join Discord</span>
        </a>
      </div>
    </nav>
  );
}
