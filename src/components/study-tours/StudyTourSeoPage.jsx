import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StudyTourQuoteBuilder from '@/components/study-tours/StudyTourQuoteBuilder';
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Mail,
  MapPinned,
  Route,
  ShieldCheck,
  Share2,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  conversionPathway,
  pricingAnchors,
  routeBriefs,
  studyTourEmail,
  studyTourBrochures,
  trustItems,
} from '@/data/studyTours';

function withShareTracking(url) {
  const shareUrl = new URL(url);
  shareUrl.searchParams.set('utm_source', 'social');
  shareUrl.searchParams.set('utm_medium', 'share');
  shareUrl.searchParams.set('utm_campaign', 'study_tours');
  return shareUrl.toString();
}

const themeStyles = {
  emerald: {
    eyebrow: 'text-emerald-100 border-emerald-300/25 bg-emerald-300/10',
    accentText: 'text-emerald-600',
    accentBg: 'bg-emerald-50',
    accentSoft: 'bg-emerald-50 text-emerald-700',
    cta: 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-950/30',
    icon: 'text-emerald-500',
    darkIcon: 'text-emerald-300',
  },
  teal: {
    eyebrow: 'text-teal-200 border-teal-300/25 bg-teal-300/10',
    accentText: 'text-teal-600',
    accentBg: 'bg-teal-50',
    accentSoft: 'bg-teal-50 text-teal-700',
    cta: 'bg-teal-500 hover:bg-teal-600 shadow-teal-950/30',
    icon: 'text-teal-500',
    darkIcon: 'text-teal-300',
  },
  indigo: {
    eyebrow: 'text-indigo-200 border-indigo-300/25 bg-indigo-300/10',
    accentText: 'text-indigo-600',
    accentBg: 'bg-indigo-50',
    accentSoft: 'bg-indigo-50 text-indigo-700',
    cta: 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-950/30',
    icon: 'text-indigo-500',
    darkIcon: 'text-indigo-300',
  },
  sky: {
    eyebrow: 'text-sky-200 border-sky-300/25 bg-sky-300/10',
    accentText: 'text-sky-600',
    accentBg: 'bg-sky-50',
    accentSoft: 'bg-sky-50 text-sky-700',
    cta: 'bg-sky-500 hover:bg-sky-600 shadow-sky-950/30',
    icon: 'text-sky-500',
    darkIcon: 'text-sky-300',
  },
  amber: {
    eyebrow: 'text-amber-100 border-amber-300/25 bg-amber-300/10',
    accentText: 'text-amber-700',
    accentBg: 'bg-amber-50',
    accentSoft: 'bg-amber-50 text-amber-800',
    cta: 'bg-amber-500 hover:bg-amber-600 shadow-amber-950/30',
    icon: 'text-amber-500',
    darkIcon: 'text-amber-300',
  },
};

