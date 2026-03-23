import { MapPin, Briefcase, ShieldAlert, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LifeHeroHeader({ location, setLocation }) {
  const cities = ['All China', 'Shanghai', 'Beijing', 'Shenzhen', 'Guangzhou', 'Hangzhou', 'Chengdu'];
  
  return (
    <div className="space-y-8 relative w-full flex flex-col items-center justify-center pt-8">
      {/* Background animated blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-400/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <span className="bg-indigo-100 text-indigo-800 text-sm font-bold px-4 py-2 rounded-full border border-indigo-200 shadow-sm flex items-center gap-2">
          Post-Arrival & Career Hub 🚀
        </span>
        
        {/* City Selector */}
        <div className="relative group flex items-center bg-white border border-slate-300 rounded-full px-5 py-2 shadow-sm cursor-pointer hover:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-200 transition-all">
          <MapPin size={18} className="text-indigo-500 mr-2" />
          <span className="text-slate-500 text-sm font-medium mr-2">City:</span>
          <select 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="appearance-none bg-transparent outline-none text-slate-800 font-bold text-base cursor-pointer pr-4"
          >
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mt-6 text-center leading-tight">
        Master Your Life in <br className="hidden md:block"/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          {location === 'All China' ? 'China' : location}
        </span>.
      </h1>
      
      <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto text-center font-medium leading-relaxed">
        Connect with the local community, secure <strong className="text-slate-700">Z-Visa sponsored roles</strong>, and navigate daily survival without the headache.
      </p>

      {/* Quick Action Navigation Grid replacing the AiMatcher Form */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <Link href="/career" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Briefcase size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Expat Job Board</h3>
          <p className="text-sm text-slate-500">Find 200+ visa-approved roles.</p>
        </Link>

        <Link href="/community" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Local Network</h3>
          <p className="text-sm text-slate-500">WeChat groups & event mixers.</p>
        </Link>

        <Link href="/expat-tools" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShieldAlert size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Survival Tools</h3>
          <p className="text-sm text-slate-500">VPNs, Banking & Visa Docs.</p>
        </Link>
      </div>
      
    </div>
  );
}
