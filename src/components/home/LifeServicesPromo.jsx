import Link from 'next/link';
import { ArrowRight, Sparkles, Users, Languages, Briefcase } from 'lucide-react';

export default function LifeServicesPromo() {
  return (
    <div className="mt-20 pt-16 border-t border-slate-200">
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-2xl">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500 rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-10"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Sparkles size={14} />
            Expat Services
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 font-heading">
            Need help settling in?
          </h2>
          <p className="text-slate-400 max-w-xl mb-10 leading-relaxed">
            From finding an apartment to opening a bank account, our local team of expat advisors can guide you through the trickiest parts of daily life in China.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <Users size={28} className="text-indigo-400 mx-auto mb-3" />
              <h4 className="font-bold text-white text-sm mb-1">WeChat Group Access</h4>
              <p className="text-xs text-slate-500">City-specific expat communities with 500+ active members.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <Languages size={28} className="text-purple-400 mx-auto mb-3" />
              <h4 className="font-bold text-white text-sm mb-1">Language Exchange</h4>
              <p className="text-xs text-slate-500">Get matched with Chinese students for language practice.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <Briefcase size={28} className="text-emerald-400 mx-auto mb-3" />
              <h4 className="font-bold text-white text-sm mb-1">Part-time Work Guide</h4>
              <p className="text-xs text-slate-500">Legal working hours, gig platforms, and internship tips.</p>
            </div>
          </div>

          <Link
            href="/community"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
          >
            Join the Community <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
