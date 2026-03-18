"use client";

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function SaveUniversityButton({ universityName }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (user) checkSaved();
  }, [user]);

  const checkSaved = async () => {
    const { data } = await supabase
      .from('saved_universities')
      .select('id')
      .eq('user_id', user.id)
      .eq('university_name', universityName)
      .maybeSingle();
    setSaved(!!data);
  };

  const toggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Sign in to save universities.', {
        action: { label: 'Sign In', onClick: () => window.location.href = '/auth/login' },
      });
      return;
    }

    const isVerified = user?.email_confirmed_at != null;
    if (!isVerified) {
      toast.error('Verify your email to save universities.');
      return;
    }

    setLoading(true);
    try {
      if (saved) {
        await supabase
          .from('saved_universities')
          .delete()
          .eq('user_id', user.id)
          .eq('university_name', universityName);
        setSaved(false);
        toast.success(`${universityName} removed from saved.`);
      } else {
        await supabase
          .from('saved_universities')
          .insert({ user_id: user.id, university_name: universityName });
        setSaved(true);
        toast.success(`${universityName} saved!`);
      }
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleSave}
      disabled={loading}
      className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm transition-all ${
        saved
          ? 'bg-red-500 text-white shadow-lg'
          : 'bg-white/20 text-white hover:bg-white/40'
      }`}
      title={saved ? 'Remove from saved' : 'Save university'}
    >
      <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
    </button>
  );
}
