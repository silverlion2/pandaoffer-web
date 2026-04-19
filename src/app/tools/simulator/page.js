import React from 'react';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
  title: 'Study in China Simulator | PandaOffer',
  description: 'Experience what it is like to study in China through our interactive life simulator.',
};

export default function SimulatorPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <main className="flex-1 w-full bg-slate-900 border-t border-slate-800">
        <iframe 
          src="/tools/simulator/index.html"
          className="w-full h-full border-0"
          title="Study in China Simulator"
          allowFullScreen
        ></iframe>
      </main>
    </div>
  );
}
