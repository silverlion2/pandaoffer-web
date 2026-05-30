import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  Bot,
  BriefcaseMedical,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircuitBoard,
  ClipboardCheck,
  Cpu,
  Factory,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Hospital,
  Languages,
  LineChart,
  Mail,
  MapPinned,
  Route,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';

export const metadata = {
  title: 'China Study Tour Programs: Campus, Healthcare, AI & Tech',
  description:
    'Custom China study tour programs for schools, agencies, families, and professional groups: university visits, Mandarin learning, healthcare, AI, tech companies, business, and safety support.',
  keywords: [
    'China study tour',
    'China healthcare study tour',
    'China AI company visit',
    'China tech company visit',
    'China university visit',
    'MBA China study tour',
    'EMBA China study tour',
  ],
  alternates: { canonical: 'https://www.pandaoffer.top/china-study-tours' },
  openGraph: {
    title: 'China Study Tour Programs: Campus, Healthcare, AI & Tech | PandaOffer',
    description:
      'Build a safe, practical China study tour with campus visits, healthcare industry visits, AI and tech company routes, academic workshops, and local logistics handled by PandaOffer.',
    url: 'https://www.pandaoffer.top/china-study-tours',
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
    title: 'China Study Tour Programs: Campus, Healthcare, AI & Tech',
    description:
      'Custom China study tours with campus visits, healthcare industry visits, AI companies, tech companies, and local logistics.',
    images: ['/images/study-tours/ai-tech-company-study-tour.jpg'],
  },
};

const programTracks = [
  {
    title: 'University Discovery',
    duration: '7-10 days',
    icon: Building2,
    accent: 'text-emerald-600',
    bg: 'bg-emerald-50',
    items: [
      'Campus visits at C9, 985, 211, and specialist universities',
      'Admissions briefing for bachelor, master, PhD, and language routes',
      'Student ambassador Q&A and dorm, canteen, library walkthroughs',
    ],
  },
  {
    title: 'Mandarin & Culture',
    duration: '10-14 days',
    icon: Languages,
    accent: 'text-amber-600',
    bg: 'bg-amber-50',
    items: [
      'Survival Chinese workshops with campus and city scenarios',
      'Calligraphy, tea, food market, high-speed rail, and museum modules',
      'Daily reflection sheets to turn travel into structured learning',
    ],
  },
  {
    title: 'Future China',
    duration: '7-12 days',
    icon: Sparkles,
    accent: 'text-sky-600',
    bg: 'bg-sky-50',
    items: [
      'AI, robotics, e-commerce, EV, and smart-city themed visits',
      'Company or incubator introductions where group profile allows',
      'Mini capstone: present a China market or technology insight',
    ],
  },
  {
    title: 'MBBS & Health Preview',
    duration: '7-10 days',
    icon: GraduationCap,
    accent: 'text-rose-600',
    bg: 'bg-rose-50',
    items: [
      'Medical university comparison and WHO/NMC recognition briefing',
      'Skills lab or campus hospital visit subject to host approval',
      'Parent-focused risk briefing on visas, costs, language, and safety',
    ],
  },
  {
    title: 'Healthcare Industry Study',
    duration: 'Half day-3 days',
    icon: BriefcaseMedical,
    accent: 'text-teal-600',
    bg: 'bg-teal-50',
    items: [
      'Doctor-led hospital department visit and expert Q&A',
      'Hospital operations, service flow, premium lobby, and international department walkthrough',
      'Biopharma, medical device, AI healthcare, genetic testing, or digital health company visits',
    ],
  },
  {
    title: 'AI & Tech Company Visits',
    duration: '1-3 days',
    icon: Bot,
    accent: 'text-indigo-600',
    bg: 'bg-indigo-50',
    items: [
      'AI application company, platform ecosystem, robotics, smart device, or digital economy visits',
      'Product demo, market positioning, business model, and China go-to-market discussion',
      'Optional investor, MBA/EMBA, or student innovation workshop with case review',
    ],
  },
];

