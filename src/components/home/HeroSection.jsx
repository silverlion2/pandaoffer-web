import AiMatcherForm from './AiMatcherForm';

export default function HeroSection() {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-200">
          Your Journey Starts Here 🇨🇳
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mt-4">
          Zero BS. Just Your <span className="text-emerald-500">Best Fit</span> in China.
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
          Stop guessing. Get instant, AI-driven insights on university matching, <strong className="text-slate-700">WHO/NMC certification</strong>, and your real <strong className="text-slate-700">CSC Scholarship</strong> probability.
        </p>
      </div>
      
      <AiMatcherForm />
    </div>
  );
}
