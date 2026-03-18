"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { User, ShoppingBag, BookMarked, History, AlertCircle, Loader2 } from 'lucide-react';

const sidebarLinks = [
  { name: 'Profile', href: '/account', icon: User },
  { name: 'Purchases', href: '/account/purchases', icon: ShoppingBag },
  { name: 'Saved Universities', href: '/account/saved', icon: BookMarked },
  { name: 'History', href: '/account/history', icon: History },
];

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-emerald-500" />
        </div>
      </div>
    );
  }

  const isVerified = user?.email_confirmed_at != null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />

      {/* Email Verification Banner */}
      {user && !isVerified && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
          <div className="max-w-5xl mx-auto flex items-center gap-3">
            <AlertCircle size={18} className="text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800">
              <strong>Verify your email</strong> to save universities, chat history, and match results.
              Check your inbox for a verification link.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-56 shrink-0">
            <nav className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-b border-slate-100 last:border-b-0 ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <link.icon size={18} className={isActive ? 'text-emerald-500' : 'text-slate-400'} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
