"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/providers/AuthProvider';
import { toast } from 'sonner';
import { Users, UserPlus, BookMarked, MailCheck, Search, Shield, Loader2, ChevronDown, Package, Eye } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, newSignups: 0, activeLeads: 0, totalSaved: 0 });
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [usersRes, leadsRes, productsRes, savedRes] = await Promise.all([
      supabase.from('users').select('*, user_profiles(*)').order('created_at', { ascending: false }),
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('saved_universities').select('id', { count: 'exact', head: true }),
    ]);

    const allUsers = usersRes.data || [];
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const newSignups = allUsers.filter(u => new Date(u.created_at) > sevenDaysAgo).length;

    setUsers(allUsers);
    setLeads(leadsRes.data || []);
    setProducts(productsRes.data || []);
    setStats({
      totalUsers: allUsers.length,
      newSignups,
      activeLeads: (leadsRes.data || []).length,
      totalSaved: savedRes.count || 0,
    });
    setLoading(false);
  };

  const updateUserRole = async (userId, newRole) => {
    const { error } = await supabase
      .from('users')
      .update({ role: newRole })
      .eq('id', userId);
    if (error) {
      toast.error('Failed to update role.');
    } else {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success(`Role updated to ${newRole}.`);
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', leadId);
    if (error) {
      toast.error('Failed to update lead.');
    } else {
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      toast.success('Lead status updated.');
    }
  };

  const filteredUsers = users.filter(u =>
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.user_profiles?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.user_profiles?.last_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-600 bg-blue-100' },
    { label: 'New Signups (7d)', value: stats.newSignups, icon: UserPlus, color: 'text-emerald-600 bg-emerald-100' },
    { label: 'Active Leads', value: stats.activeLeads, icon: MailCheck, color: 'text-violet-600 bg-violet-100' },
    { label: 'Saved Universities', value: stats.totalSaved, icon: BookMarked, color: 'text-amber-600 bg-amber-100' },
  ];

  const tabs = [
    { id: 'users', label: 'Users', count: users.length },
    { id: 'leads', label: 'Leads', count: leads.length },
    { id: 'products', label: 'Products', count: products.length },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-heading">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Manage users, leads, and products.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'text-emerald-700 border-emerald-500 bg-white'
                : 'text-slate-500 border-transparent hover:text-slate-700'
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by email or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white"
            />
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Nationality</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Role</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-700 font-medium">{u.email}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {u.user_profiles?.first_name
                          ? `${u.user_profiles.first_name} ${u.user_profiles.last_name || ''}`.trim()
                          : '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {u.user_profiles?.nationality || '—'}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={u.role}
                          onChange={(e) => updateUserRole(u.id, e.target.value)}
                          className={`text-xs font-bold px-2 py-1 rounded-lg border cursor-pointer ${
                            u.role === 'admin'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">
                        {new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No users found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Leads Tab */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700 font-medium">{lead.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        lead.status === 'contacted' ? 'bg-emerald-100 text-emerald-700'
                        : lead.status === 'new' ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-600'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      {lead.status === 'new' && (
                        <button
                          onClick={() => updateLeadStatus(lead.id, 'contacted')}
                          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                          Mark Contacted
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-400">No leads yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Price</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Entitlement</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Active</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700 font-medium">{product.name}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold bg-violet-50 text-violet-700 px-2 py-1 rounded-full">
                        {product.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-semibold">${product.price}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs font-mono">{product.entitlement_key}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        product.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No products configured.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