const cityRoutes = [
  {
    title: 'Beijing Academic Route',
    cities: 'Beijing',
    idealFor: 'History, diplomacy, elite universities',
    highlights: ['Tsinghua/PKU-area campus day', 'Forbidden City seminar', 'Embassy and scholarship briefing'],
  },
  {
    title: 'Shanghai + Hangzhou Innovation Route',
    cities: 'Shanghai, Hangzhou',
    idealFor: 'Business, fintech, AI, modern China',
    highlights: ['Lujiazui business walk', 'University and startup visits', 'West Lake culture module'],
  },
  {
    title: 'Chengdu Culture + Campus Route',
    cities: 'Chengdu',
    idealFor: 'Culture, food systems, relaxed campus life',
    highlights: ['Sichuan university visits', 'Community culture tasks', 'Lower-cost student life comparison'],
  },
];

const healthcareModules = [
  {
    title: 'Hospital Operations',
    desc: 'Private hospitals, international departments, checkup centers, specialty chains, and patient service flow.',
    icon: Hospital,
  },
  {
    title: 'Doctor-Led Clinical Visit',
    desc: 'Department walkthroughs, doctor briefing, expert sharing, and structured Q&A for professional groups.',
    icon: Stethoscope,
  },
  {
    title: 'Medical Service Innovation',
    desc: 'Digital processes, patient experience, health management, and international patient services.',
    icon: HeartPulse,
  },
  {
    title: 'Biopharma & Devices',
    desc: 'Innovative drugs, medical devices, AI healthcare, genetic testing, and digital health companies.',
    icon: FlaskConical,
  },
  {
    title: 'Market Insight',
    desc: 'China healthcare market briefing, investment trends, management roundtable, and case review.',
    icon: LineChart,
  },
];

const healthcareRoutes = [
  {
    title: 'Half-Day Hospital Deep Visit',
    duration: '3-4 hours',
    cities: 'Shanghai, Beijing, Guangzhou, Shenzhen, Hangzhou, Xi\'an, Wuhan',
    bestFor: 'One institution, focused executive briefing',
    flow: [
      'Product positioning brief for the selected hospital or service institution',
      'Doctor-led department visit or international department walkthrough',
      'Service flow observation: reception, triage, checkup, billing, patient support',
      'Expert sharing and Q&A with hospital or department representatives',
    ],
  },
  {
    title: 'One-Day Healthcare Operations Route',
    duration: '1 day',
    cities: 'Shanghai, Beijing, Guangzhou, Shenzhen',
    bestFor: '2-3 institutions combined visit',
    flow: [
      'Morning: private hospital, premium lobby, or international department visit',
      'Midday: checkup center or specialty chain service model comparison',
      'Afternoon: hospital operations and patient experience workshop',
      'Closing: management roundtable and China healthcare market briefing',
    ],
  },
  {
    title: 'Shanghai + Hangzhou Digital Health Route',
    duration: '2 days',
    cities: 'Shanghai, Hangzhou',
    bestFor: 'Digital health, AI healthcare, service innovation',
    flow: [
      'Day 1 Shanghai: hospital operations, international patient services, premium care flow',
      'Day 1 evening: Lujiazui healthcare investment and market context briefing',
      'Day 2 Hangzhou: digital health, AI healthcare, or health management company visit',
      'Day 2 closing: product localization and service innovation case review',
    ],
  },
  {
    title: 'Guangzhou + Shenzhen MedTech Route',
    duration: '2-3 days',
    cities: 'Guangzhou, Shenzhen',
    bestFor: 'Medical devices, genetics, cross-border care',
    flow: [
      'Guangzhou: specialty chain or private hospital operations visit',
      'Shenzhen: medical device, genetic testing, AI healthcare, or digital health company visit',
      'Cross-border patient services and Greater Bay Area healthcare discussion',
      'Investor or MBA/EMBA roundtable on market entry and service positioning',
    ],
  },
  {
    title: 'Beijing Policy + Hospital Management Route',
    duration: '1-2 days',
    cities: 'Beijing',
    bestFor: 'Hospital managers, investors, policy-aware groups',
    flow: [
      'Hospital department or international service unit visit',
      'Briefing on public-private healthcare service positioning in China',
      'Management exchange on operations, staffing, patient trust, and service standards',
      'Market trend session with case review and group discussion',
    ],
  },
  {
    title: 'Xi\'an + Wuhan Central China Medical Ecosystem',
    duration: '2-3 days',
    cities: 'Xi\'an, Wuhan',
    bestFor: 'Regional healthcare systems and specialty development',
    flow: [
      'Regional hospital or specialty department visit',
      'Checkup center, specialty chain, or health management service observation',
      'Biopharma or medical device company visit where available',
      'Comparison workshop: first-tier vs central China healthcare operations',
    ],
  },
];

