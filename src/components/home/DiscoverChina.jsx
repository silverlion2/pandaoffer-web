import Link from 'next/link';
import { BookOpen, Coffee, Globe2 } from 'lucide-react';

export default function DiscoverChina() {
  return (
    <div id="discover" className="pt-8 border-t border-slate-200 mt-12">
      <div className="w-full bg-slate-100 h-24 flex flex-col items-center justify-center text-slate-400 text-sm rounded-xl mb-12 border border-slate-200 border-dashed relative group overflow-hidden">
        <span className="font-bold text-slate-500">Sponsored Advertisement Area</span>
        <span className="text-xs">e.g., Alipay, Trip.com, VPN Services, Student Insurances</span>
        <div className="absolute top-2 right-2 bg-slate-200 text-[10px] px-2 py-0.5 rounded text-slate-500 uppercase">Ad</div>
      </div>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading">Discover China</h2>
          <p className="text-slate-500 mt-2">Everything you need to know before you pack your bags.</p>
        </div>
        <Link href="/blog" className="text-emerald-600 font-bold hover:underline hidden md:block">
          View all guides &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/blog/csc-scholarship-guide-2026" className="group cursor-pointer block">
          <div className="h-48 bg-slate-200 rounded-2xl mb-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-slate-800 flex items-center justify-center transition-transform group-hover:scale-105">
               <BookOpen size={48} className="text-white opacity-50" />
            </div>
            <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
              Study 101
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
            The Ultimate CSC Scholarship Guide (2026)
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2">
            Step-by-step tutorial on how to apply for the Chinese Government Scholarship, covering tuition, accommodation, and monthly stipends.
          </p>
        </Link>

        <Link href="/blog" className="group cursor-pointer block">
          <div className="h-48 bg-slate-200 rounded-2xl mb-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center transition-transform group-hover:scale-105">
               <Coffee size={48} className="text-white opacity-50" />
            </div>
            <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
              Lifestyle
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
            Cashless Survival: Alipay & WeChat Pay
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2">
            China is virtually cashless. Here is how international students can link their foreign credit cards to pay for everything from high-speed trains to street food.
          </p>
        </Link>

        <Link href="/blog" className="group cursor-pointer block">
          <div className="h-48 bg-slate-200 rounded-2xl mb-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-teal-900 flex items-center justify-center transition-transform group-hover:scale-105">
               <Globe2 size={48} className="text-white opacity-50" />
            </div>
            <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
              City Guides
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
            Beijing vs. Hangzhou: Where to Study?
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2">
            Comparing the cultural heart of China with the Silicon Valley of the East. Cost of living, tech vibes, and university options explained.
          </p>
        </Link>
      </div>
    </div>
  );
}