export default function StudyTourSeoPage({ page }) {
  const theme = themeStyles[page.theme] || themeStyles.indigo;
  const routeBrief = routeBriefs.find((item) => item.href === `/${page.slug}`) || routeBriefs[0];
  const brochure = studyTourBrochures.find((item) => item.href === page.brochureHref);
  const mailHref = `mailto:${studyTourEmail}?subject=${encodeURIComponent(page.title)}&body=${encodeURIComponent(
    'Group size:\nAge/professional profile:\nPreferred dates:\nTarget cities:\nLearning theme:\nBudget level:\nPrimary visit interests:\n',
  )}`;
  const shareText = `${page.title} by PandaOffer: ${page.description}`;
  const trackedShareUrl = withShareTracking(page.canonical);
  const shareLinks = [
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(trackedShareUrl)}`,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(trackedShareUrl)}`,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${page.title}: ${trackedShareUrl}`)}`,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(trackedShareUrl)}`,
    },
    {
      label: 'Telegram',
      href: `https://t.me/share/url?url=${encodeURIComponent(trackedShareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.title,
      provider: {
        '@type': 'Organization',
        name: 'PandaOffer',
        url: 'https://www.pandaoffer.top',
      },
      areaServed: 'China',
      serviceType: 'China study tour planning',
      description: page.description,
      audience: page.audience,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        description: page.price,
        availability: 'https://schema.org/LimitedAvailability',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      url: page.canonical,
      description: page.description,
      mainEntity: {
        '@type': 'Service',
        name: page.title,
        provider: {
          '@type': 'Organization',
          name: 'PandaOffer',
          url: 'https://www.pandaoffer.top',
        },
        areaServed: 'China',
        serviceType: 'China study tour planning',
      },
      ...(brochure
        ? {
            hasPart: {
              '@type': 'DigitalDocument',
              name: brochure.title,
              url: `https://www.pandaoffer.top${brochure.href}`,
              encodingFormat: 'application/pdf',
              description: brochure.description,
            },
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.pandaoffer.top' },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.title,
          item: page.canonical,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-grow">
        <section className="relative min-h-[560px] overflow-hidden bg-slate-950 text-white">
          <Image
            src={page.image}
            alt={page.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/74" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.96),rgba(15,23,42,0.78),rgba(15,23,42,0.38))]" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32">
            <div className="max-w-3xl">
              <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold mb-6 ${theme.eyebrow}`}>
                <Route size={16} />
                {page.label}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight font-heading mb-6">
                {page.title}
              </h1>
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mb-7">
                {page.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm font-bold">
                  {page.price}
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm font-bold">
                  {page.duration}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={mailHref}
                  className={`inline-flex items-center justify-center gap-2 text-white font-bold px-6 py-3.5 rounded-xl transition-colors shadow-lg ${theme.cta}`}
                >
                  Request a Quote <Mail size={18} />
                </a>
              <a
                href="#route-brief"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
              >
                View Route Brief <FileText size={18} />
              </a>
              {brochure ? (
                <a
                  href={brochure.href}
                  download
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
                >
                  Download PDF <Download size={18} />
                </a>
              ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            {page.heroBullets.map((item) => (
              <div key={item} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                <CheckCircle2 size={17} className={`${theme.icon} shrink-0 mt-0.5`} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div>
              <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${theme.accentText}`}>Route Scope</p>
              <h2 className="text-3xl font-extrabold text-slate-900 font-heading mb-4">
                Built around host approvals, not vague promises
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Company visit subject to host approval. Every proposal includes a primary visit plan and a backup plan so the route still works if a host changes availability, security rules, or dates.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {page.modules.map((module) => (
                <a
                  key={module.title}
                  href={mailHref}
                  className="group block bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  <div className={`w-10 h-10 rounded-xl ${theme.accentBg} ${theme.accentText} flex items-center justify-center mb-4`}>
                    <Sparkles size={20} />
                  </div>
                  <h3 className={`font-bold mb-2 ${theme.accentText}`}>
                    {module.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">{module.text}</p>
                  <span className={`mt-4 inline-flex items-center gap-2 text-sm font-bold ${theme.accentText}`}>
                    Discuss this module
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
              <div>
                <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${theme.accentText}`}>Sample Routes</p>
                <h2 className="text-3xl font-extrabold text-slate-900 font-heading">Primary and backup route designs</h2>
              </div>
              <p className="text-slate-500 lg:max-w-md">
                Use these as starting points. PandaOffer adjusts the route by group profile, date window, risk level, and learning outcome.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {page.sampleRoutes.map((route) => (
                <a
                  key={route.title}
                  href={mailHref}
                  className="group block bg-slate-50 border border-slate-200 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className={`text-xs font-bold rounded-full px-3 py-1 ${theme.accentSoft}`}>
                      {route.duration}
                    </span>
                    <MapPinned size={18} className={theme.icon} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${theme.accentText}`}>
                    {route.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">{route.cities}</p>
                  <p className="text-sm font-semibold text-slate-700 mb-4">{route.bestFor}</p>
                  <div className="space-y-3 mb-5">
                    <div className="rounded-xl bg-white border border-slate-200 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Primary</p>
                      <p className="text-sm leading-relaxed text-slate-600">{route.primary}</p>
                    </div>
                    <div className="rounded-xl bg-white border border-slate-200 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Backup</p>
                      <p className="text-sm leading-relaxed text-slate-600">{route.backup}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {route.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={15} className={`${theme.icon} shrink-0 mt-0.5`} />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                  <span className={`mt-5 inline-flex items-center gap-2 text-sm font-bold ${theme.accentText}`}>
                    Request this route
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-11 h-11 rounded-xl ${theme.accentBg} ${theme.accentText} flex items-center justify-center`}>
                  <Route size={22} />
                </div>
                <div>
                  <p className={`text-sm font-bold uppercase tracking-wider ${theme.accentText}`}>Primary</p>
                  <h2 className="text-xl font-extrabold text-slate-900">{page.visitOptions.title}</h2>
                </div>
              </div>
              <ul className="space-y-3">
                {page.visitOptions.primary.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                    <CheckCircle2 size={16} className={`${theme.icon} shrink-0 mt-0.5`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Backup</p>
                  <h2 className="text-xl font-extrabold text-slate-900">If host approval changes</h2>
                </div>
              </div>
              <ul className="space-y-3">
                {page.visitOptions.backup.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                    <CheckCircle2 size={16} className="text-slate-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${theme.darkIcon}`}>PandaOffer Difference</p>
                <h2 className="text-3xl font-extrabold font-heading mb-4">Study tour now, study-abroad pathway next</h2>
                <p className="text-slate-300 leading-relaxed">
                  Many providers stop at travel and visits. PandaOffer can continue the same family or student relationship into university matching, applications, CSC planning, and parent consultation.
                </p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {conversionPathway.map((item) => (
                  <article key={item.title} className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-300">{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${theme.accentText}`}>Pricing and Route Brief</p>
              <h2 className="text-3xl font-extrabold text-slate-900 font-heading mb-4">
                Start with a realistic anchor, then quote by group size
              </h2>
              <p className="text-slate-500 leading-relaxed">
                The exact quote changes with season, city count, hotels, host fees, interpreter needs, and supervision model.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pricingAnchors.map((item) => (
                <article key={item.title} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <p className="text-sm font-bold text-slate-500 mb-2">{item.title}</p>
                  <p className="text-2xl font-extrabold text-slate-900 mb-3">{item.price}</p>
                  <p className="text-xs leading-relaxed text-slate-500">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div id="route-brief" className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl ${theme.accentBg} ${theme.accentText} flex items-center justify-center shrink-0`}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">{routeBrief.title}</h3>
                  <p className="text-xs font-semibold text-slate-500 mb-2">{routeBrief.audience}</p>
                  <p className="text-sm leading-relaxed text-slate-500 max-w-2xl">{routeBrief.description}</p>
                </div>
              </div>
              <a
                href={mailHref}
                className={`inline-flex items-center justify-center gap-2 text-white font-bold px-5 py-3 rounded-xl transition-colors ${theme.cta}`}
              >
                Request Custom Version <Mail size={17} />
              </a>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-extrabold text-slate-900">
                  <Share2 size={18} className={theme.icon} />
                  Share this route page
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  Use this focused page for cohort planning, partner outreach, faculty review, and parent or sponsor conversations.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {shareLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold transition-colors hover:bg-white ${theme.accentText}`}
                  >
                    {link.label}
                  </a>
                ))}
                {brochure ? (
                  <a
                    href={brochure.href}
                    download
                    className={`inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold transition-colors hover:bg-white ${theme.accentText}`}
                  >
                    PDF <Download size={15} />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <StudyTourQuoteBuilder
          pageTitle={page.title}
          routeOptions={[
            ...page.modules.map((module) => module.title),
            ...page.sampleRoutes.map((route) => route.title),
          ]}
          accentTextClassName={theme.accentText}
          ctaClassName={theme.cta}
        />

        <section className="bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
              <div>
                <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${theme.accentText}`}>Trust and Operations</p>
                <h2 className="text-3xl font-extrabold text-slate-900 font-heading">What is confirmed before deposit</h2>
              </div>
              <p className="text-slate-500 lg:max-w-md">
                These details are part of the planning conversation for every group route.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trustItems.map((item) => (
                <article key={item.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={18} className={theme.icon} />
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-500">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="rounded-2xl bg-slate-950 text-white p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2">
                <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${theme.darkIcon}`}>Next Step</p>
                <h2 className="text-3xl font-extrabold font-heading mb-3">Send the group profile and constraints</h2>
                <p className="text-slate-300 leading-relaxed">
                  Include group size, dates, city preferences, age or professional profile, required learning outcomes, budget level, dietary needs, and whether university matching or application support should continue after the tour.
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href={mailHref}
                  className={`w-full inline-flex items-center justify-center gap-2 text-white font-bold px-6 py-3.5 rounded-xl transition-colors ${theme.cta}`}
                >
                  Request Route Concept <Mail size={18} />
                </a>
                <Link
                  href="/china-study-tours"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
                >
                  View All Study Tours <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