const techModules = [
  {
    title: 'AI Applications',
    desc: 'AI product demos, vertical use cases, model application strategy, and commercialization discussion.',
    icon: Bot,
  },
  {
    title: 'Digital Platforms',
    desc: 'E-commerce, local services, cross-border trade, fintech, logistics, and data-driven operations.',
    icon: CircuitBoard,
  },
  {
    title: 'Smart Hardware',
    desc: 'Robotics, IoT, smart devices, consumer electronics, EV supply chain, and manufacturing systems.',
    icon: Cpu,
  },
  {
    title: 'Industrial Tech',
    desc: 'Smart factories, automation, quality control, supplier networks, and industrial park briefings.',
    icon: Factory,
  },
];

const techRoutes = [
  {
    title: 'Shanghai AI + Enterprise Tech Route',
    duration: '1 day',
    cities: 'Shanghai',
    bestFor: 'MBA/EMBA, investors, tech students, corporate innovation teams',
    flow: [
      'Morning: AI application company or enterprise software product demo',
      'Midday: product positioning and China customer adoption briefing',
      'Afternoon: tech park, accelerator, or corporate innovation center visit',
      'Closing: roundtable on market entry, partnerships, and talent needs',
    ],
  },
  {
    title: 'Hangzhou Digital Economy Route',
    duration: '1-2 days',
    cities: 'Hangzhou',
    bestFor: 'E-commerce, platform economy, fintech, digital operations',
    flow: [
      'Platform ecosystem briefing: e-commerce, local services, payment, logistics, and cloud operations',
      'Company or incubator visit focused on AI-enabled growth, product operations, or cross-border trade',
      'West Lake cultural module to connect business context with city identity',
      'Case workshop: how Chinese tech companies test, scale, and monetize products',
    ],
  },
  {
    title: 'Shenzhen Robotics + Hardware Route',
    duration: '2 days',
    cities: 'Shenzhen',
    bestFor: 'Robotics, IoT, smart devices, supply chain, industrial design',
    flow: [
      'Day 1: hardware ecosystem briefing and smart device or robotics company visit',
      'Day 1 afternoon: industrial design, prototyping, or maker-space visit',
      'Day 2: supply chain, quality control, manufacturing, or export operations module',
      'Closing: founder or operator Q&A on speed, cost, and iteration in Shenzhen',
    ],
  },
  {
    title: 'Guangzhou + Shenzhen Cross-Border Tech Route',
    duration: '2-3 days',
    cities: 'Guangzhou, Shenzhen',
    bestFor: 'Cross-border e-commerce, logistics, consumer tech, brand operations',
    flow: [
      'Guangzhou: trade, logistics, and cross-border e-commerce operations briefing',
      'Shenzhen: consumer electronics, smart hardware, or AI application company visit',
      'Market research task: identify one product category and map its supply chain logic',
      'Final presentation: China tech product positioning and overseas expansion insight',
    ],
  },
  {
    title: 'Beijing AI Policy + Research Route',
    duration: '1-2 days',
    cities: 'Beijing',
    bestFor: 'AI governance, research commercialization, policy-aware executives',
    flow: [
      'AI industry and policy context briefing',
      'University lab, incubator, or AI company visit subject to host approval',
      'Discussion on data, regulation, talent, and enterprise adoption in China',
      'Case review: from research prototype to commercial product',
    ],
  },
  {
    title: 'Wuhan + Xi\'an Central China Tech Route',
    duration: '2-3 days',
    cities: 'Wuhan, Xi\'an',
    bestFor: 'Hard-tech, engineering education, regional innovation ecosystems',
    flow: [
      'University-linked innovation park or engineering lab visit',
      'Smart manufacturing, software, optoelectronics, or regional tech company visit',
      'Talent pipeline briefing: how universities, labs, and companies cooperate',
      'Comparison workshop: coastal vs central China tech ecosystems',
    ],
  },
];

