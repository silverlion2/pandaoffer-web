export default function HeroHeader() {
  return (
    <div className="space-y-4 relative w-full flex flex-col items-center justify-center">
      {/* Background animated blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-400/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>
      
      <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-200 shadow-sm">
        Your Journey Starts Here 🇨🇳
      </span>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mt-4 font-heading">
        Stop Guessing. Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">True Match</span> in China.
      </h1>
      <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
        Stop guessing. Get instant, AI-driven insights on university matching, <strong className="text-slate-700">WHO/NMC certification</strong>, and your real <strong className="text-slate-700">CSC Scholarship</strong> probability.
      </p>
    </div>
  );
}
