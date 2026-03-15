import { TrendingUp, Wifi, Plane, Smartphone } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function AffiliatesList() {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-orange-400" />
        <h3 className="text-xl font-bold">Student Deals</h3>
      </div>
      <p className="text-sm text-slate-400 mb-6">Essential tools for surviving in China with exclusive discounts.</p>
      
      <div className="space-y-4">
        <a 
          href={siteConfig.links.affiliates.expressVpn} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700 hover:border-emerald-500/50 group"
        >
          <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-emerald-500/20 mr-3">
            <Wifi size={20} className="text-slate-300 group-hover:text-emerald-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm text-slate-200">ExpressVPN</h4>
            <p className="text-xs text-slate-400">Works in China • 49% OFF</p>
          </div>
          <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Get</span>
        </a>

        <a 
          href={siteConfig.links.affiliates.trip} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700 hover:border-blue-500/50 group"
        >
          <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-blue-500/20 mr-3">
            <Plane size={20} className="text-slate-300 group-hover:text-blue-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm text-slate-200">Trip.com Flights</h4>
            <p className="text-xs text-slate-400">Student fares to PEK/PVG</p>
          </div>
          <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Book</span>
        </a>

        <a 
          href={siteConfig.links.affiliates.eSim} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700 hover:border-orange-500/50 group"
        >
          <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-orange-500/20 mr-3">
            <Smartphone size={20} className="text-slate-300 group-hover:text-orange-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm text-slate-200">China eSIM</h4>
            <p className="text-xs text-slate-400">Data upon landing • $5 credit</p>
          </div>
          <span className="text-xs font-bold bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Buy</span>
        </a>
      </div>
      <div className="text-center mt-6">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Affiliate Links Support Us</span>
      </div>
    </div>
  );
}