const planningSteps = [
  {
    title: 'Profile the group',
    desc: 'Age range, nationality mix, language level, travel history, school goals, budget, dietary needs, and guardian expectations.',
  },
  {
    title: 'Build the academic spine',
    desc: 'We choose a clear learning theme first, then add campus visits, workshops, field tasks, and reflection checkpoints.',
  },
  {
    title: 'Lock the route',
    desc: 'Cities, host universities, hotels or dorm-style stays, train segments, arrival windows, and daily transport are sequenced for safety and energy.',
  },
  {
    title: 'Run the trip',
    desc: 'Bilingual coordination, emergency contacts, daily attendance checks, activity briefs, and a final report for families or school leaders.',
  },
];

const deliverables = [
  'Custom itinerary with learning objectives',
  'University and activity shortlist',
  'Budget bands and logistics assumptions',
  'Visa and entry document checklist',
  'Parent or school briefing deck',
  'Emergency and supervision protocol',
];

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
                'Custom China study tour programs for schools, agencies, families, student groups, and professional delegations, including campus, healthcare, AI, and tech company routes.',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'China Study Tour Route Catalog',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'University Discovery Study Tour' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Healthcare Industry Study Tour' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI and Tech Company Study Tour' } },
                ],
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
          <div className="absolute inset-0 bg-slate-950/72" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.95),rgba(15,23,42,0.78),rgba(15,23,42,0.34))]" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold text-emerald-100 mb-6">
                <Route size={16} />
                Short-term China immersion, built like an academic program
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight font-heading mb-6">
                China Study Tour Programs
              </h1>
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mb-8">
                PandaOffer designs structured China study tours for schools, education agencies, families, student groups, and professional delegations: real campus access, practical Mandarin, healthcare industry visits, AI and tech company routes, local context, and a clear learning outcome.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:hello@pandaoffer.top?subject=China%20Study%20Tour%20Program"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-950/30"
                >
                  Plan a Study Tour <Mail size={18} />
                </a>
                <Link
                  href="/tools/advisor"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
                >
                  Ask Study Advisor <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ['0.5-14', 'day route formats'],
              ['7+', 'city options'],
              ['6', 'program tracks'],
              ['15', 'sample routes'],
            ].map(([value, label]) => (
              <div key={label} className="py-3">
                <div className="text-3xl font-extrabold text-slate-900">{value}</div>
                <div className="text-sm font-medium text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-600 mb-2">Program Tracks</p>
              <h2 className="text-3xl font-extrabold text-slate-900 font-heading">Choose the learning angle first</h2>
            </div>
            <p className="text-slate-500 md:max-w-sm">
              Every route can be adapted for middle school, high school, undergraduate, parent-child, or agency partner groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {programTracks.map((track) => {
              const Icon = track.icon;
              return (
                <article key={track.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl ${track.bg} ${track.accent} flex items-center justify-center`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 rounded-full px-3 py-1">
                      {track.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{track.title}</h3>
                  <ul className="space-y-2.5">
                    {track.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-sky-600 mb-2">Route Menu</p>
                <h2 className="text-3xl font-extrabold text-slate-900 font-heading mb-4">Start from a city route</h2>
                <p className="text-slate-500 leading-relaxed">
                  We keep the trip practical: fewer city hops, more meaningful time on campus, and enough downtime for younger groups.
                </p>
              </div>
              <div className="lg:col-span-2 space-y-4">
                {cityRoutes.map((route) => (
                  <article key={route.title} className="border border-slate-200 rounded-2xl p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{route.title}</h3>
                        <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                          <MapPinned size={15} className="text-sky-500" />
                          {route.cities}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-sky-700 bg-sky-50 rounded-full px-3 py-1 w-fit">
                        {route.idealFor}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {route.highlights.map((highlight) => (
                        <div key={highlight} className="text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-3">
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-teal-600 mb-2">Healthcare Industry Routes</p>
              <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                Hospital, medtech, and healthcare operations study tours
              </h2>
            </div>
            <p className="text-slate-500 lg:max-w-md">
              Built for investors, healthcare industry groups, hospital managers, MBA/EMBA teams, and medical education partners.
            </p>
          </div>

          <figure className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm mb-8">
            <Image
              src="/images/study-tours/healthcare-industry-study-tour.jpg"
              alt="China healthcare industry study tour route with hospital department visit, expert Q&A, service flow and international department visit"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </figure>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
            {healthcareModules.map((module) => {
              const Icon = module.icon;
              return (
                <div key={module.title} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{module.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-500">{module.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {healthcareRoutes.map((route) => (
              <article key={route.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{route.title}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                      <MapPinned size={15} className="text-teal-500" />
                      {route.cities}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 rounded-full px-3 py-1 w-fit">
                    {route.duration}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-700 mb-4">{route.bestFor}</p>
                <ol className="space-y-2.5">
                  {route.flow.map((item, index) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 mb-2">AI & Tech Company Routes</p>
                <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                  AI companies, tech companies, and digital economy visits
                </h2>
              </div>
              <p className="text-slate-500 lg:max-w-md">
                Host availability varies by dates and group profile, so each route is designed with primary and backup visit options.
              </p>
            </div>

            <figure className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 shadow-sm mb-8">
              <Image
                src="/images/study-tours/ai-tech-company-study-tour.jpg"
                alt="China AI and technology company study tour route covering Shanghai, Hangzhou, Shenzhen, Beijing and Guangzhou"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </figure>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
              {techModules.map((module) => {
                const Icon = module.icon;
                return (
                  <div key={module.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{module.title}</h3>
                    <p className="text-xs leading-relaxed text-slate-500">{module.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {techRoutes.map((route) => (
                <article key={route.title} className="border border-slate-200 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{route.title}</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                        <MapPinned size={15} className="text-indigo-500" />
                        {route.cities}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 rounded-full px-3 py-1 w-fit">
                      {route.duration}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 mb-4">{route.bestFor}</p>
                  <ol className="space-y-2.5">
                    {route.flow.map((item, index) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-amber-600 mb-2">Operating Model</p>
              <h2 className="text-3xl font-extrabold text-slate-900 font-heading mb-4">
                A study tour needs an academic plan and a safety plan
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                The goal is to make China legible before students commit to a degree, scholarship, language year, or future career route. PandaOffer turns the trip into a guided decision-making process.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                    <ClipboardCheck size={16} className="text-emerald-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {planningSteps.map((step, index) => (
                <div key={step.title} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-extrabold shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 text-white">
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
                  href="mailto:hello@pandaoffer.top?subject=China%20Study%20Tour%20Program&body=Group%20size%3A%0AAge%20range%3A%0APreferred%20dates%3A%0ACities%20of%20interest%3A%0ALearning%20theme%3A%0AInterested%20visits%20(campus%2Fhealthcare%2FAI%2Ftech)%3A%0ABudget%20level%3A"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
                >
                  Request a Route Concept <Mail size={18} />
                </a>
                <Link
                  href="/blog/china-study-tours-healthcare-ai-tech-company-visits"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
                >
                  Read Route Guide <ArrowRight size={18} />
                </Link>
                <Link
                  href="/study-in-china"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
                >
                  Browse Study in China <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-4">
                <ShieldCheck className="text-emerald-300 shrink-0" size={22} />
                Safety-first routing
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-4">
                <Users className="text-emerald-300 shrink-0" size={22} />
                Group-ready supervision
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-4">
                <CalendarDays className="text-emerald-300 shrink-0" size={22} />
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
