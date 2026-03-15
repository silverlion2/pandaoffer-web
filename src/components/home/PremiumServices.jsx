import { CheckCircle } from 'lucide-react';

export default function PremiumServices() {
  return (
    <div className="mt-20 pt-16 border-t border-slate-200">
      <div className="text-center mb-12">
        <span className="bg-blue-100 text-blue-800 text-sm font-bold px-4 py-1.5 rounded-full border border-blue-200">
          Premium Services
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 mt-4 font-heading">Serious about your future in China?</h2>
        <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
          Let our former admission officers and verified alumni guide you step-by-step. Get guaranteed results or your money back.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Service 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
          <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">1v1 Strategy Call</h3>
          <div className="text-3xl font-extrabold text-slate-900 mb-4">$49<span className="text-sm text-slate-500 font-normal"> / 45 mins</span></div>
          <ul className="space-y-3 mb-8 text-sm text-slate-600">
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Profile evaluation & weakness fixing</li>
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Medical certification (WHO/NMC) advice</li>
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Q&A with real alumni</li>
          </ul>
          <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl transition-colors">
            Book a Session
          </button>
        </div>

        {/* Service 2 - Highlighting this one */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative transform md:-translate-y-4 hover:shadow-emerald-500/20 transition-shadow duration-300">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Most Popular
          </div>
          <h3 className="text-xl font-bold text-white mb-2 font-heading">CSC Scholarship Pro</h3>
          <div className="text-3xl font-extrabold text-white mb-4">$299<span className="text-sm text-slate-400 font-normal"> / one-time</span></div>
          <ul className="space-y-3 mb-8 text-sm text-slate-300">
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" /> Everything in Strategy Call</li>
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" /> Statement of Purpose (SOP) rewrite</li>
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" /> Recommendation letter templates</li>
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" /> Direct professor contact list</li>
          </ul>
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
            Get Full Scholarship
          </button>
        </div>

        {/* Service 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">Done-For-You</h3>
          <div className="text-3xl font-extrabold text-slate-900 mb-4">$899+<span className="text-sm text-slate-500 font-normal"> / package</span></div>
          <ul className="space-y-3 mb-8 text-sm text-slate-600">
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> We handle the ENTIRE application</li>
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Guaranteed admission or 100% refund</li>
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Visa processing assistance</li>
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Airport pickup & dorm booking</li>
          </ul>
          <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
