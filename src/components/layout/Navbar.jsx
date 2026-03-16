"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Menu, X } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Universities', href: '/universities' },
    { name: 'Tools & Calculators', href: '/tools' },
    { name: 'Blog & Guides', href: '/blog' },
    { name: 'Scholarships', href: '/scholarships' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 relative">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="font-extrabold text-xl tracking-tight hidden sm:block">PandaOffer</span>
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg font-bold' 
                    : 'text-slate-600 hover:text-emerald-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <a 
            href={siteConfig.links.discord} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Join our Discord Community"
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare size={16} />
            <span>Join Discord</span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center gap-4">
          <a 
            href={siteConfig.links.discord} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Join our Discord Community"
            className="text-[#5865F2] p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <MessageSquare size={20} />
          </a>
          <button 
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg p-4 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive 
                    ? 'text-emerald-700 bg-emerald-50 font-bold' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
