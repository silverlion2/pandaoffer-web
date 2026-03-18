"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Save, Loader2, Mail, Shield, Calendar, KeyRound, Trash2 } from 'lucide-react';

const NATIONALITIES = [
  'Afghan', 'Albanian', 'Algerian', 'American', 'Angolan', 'Argentine', 'Armenian', 'Australian',
  'Azerbaijani', 'Bahraini', 'Bangladeshi', 'Belarusian', 'Belgian', 'Bolivian', 'Brazilian',
  'British', 'Bulgarian', 'Burkinabe', 'Burmese', 'Burundian', 'Cambodian', 'Cameroonian',
  'Canadian', 'Central African', 'Chadian', 'Chilean', 'Chinese', 'Colombian', 'Congolese',
  'Costa Rican', 'Croatian', 'Cuban', 'Czech', 'Danish', 'Dominican', 'Dutch', 'Ecuadorian',
  'Egyptian', 'Emirati', 'Eritrean', 'Estonian', 'Ethiopian', 'Fijian', 'Filipino', 'Finnish',
  'French', 'Gabonese', 'Gambian', 'Georgian', 'German', 'Ghanaian', 'Greek', 'Guatemalan',
  'Guinean', 'Haitian', 'Honduran', 'Hungarian', 'Icelandic', 'Indian', 'Indonesian', 'Iranian',
  'Iraqi', 'Irish', 'Israeli', 'Italian', 'Ivorian', 'Jamaican', 'Japanese', 'Jordanian',
  'Kazakh', 'Kenyan', 'Korean', 'Kuwaiti', 'Kyrgyz', 'Lao', 'Latvian', 'Lebanese', 'Liberian',
  'Libyan', 'Lithuanian', 'Malagasy', 'Malawian', 'Malaysian', 'Malian', 'Mauritanian', 'Mauritian',
  'Mexican', 'Moldovan', 'Mongolian', 'Moroccan', 'Mozambican', 'Namibian', 'Nepalese', 'New Zealander',
  'Nicaraguan', 'Nigerian', 'Norwegian', 'Omani', 'Pakistani', 'Palestinian', 'Panamanian',
  'Paraguayan', 'Peruvian', 'Polish', 'Portuguese', 'Qatari', 'Romanian', 'Russian', 'Rwandan',
  'Saudi', 'Senegalese', 'Serbian', 'Sierra Leonean', 'Singaporean', 'Slovak', 'Slovenian',
  'Somali', 'South African', 'Spanish', 'Sri Lankan', 'Sudanese', 'Swedish', 'Swiss', 'Syrian',
  'Tajik', 'Tanzanian', 'Thai', 'Togolese', 'Tunisian', 'Turkish', 'Turkmen', 'Ugandan',
  'Ukrainian', 'Uruguayan', 'Uzbek', 'Venezuelan', 'Vietnamese', 'Yemeni', 'Zambian', 'Zimbabwean',
  'Other',
];

export default function AccountProfilePage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const supabase = createClient();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    nationality: '',
    target_major: '',
    gpa_scale: 'percentage',
    gpa_value: '',
  });

  // Populate form from profile
  useEffect(() => {
    if (profile?.user_profiles) {
      const p = profile.user_profiles;
      setForm({
        first_name: p.first_name || '',
        last_name: p.last_name || '',
        nationality: p.nationality || '',
        target_major: p.target_major || '',
        gpa_scale: p.gpa_scale || 'percentage',
        gpa_value: p.gpa_value?.toString() || '',
      });
    }
  }, [profile]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    try {
      const profileData = {
        id: user.id,
        first_name: form.first_name || null,
        last_name: form.last_name || null,
        nationality: form.nationality,
        target_major: form.target_major,
        gpa_scale: form.gpa_scale,
        gpa_value: parseFloat(form.gpa_value) || 0,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('user_profiles')
        .upsert(profileData, { onConflict: 'id' });

      if (error) throw error;
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset email.');
    } finally {
      setResetLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      // Delete user data — cascading deletes will handle related tables
      const { error } = await supabase.from('users').delete().eq('id', user.id);
      if (error) throw error;
      
      await supabase.auth.signOut();
      toast.success('Account deleted. We\'re sorry to see you go.');
      window.location.href = '/';
    } catch (error) {
      toast.error(error.message || 'Failed to delete account.');
      setDeleteLoading(false);
    }
  };

  if (authLoading) return null;

  const isVerified = user?.email_confirmed_at != null;
  const memberSince = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-heading">My Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account information and preferences.</p>
      </div>

      {/* Account Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Account</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-slate-400" />
            <span className="text-sm text-slate-700">{user?.email}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isVerified 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-amber-100 text-amber-700'
            }`}>
              {isVerified ? 'Verified' : 'Unverified'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Shield size={16} className="text-slate-400" />
            <span className="text-sm text-slate-700">Role</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 capitalize">
              {profile?.role || 'user'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-sm text-slate-500">Member since {memberSince}</span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Profile Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">First Name</label>
            <input
              type="text"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              placeholder="Your first name"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Last Name</label>
            <input
              type="text"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              placeholder="Your last name"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-slate-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nationality</label>
          <select
            value={form.nationality}
            onChange={(e) => setForm({ ...form, nationality: e.target.value })}
            required
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-slate-50"
          >
            <option value="">Select nationality</option>
            {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Target Major</label>
          <input
            type="text"
            value={form.target_major}
            onChange={(e) => setForm({ ...form, target_major: e.target.value })}
            placeholder="e.g. Computer Science, Medicine (MBBS)"
            required
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-slate-50"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">GPA Scale</label>
            <select
              value={form.gpa_scale}
              onChange={(e) => setForm({ ...form, gpa_scale: e.target.value })}
              required
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-slate-50"
            >
              <option value="percentage">Percentage (0-100)</option>
              <option value="four">4.0 Scale</option>
              <option value="five">5.0 Scale</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">GPA Value</label>
            <input
              type="number"
              step="0.01"
              value={form.gpa_value}
              onChange={(e) => setForm({ ...form, gpa_value: e.target.value })}
              placeholder={form.gpa_scale === 'percentage' ? 'e.g. 85' : form.gpa_scale === 'four' ? 'e.g. 3.5' : 'e.g. 4.2'}
              required
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-slate-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      {/* Security Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Security</h2>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700">Change Password</p>
            <p className="text-xs text-slate-500">We&apos;ll send a reset link to your email.</p>
          </div>
          <button
            onClick={handlePasswordReset}
            disabled={resetLoading}
            className="bg-slate-100 hover:bg-slate-200 disabled:opacity-60 text-slate-700 font-semibold text-sm py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            {resetLoading ? <Loader2 size={14} className="animate-spin" /> : <KeyRound size={14} />}
            Reset Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-6 space-y-4">
        <h2 className="text-sm font-bold text-red-600 uppercase tracking-wide">Danger Zone</h2>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700">Delete Account</p>
            <p className="text-xs text-slate-500">Permanently delete your account and all associated data.</p>
          </div>
          {showDeleteConfirm ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-sm font-medium text-slate-500 hover:text-slate-700 px-3 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-bold text-sm py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                {deleteLoading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Confirm Delete
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 size={14} />
              Delete Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
