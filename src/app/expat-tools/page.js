import Link from 'next/link';
import { ShieldAlert, Stethoscope, Home, CreditCard, Smartphone, Car, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

export const metadata = {
  title: 'Expat Survival Tools & Guides | PandaOffer',
  description: 'Essential tools and guides for international students living in China: VPNs, renting, banking, and medical.',
};

const TOOLS = [
  {
    title: 'Medical Translation Cards',
    desc: 'Show these to doctors at public hospitals for common ailments.',
    icon: <Stethoscope size={24} />,
    color: 'text-rose-600',
    bg: 'bg-rose-100',
    link: '/blog/first-30-days-china-survival',
  },
  {
    title: 'Apartment Renting Checklist',
    desc: 'Avoid scams. Step-by-step guide to signing a Chinese lease (Ziroom vs Local).',
    icon: <Home size={24} />,
    color: 'text-indigo-600',
    bg: 'bg-indigo-100',
    link: '/blog/cost-of-living-china-2026',
  },
  {
    title: 'Banking & Payment Setup',
    desc: 'How to link a foreign or Chinese card to WeChat Pay and Alipay.',
    icon: <CreditCard size={24} />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100',
    link: '/blog/cashless-survival-alipay-wechat',
  },
  {
    title: 'Digital Survival & VPNs',
    desc: 'The best tools for accessing banned services and local internet navigation.',
    icon: <ShieldAlert size={24} />,
    color: 'text-amber-600',
    bg: 'bg-amber-100',
    link: '/blog/wechat-vpn-digital-survival-guide',
  },
  {
    title: 'Police Registration Guide',
    desc: 'Accommodation registration required within 24hrs of arrival — step-by-step.',
    icon: <FileText size={24} />,
    color: 'text-slate-600',
    bg: 'bg-slate-200',
    link: '/blog/first-30-days-china-survival',
  },
  {
    title: 'E-Bike & Transport Rules',
    desc: 'License requirements for electric scooters and Didi navigation.',
    icon: <Car size={24} />,
    color: 'text-sky-600',
    bg: 'bg-sky-100',
    link: '/blog/cost-of-living-china-2026',
  }
];

export default function ExpatTools() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans">
      <div className="max-w-5xl mx-auto px-4 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm text-indigo-600">
            <Smartphone size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Survival <span className="text-indigo-600">Tools</span>
          </h1>
          <p className="text-lg text-slate-500">
            China operates on a completely different digital and bureaucratic ecosystem. Use these tools to navigate daily life without the headache.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool, idx) => (
            <Link 
              href={tool.link} 
              key={idx}
              className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all block relative"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tool.bg} ${tool.color}`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                {tool.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {tool.desc}
              </p>
              
              <div className="flex items-center text-sm font-bold text-indigo-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                Use Tool <ChevronRight size={16} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Promotion Banner */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden mt-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Lost in Translation?</h2>
            <p className="text-indigo-200 max-w-2xl mx-auto text-lg">
              Our AI Assistant is trained on all of China's local regulations, from signing housing contracts to opening a local bank account.
            </p>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg">
              Ask AI Assistant
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
