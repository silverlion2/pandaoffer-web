import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function PremiumServices() {
  return (
    <div className="mt-20 pt-16 border-t border-slate-200">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500 rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-10"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Sparkles size={14} />
            Premium Services
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 font-heading">
            Serious about your future in China?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Let our former admission officers and verified alumni guide you step-by-step. From strategy calls to full done-for-you packages.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
          >
            View Plans & Pricing <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
