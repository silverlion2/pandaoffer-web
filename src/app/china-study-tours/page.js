import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  Bot,
  BriefcaseMedical,
  CalendarDays,
  CheckCircle2,
  CircuitBoard,
  ClipboardCheck,
  Download,
  FileText,
  GraduationCap,
  LineChart,
  Mail,
  Route,
  ShieldCheck,
  Share2,
  Users,
} from 'lucide-react';
import {
  availabilityWindows,
  fitBoardSignals,
  contentPillars,
  pricingAnchors,
  proposalExclusions,
  proposalIncludes,
  productLineup,
  bookingPath,
  sampleRouteFlow,
  routeFlowVisuals,
  studyTourBrochures,
  studyTourEmail,
  studyTourShareLinks,
  tripFacts,
  trustItems,
} from '@/data/studyTours';

const studyTourMailHref = `mailto:${studyTourEmail}?subject=${encodeURIComponent('China Study Tour Program')}&body=${encodeURIComponent(
  'Group size:\nAge/professional profile:\nPreferred dates:\nTarget cities:\nLearning theme:\nBudget level:\nPrimary visit interests:\n',
)}`;

export const metadata = {
  title: 'China Study Tours: AI, Healthcare & School',
  description:
    'Compare focused China study tour routes for schools, MBA groups, healthcare teams, AI and tech cohorts, plus PDF brochures, host approval, pricing anchors, and quote planning.',
  keywords: [
    'China study tour',
    'China school study tour',
    'China healthcare study tour',
    'China AI company visit',
    'China tech company visit',
    'China university visit',
    'MBA China study tour',
    'EMBA China study tour',
  ],
  alternates: {
    canonical: 'https://www.pandaoffer.top/china-study-tours',
    languages: {
      'x-default': 'https://www.pandaoffer.top/china-study-tours',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'China Study Tours: AI, Healthcare & School | PandaOffer',
    description:
      'A focused hub for PandaOffer China study tour routes: school, healthcare, AI, tech, MBA innovation, and partner operations.',
    url: 'https://www.pandaoffer.top/china-study-tours',
    siteName: 'PandaOffer',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/study-tours/ai-tech-company-study-tour.jpg',
        width: 1600,
        height: 900,
        alt: 'China AI, technology, healthcare and campus study tour routes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'China Study Tours: AI, Healthcare & School',
    description:
      'Compare focused China study tour routes with brochures, pricing anchors, trust details, and quote planning.',
    images: ['/images/study-tours/ai-tech-company-study-tour.jpg'],
    site: '@pandaoffer',
    creator: '@pandaoffer',
  },
};

const productIcons = [GraduationCap, BriefcaseMedical, Bot, CircuitBoard, LineChart, Users];

export default function ChinaStudyToursPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'China Study Tour Programs',
              provider: {
                '@type': 'Organization',
                name: 'PandaOffer',
                url: 'https://www.pandaoffer.top',
              },
              areaServed: 'China',
              serviceType: 'Study tour planning and education travel support',
              description:
                'China study tour route comparison for school, healthcare, AI, tech, MBA, and partner groups.',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'China Study Tour Route Catalog',
                itemListElement: productLineup.map((product) => ({
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: product.title },
                  description: product.offer,
                  url: `https://www.pandaoffer.top${product.href}`,
                })),
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.pandaoffer.top' },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'China Study Tours',
                  item: 'https://www.pandaoffer.top/china-study-tours',
                },
              ],
            },
          ]),
        }}
      />

      <main className="flex-grow">
        <section className="relative min-h-[560px] overflow-hidden bg-slate-950 text-white">
          <Image
            src="/tools/simulator/images/simulator/hub_bg.png"
            alt="Warm campus study space prepared for China study tour planning"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/75" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.98),rgba(15,23,42,0.78),rgba(15,23,42,0.38))]" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold text-emerald-100 mb-6">
                <Route size={16} />
                Route hub for schools, agencies, families, and professional groups
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight font-heading mb-6">
                China Study Tour Programs
              </h1>
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mb-8">
                Compare the route family here, then open the focused page for the route you actually need: school and university preview, healthcare, AI company visits, tech company visits, MBA innovation, or partner operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={studyTourMailHref}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-950/30"
                >
                  Plan a Study Tour <Mail size={18} />
                </a>
                <Link
                  href="#product-system"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
                >
                  Compare Routes <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            {tripFacts.map((item) => (
              <article key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{item.label}</div>
                <h2 className="text-base font-extrabold text-slate-900 leading-snug">{item.value}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <nav className="bg-white border-b border-slate-200" aria-label="Study tour page sections">
          <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap gap-3">
            {[
              ['#product-system', 'Route marketplace'],
              ['#route-flow', 'Route flow'],
              ['#availability-fit', 'Dates and fit'],
              ['#pricing', 'Pricing + included'],
              ['#trust', 'Trust'],
              ['#content-system', 'Decision materials'],
              ['#brochures', 'Brochures'],
              ['#request-route', 'Request route concept'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {label}
                <ArrowRight size={14} />
              </a>
            ))}
          </div>
        </nav>

        <section id="product-system" className="max-w-5xl mx-auto px-6 py-16 scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-600 mb-2">Route Marketplace</p>
              <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                Compare by fit, access, outcome, and operating risk
              </h2>
            </div>
            <p className="text-slate-500 lg:max-w-md">
              This hub stays intentionally short. Open a route page for the detailed sample routes, visit modules, quote builder, and brochure context.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {productLineup.map((product, index) => {
              const Icon = productIcons[index] || Route;

              return (
                <Link
                  key={product.title}
                  href={product.href}
                  className="group block overflow-hidden bg-white border border-slate-200 rounded-lg shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                  <figure className="relative aspect-[16/9] overflow-hidden bg-slate-200">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 512px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.78))]" />
                    <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-md bg-white/92 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700 shadow-sm">
                      {product.priority}
                    </div>
                    <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-2">
                      <span className="rounded-md bg-white px-3 py-2 text-sm font-extrabold text-slate-950 shadow-sm">
                        {product.price}
                      </span>
                      <span className="rounded-md border border-white/25 bg-slate-950/70 px-3 py-2 text-xs font-bold text-white backdrop-blur">
                        {product.duration}
                      </span>
                    </div>
                  </figure>

                  <div className="p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Icon size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-extrabold text-slate-900 transition-colors group-hover:text-emerald-700">
                          {product.title}
                        </h3>
                        <p className="text-sm font-semibold text-slate-500 mt-1">{product.audience}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 mb-5">{product.offer}</p>

                    <dl className="divide-y divide-slate-100 border-y border-slate-100 mb-5">
                      {[
                        ['Buyer fit', product.buyerFit],
                        ['Access level', product.accessLevel],
                        ['Learning output', product.learningOutput],
                        ['Primary access', product.primaryAccess],
                        ['Backup plan', product.backupPlan],
                      ].map(([label, value]) => (
                        <div key={label} className="grid grid-cols-1 sm:grid-cols-[128px_1fr] gap-1 sm:gap-4 py-3">
                          <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</dt>
                          <dd className="text-sm leading-relaxed text-slate-600">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                      Compare route
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="route-flow" className="bg-white border-y border-slate-200 scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-amber-600 mb-2">Sample Route Flow</p>
                <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                  Show the trip rhythm before asking for a quote
                </h2>
              </div>
              <p className="text-slate-500 lg:max-w-md">
                Every focused route page has its own modules. The shared operating rhythm stays the same.
              </p>
            </div>

            <div className="mb-8 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="p-5 md:p-6 text-white">
                  <p className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-2">
                    Visual itinerary board
                  </p>
                  <h3 className="text-2xl font-extrabold font-heading mb-3">
                    See the route before reading the details
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    A custom China route should feel tangible: arrival context, access days, and final debrief all need a visible place in the product story.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  {routeFlowVisuals.map((item) => (
                    <figure key={item.title} className="relative min-h-[180px] overflow-hidden border-t border-white/10 sm:border-l sm:border-t-0">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, 320px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.78))]" />
                      <figcaption className="absolute inset-x-4 bottom-4">
                        <span className="inline-flex rounded-md bg-white/90 px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-900">
                          {item.label}
                        </span>
                        <p className="mt-2 text-sm font-bold leading-snug text-white">{item.title}</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
              <div className="space-y-4">
                {sampleRouteFlow.map((step) => (
                  <article key={step.title} className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full border border-amber-200 bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                        <Route size={18} />
                      </div>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                          <h3 className="font-extrabold text-slate-900">{step.title}</h3>
                          <span className="text-xs font-bold text-amber-700 bg-amber-50 rounded-full px-3 py-1 w-fit">
                            {step.timing}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600">{step.detail}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="bg-slate-950 text-white rounded-lg p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wider text-emerald-300 mb-2">Booking Path</p>
                <h3 className="text-2xl font-extrabold font-heading mb-5">
                  How a custom route gets confirmed
                </h3>
                <ul className="space-y-4">
                  {bookingPath.map((step) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={15} className="text-emerald-300" />
                      </span>
                      <div>
                        <h4 className="font-bold text-white">{step.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-slate-300">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <a
                  href={studyTourMailHref}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
                >
                  Request availability <Mail size={17} />
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section id="availability-fit" className="bg-slate-100 border-b border-slate-200 scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-emerald-600 mb-2">Dates and fit</p>
                <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                  Make availability feel concrete before the price conversation
                </h2>
              </div>
              <p className="text-slate-500 lg:max-w-md">
                Use these windows as planning lanes. Final date availability depends on route theme, group size, city count, and host approval.
              </p>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
                <aside className="bg-slate-950 p-6 md:p-7 text-white">
                  <div className="inline-flex items-center gap-2 rounded-md border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-200">
                    <CalendarDays size={14} />
                    Live planning board
                  </div>
                  <h3 className="mt-5 text-3xl font-extrabold font-heading leading-tight">
                    Open for private quote
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Send dates, group size, profile, learning goal, and budget level. PandaOffer returns route assumptions, primary/backup visit options, and quote logic.
                  </p>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                    {[
                      ['12-32', 'student group range'],
                      ['8-28', 'professional cohort range'],
                      ['2-6 weeks', 'host outreach lead time'],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                        <div className="text-2xl font-extrabold text-white">{value}</div>
                        <div className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">{label}</div>
                      </div>
                    ))}
                  </div>
                </aside>

                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-slate-400">Availability windows</p>
                      <h3 className="text-xl font-extrabold text-slate-900">Choose a realistic departure lane</h3>
                    </div>
                    <Route size={24} className="text-emerald-600 shrink-0" />
                  </div>

                  <div className="space-y-3">
                    {availabilityWindows.map((item) => (
                      <article
                        key={item.window}
                        data-testid="availability-window"
                        className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                              Planning window
                            </div>
                            <h4 className="text-lg font-extrabold text-slate-900">{item.window}</h4>
                          </div>
                          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
                            <CheckCircle2 size={14} />
                            {item.status}
                          </span>
                        </div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_150px] gap-3">
                          <div>
                            <p className="text-sm font-bold text-slate-900">{item.route}</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.signal}</p>
                          </div>
                          <div className="rounded-md border border-slate-200 bg-white p-3">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                              <Users size={14} />
                              Capacity
                            </div>
                            <div className="mt-1 text-sm font-extrabold text-slate-900">{item.capacity}</div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
              {fitBoardSignals.map((item) => (
                <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">{item.title}</p>
                  <h3 className="text-lg font-extrabold text-slate-900">{item.value}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.detail}</p>
                </article>
              ))}
            </div>

            <a
              href={studyTourMailHref}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
            >
              Request these dates <Mail size={17} />
            </a>
          </div>
        </section>

        <section id="pricing" className="max-w-5xl mx-auto px-6 py-16 scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-amber-600 mb-2">Pricing + Scope</p>
              <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                Start with route anchors, then quote the actual group
              </h2>
            </div>
            <p className="text-slate-500 lg:max-w-md">
              These anchors keep budget conversations realistic while leaving room for city count, season, hotels, host fees, and supervision model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {pricingAnchors.map((item) => (
              <article key={item.title} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <p className="text-sm font-bold text-slate-500 mb-2">{item.title}</p>
                <p className="text-2xl font-extrabold text-slate-900 mb-3">{item.price}</p>
                <p className="text-sm leading-relaxed text-slate-500">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <article className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4">What is included</h3>
              <ul className="space-y-3">
                {proposalIncludes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4">Not automatically included</h3>
              <ul className="space-y-3">
                {proposalExclusions.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                    <ShieldCheck size={16} className="text-slate-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="trust" className="bg-white border-y border-slate-200 scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-emerald-600 mb-2">Trust and Operations</p>
                <h2 className="text-3xl font-extrabold text-slate-900 font-heading">What is confirmed before deposit</h2>
              </div>
              <p className="text-slate-500 lg:max-w-md">
                The strongest route is the one with clear assumptions, host approval status, and backup learning formats.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trustItems.map((item) => (
                <article key={item.title} className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={18} className="text-emerald-600" />
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-500">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="content-system" className="max-w-5xl mx-auto px-6 py-16 scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 mb-2">Decision Materials</p>
              <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                Use the right page for the right buyer
              </h2>
            </div>
            <p className="text-slate-500 lg:max-w-md">
              This page is the route index. Focused pages carry the detailed route story for faculty, parents, sponsors, and professional cohorts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {contentPillars.map((pillar) => (
              <Link
                key={pillar.title}
                href={pillar.primaryLink}
                className="group block rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                <h3 className="text-xl font-extrabold text-slate-900 transition-colors group-hover:text-indigo-700">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{pillar.purpose}</p>
                <ul className="mt-5 space-y-2.5">
                  {pillar.assets.map((asset) => (
                    <li key={asset} className="flex gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={15} className="text-indigo-500 shrink-0 mt-0.5" />
                      <span>{asset}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-700">
                  {pillar.cta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="brochures" className="bg-white border-b border-slate-200 scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-sky-600 mb-2">Download Brochures</p>
                <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                  Three original PDFs for partner review
                </h2>
              </div>
              <p className="text-slate-500 lg:max-w-md">
                Share the AI/Tech, Healthcare, or School Study Tour brochure with faculty, parents, agencies, or sponsors before the first planning call.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {studyTourBrochures.map((brochure) => (
                <a
                  key={brochure.href}
                  href={brochure.href}
                  download
                  className="group block border border-slate-200 rounded-lg p-6 bg-slate-50 transition-all hover:-translate-y-1 hover:border-sky-300 hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                    <FileText size={22} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 transition-colors group-hover:text-sky-700">
                    {brochure.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mb-3">{brochure.audience}</p>
                  <p className="text-sm leading-relaxed text-slate-500 mb-5">{brochure.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-sky-700">
                    Download PDF
                    <Download size={16} className="transition-transform group-hover:translate-y-0.5" />
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold">
                    <Share2 size={18} className="text-sky-600" />
                    Share this study tour hub
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    Use these share links for LinkedIn groups, school partner chats, parent communities, and agency outreach.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {studyTourShareLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-700"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="request-route" className="bg-slate-900 text-white scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <p className="text-sm font-bold uppercase tracking-wider text-emerald-300 mb-2">For Schools, Agencies, and Families</p>
                <h2 className="text-3xl font-extrabold font-heading mb-4">
                  Send us the group profile. We will return a practical route concept.
                </h2>
                <p className="text-slate-300 leading-relaxed max-w-2xl">
                  Include preferred dates, group size, age range, cities of interest, learning theme, budget level, and whether the group needs campus visits, healthcare industry visits, AI companies, tech companies, or a future degree-study pathway.
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href={studyTourMailHref}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
                >
                  Request a Route Concept <Mail size={18} />
                </a>
                <Link
                  href="/china-school-study-tour"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
                >
                  School Study Tour <ArrowRight size={18} />
                </Link>
                <Link
                  href="/china-healthcare-study-tour"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
                >
                  Healthcare Study Tour <ArrowRight size={18} />
                </Link>
                <Link
                  href="/blog/china-study-tours-healthcare-ai-tech-company-visits"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
                >
                  Read Route Guide <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 px-4 py-4">
                <ShieldCheck className="text-emerald-300 shrink-0" size={22} />
                Safety-first routing
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 px-4 py-4">
                <Users className="text-emerald-300 shrink-0" size={22} />
                Group-ready supervision
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 px-4 py-4">
                <ClipboardCheck className="text-emerald-300 shrink-0" size={22} />
                Custom dates and duration
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
