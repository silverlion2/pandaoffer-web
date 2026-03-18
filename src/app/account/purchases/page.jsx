"use client";

import { MessageSquare, Construction } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function PurchasesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-heading">My Purchases</h1>
        <p className="text-sm text-slate-500 mt-1">View your purchase history and service status.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
          <Construction size={32} className="text-amber-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">🚧 Coming Soon!</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          We&apos;re building our payment system to make purchasing services seamless. 
          For now, contact us directly via Discord to book strategy calls, scholarship packages, or full application services.
        </p>
        <a
          href={siteConfig.links.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-sm hover:shadow-md"
        >
          <MessageSquare size={18} />
          Contact Us on Discord
        </a>
      </div>
    </div>
  );
}
