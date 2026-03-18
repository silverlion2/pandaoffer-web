"use client";

import { useAuth } from '@/components/providers/AuthProvider';
import Navbar from '@/components/layout/Navbar';
import { Loader2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const { user, profile, loading } = useAuth();

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

  const isAdmin = profile?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-center px-4">
          <div>
            <ShieldAlert size={48} className="text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
            <p className="text-slate-500 mb-6">You don&apos;t have admin privileges.</p>
            <Link href="/" className="text-emerald-600 hover:underline font-semibold">
              ← Go back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {children}
      </div>
    </div>
  );
}
