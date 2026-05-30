import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bot, BriefcaseMedical, CalendarDays, GraduationCap, Mail } from 'lucide-react';

const proofPoints = [
  { label: 'Campus visits', icon: GraduationCap },
  { label: 'Healthcare routes', icon: BriefcaseMedical },
  { label: 'AI/Tech companies', icon: Bot },
  { label: '0.5-14 day routes', icon: CalendarDays },
];

export default function StudyTourLead() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl">
      <Image
        src="/tools/simulator/images/simulator/hub_bg.png"
        alt="Campus study space for China study tour planning"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 1024px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/76" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.98),rgba(15,23,42,0.82),rgba(15,23,42,0.48))]" />

      <div className="relative z-10 px-6 py-9 md:px-10 md:py-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-sm font-bold text-emerald-100 mb-6">
            China Study Tours
          </div>
          <h1 className="text-3xl md:text-6xl font-extrabold leading-tight tracking-tight font-heading mb-5">
            China study tours built for real learning.
          </h1>
          <p className="text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl mb-8">
            Short-term China immersion for schools, families, agencies, student groups, and professional delegations: campuses, healthcare, AI companies, tech companies, culture, and safety operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link
              href="/china-study-tours"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors shadow-lg"
            >
              View Study Tour Plans <ArrowRight size={18} />
            </Link>
            <a
              href="mailto:hello@pandaoffer.top?subject=China%20Study%20Tour%20Program"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
            >
              Request Custom Route <Mail size={18} />
            </a>
          </div>

          <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-3">
            {proofPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.label} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-3 text-sm font-semibold text-slate-100">
                  <Icon size={17} className="text-emerald-300 shrink-0" />
                  {point.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
