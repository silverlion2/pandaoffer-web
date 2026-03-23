import { Phone, ShieldAlert, Heart, Building2, Globe2 } from 'lucide-react';

const CONTACTS = [
  {
    label: 'Police',
    number: '110',
    icon: <ShieldAlert size={18} />,
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100',
  },
  {
    label: 'Ambulance',
    number: '120',
    icon: <Heart size={18} />,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },
  {
    label: 'Fire',
    number: '119',
    icon: <Phone size={18} />,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
  {
    label: 'Foreigner Help',
    number: '12345',
    desc: 'Government hotline for foreigners (English)',
    icon: <Globe2 size={18} />,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    label: 'Mental Health',
    number: '400-161-9995',
    desc: 'Beijing Suicide Prevention (English)',
    icon: <Heart size={18} />,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    label: 'University PSB',
    number: 'Visit in person',
    desc: 'Public Security Bureau — visa & registration',
    icon: <Building2 size={18} />,
    color: 'text-slate-500',
    bg: 'bg-slate-50',
    border: 'border-slate-100',
  },
];

export default function EmergencyContacts() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
          <Phone size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Emergency Contacts</h3>
          <p className="text-xs text-slate-400">Save these numbers on day one.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {CONTACTS.map((c) => (
          <div
            key={c.label}
            className={`${c.bg} ${c.border} border rounded-xl p-4 flex flex-col gap-1`}
          >
            <div className={`${c.color} mb-1`}>{c.icon}</div>
            <span className="text-sm font-bold text-slate-800">{c.label}</span>
            <span className={`text-lg font-extrabold ${c.color}`}>{c.number}</span>
            {c.desc && (
              <span className="text-[10px] text-slate-400 leading-tight mt-0.5">{c.desc}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
