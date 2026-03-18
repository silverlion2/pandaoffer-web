"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Menu, X, User, LogOut, BookMarked, History, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/components/providers/AuthProvider';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, profile, loading, signOut } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Universities', href: '/universities' },
    { name: 'Tools & Calculators', href: '/tools' },
    { name: 'Blog & Guides', href: '/blog' },
    { name: 'Scholarships', href: '/scholarships' },
  ];

  const accountLinks = [
    { name: 'My Profile', href: '/account', icon: User },
    { name: 'Saved Universities', href: '/account/saved', icon: BookMarked },
    { name: 'History', href: '/account/history', icon: History },
  ];

  // Get user initials for avatar
  const getInitial = () => {
    if (profile?.user_profiles?.first_name) {
      return profile.user_profiles.first_name[0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 relative">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" onClick={() => { setIsMobileMenuOpen(false); setIsProfileMenuOpen(false); }} aria-label="PandaOffer — Home">
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

          {/* Auth Section - Desktop */}
          {!loading && (
            <>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {getInitial()}
                    </div>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {profile?.user_profiles?.first_name 
                              ? `${profile.user_profiles.first_name} ${profile.user_profiles.last_name || ''}`.trim()
                              : user.email}
                          </p>
                          <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        </div>
                        {accountLinks.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <link.icon size={16} className="text-slate-400" />
                            {link.name}
                          </Link>
                        ))}
                        <div className="border-t border-slate-100">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Auth */}
          {!loading && user && (
            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
            >
              {getInitial()}
            </Link>
          )}
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg p-4 flex flex-col gap-2">
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
          
          {/* Mobile Auth Links */}
          {!loading && (
            <>
              {user ? (
                <>
                  <div className="border-t border-slate-100 mt-2 pt-2">
                    {accountLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <link.icon size={18} className="text-slate-400" />
                        {link.name}
                      </Link>
                    ))}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-slate-100 mt-2 pt-2">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white text-center rounded-lg text-base font-bold transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
}
