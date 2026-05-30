export const studyTourEmail = 'hello@pandaoffer.top';
export const studyTourUrl = 'https://www.pandaoffer.top/china-study-tours';
export const studyTourTrackedShareUrl =
  'https://www.pandaoffer.top/china-study-tours?utm_source=social&utm_medium=share&utm_campaign=study_tours';

export const studyTourBrochures = [
  {
    title: 'AI/Tech Study Tour Brochure',
    href: '/brochures/pandaoffer-ai-tech-study-tour.pdf',
    audience: 'MBA, EMBA, university innovation teams, investors, founders, and tech students',
    description:
      'Original PandaOffer PDF covering AI applications, tech company visits, university labs, startup ecosystems, pricing anchors, host approval policy, and admissions follow-up.',
  },
  {
    title: 'Healthcare Study Tour Brochure',
    href: '/brochures/pandaoffer-healthcare-study-tour.pdf',
    audience: 'Healthcare executives, medical educators, investors, hospital managers, and medical students',
    description:
      'Original PandaOffer PDF covering hospital operations, medtech, digital health, non-clinical visit boundaries, trust details, safety notes, and application pathway support.',
  },
  {
    title: 'School Study Tour Brochure',
    href: '/brochures/pandaoffer-school-study-tour.pdf',
    audience: 'Middle schools, high schools, education agencies, families, and student groups',
    description:
      'Original PandaOffer PDF covering school exchange, campus tasters, culture and STEM modules, supervision, emergency planning, parent reporting, and study-abroad conversion.',
  },
];

const studyTourShareTitle = 'China Study Tour Programs by PandaOffer';
const studyTourShareText =
  'China study tours with AI/tech, healthcare, school routes, PDF brochures, host-approval planning, and admissions follow-up.';

export const studyTourShareLinks = [
  {
    label: 'LinkedIn',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(studyTourTrackedShareUrl)}`,
  },
  {
    label: 'X',
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(studyTourShareText)}&url=${encodeURIComponent(studyTourTrackedShareUrl)}`,
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/?text=${encodeURIComponent(`${studyTourShareTitle}: ${studyTourTrackedShareUrl}`)}`,
  },
  {
    label: 'Facebook',
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(studyTourTrackedShareUrl)}`,
  },
  {
    label: 'Telegram',
    href: `https://t.me/share/url?url=${encodeURIComponent(studyTourTrackedShareUrl)}&text=${encodeURIComponent(studyTourShareText)}`,
  },
  {
    label: 'Email',
    href: `mailto:?subject=${encodeURIComponent(studyTourShareTitle)}&body=${encodeURIComponent(`${studyTourShareText}\n\n${studyTourTrackedShareUrl}`)}`,
  },
];

export const routeBriefs = [
  {
    title: 'AI/Tech Route Brief',
    href: '/china-ai-company-visits',
    audience: 'MBA/EMBA groups, university teams, investors, and tech students',
    description:
      'AI applications, digital economy, robotics, smart hardware, enterprise software, and innovation park route options.',
  },
  {
    title: 'Healthcare Route Brief',
    href: '/china-healthcare-study-tour',
    audience: 'Healthcare executives, medical educators, investors, and hospital managers',
    description:
      'Hospital operations, international departments, checkup centers, medtech, digital health, and doctor-led Q&A formats.',
  },
  {
    title: 'School Study Tour Route Brief',
    href: '/china-study-tours#study-abroad-pathway',
    audience: 'Middle schools, high schools, agencies, families, and student groups',
    description:
      'Campus visits, Mandarin and culture modules, student safety operations, parent reporting, and study-abroad conversion support.',
  },
];

export const productLineup = [
  {
    title: 'Study-in-China Preview Tour',
    href: '/china-study-tours#study-abroad-pathway',
    priority: 'Core admissions funnel',
    duration: '7-10 days',
    price: 'from $1,899/student',
    image: '/tools/simulator/images/simulator/hub_bg.png',
    imageAlt: 'China campus study tour planning scene for school and family route design',
    audience: 'schools, education agencies, families, and students comparing China degree options',
    buyerFit: 'Schools, agencies, parents, and students who need a campus decision tour before applying.',
    accessLevel: 'Campus, dorm, canteen, admissions, student ambassador, and city-life access subject to approval.',
    learningOutput: 'University shortlist, city-fit notes, parent risk checklist, and post-tour application path.',
    primaryAccess: 'Campus visits, admissions or international office briefing, student-life walkthrough, and city comparison.',
    backupPlan: 'Campus-area academic walk, online student Q&A, and PandaOffer study-in-China workshop.',
    offer:
      'A 7-10 day campus-led route that helps families compare cities, universities, majors, costs, student life, safety, and scholarship paths before committing to an application.',
    marketSignal:
      'Generic culture camps are crowded. The opportunity is a decision-making tour that turns travel observations into a real university shortlist.',
    scarceResource:
      'Campus access, bilingual student-life interpretation, parent-ready risk controls, and follow-up admissions planning.',
    contentAngle:
      'City comparison, campus visit checklist, parent safety guide, scholarship timelines, and post-tour university matching.',
    cta: 'Build a school route',
  },
  {
    title: 'China Healthcare Study Tour',
    href: '/china-healthcare-study-tour',
    priority: 'Differentiated industry route',
    duration: 'Half day-3 days',
    price: 'quote by group size',
    image: '/images/study-tours/healthcare-industry-study-tour.jpg',
    imageAlt: 'China healthcare study tour with hospital operations and expert visit planning',
    audience: 'healthcare executives, hospital managers, medical educators, doctors, investors, and MBA groups',
    buyerFit: 'Healthcare executives, medical educators, investors, hospital managers, MBA groups, and doctors.',
    accessLevel: 'Hospital, checkup center, medtech, digital health, and doctor/operator access subject to approval.',
    learningOutput: 'Service-flow map, market briefing, expert Q&A notes, and healthcare operations checklist.',
    primaryAccess: 'Hospital department, international department, checkup center, medtech, or digital health visit.',
    backupPlan: 'Doctor or operator roundtable, healthcare market case workshop, or university public health session.',
    offer:
      'A half-day to 3-day healthcare route covering hospital operations, international departments, checkup centers, service flow, medtech, AI healthcare, digital health, and expert Q&A.',
    marketSignal:
      'Healthcare access is scarce and hard to package credibly, which makes it stronger than generic sightseeing or vague business visits.',
    scarceResource:
      'Doctor or operator hosts, hospital approval, service-flow interpretation, compliance-aware routing, and backup expert sessions.',
    contentAngle:
      'Hospital operations, medical service innovation, private care, medtech, digital health, and healthcare market-entry guides.',
    cta: 'Open healthcare page',
  },
  {
    title: 'China AI Company Visits',
    href: '/china-ai-company-visits',
    priority: 'High-demand professional module',
    duration: '1-3 days',
    price: 'quote by group size',
    image: '/images/study-tours/ai-tech-company-study-tour.jpg',
    imageAlt: 'China AI company study tour with technology demos and innovation route planning',
    audience: 'MBA/EMBA cohorts, tech students, investors, founders, and corporate innovation teams',
    buyerFit: 'MBA/EMBA cohorts, investors, tech students, founders, and corporate innovation teams.',
    accessLevel: 'AI application, enterprise software, university lab, incubator, or operator access subject to approval.',
    learningOutput: 'AI commercialization map, product critique, adoption notes, and market-entry discussion.',
    primaryAccess: 'AI application company, product demo, university lab, incubator, or operator briefing.',
    backupPlan: 'AI adoption case workshop, innovation-center visit, founder roundtable, or product teardown.',
    offer:
      'A 1-3 day AI route with application demos, enterprise software, product commercialization, university labs, incubators, and operator roundtables subject to host approval.',
    marketSignal:
      'AI is crowded as a keyword, but still winnable when the route promises real use cases, host-approval transparency, and backup learning formats.',
    scarceResource:
      'Qualified company access, product managers or operators, sector framing, translation of technical context, and non-sales learning design.',
    contentAngle:
      'AI adoption case studies, product demo questions, MBA reflection tasks, China AI ecosystem maps, and company visit planning.',
    cta: 'Open AI visit page',
  },
  {
    title: 'China Tech Company Study Tour',
    href: '/china-tech-company-study-tour',
    priority: 'City-based ecosystem route',
    duration: '1-3 days',
    price: 'quote by group size',
    image: '/tools/simulator/images/simulator/shanghai_bg.png',
    imageAlt: 'China technology study tour city route for company visits and digital economy learning',
    audience: 'engineering schools, founders, investors, university teams, and corporate strategy groups',
    buyerFit: 'Engineering schools, founders, investors, university teams, and corporate strategy groups.',
    accessLevel: 'Robotics, hardware, platform, supply-chain, logistics, and innovation park access subject to approval.',
    learningOutput: 'Ecosystem map, prototype-to-production checklist, supply-chain notes, and team presentation.',
    primaryAccess: 'Robotics, smart hardware, e-commerce, logistics, industrial tech, or innovation park visit.',
    backupPlan: 'Hardware ecosystem briefing, supplier map, product teardown, or operator Q&A workshop.',
    offer:
      'A technology route around robotics, smart hardware, digital platforms, cross-border e-commerce, logistics, industrial technology, and innovation parks.',
    marketSignal:
      'Tech tours are common, but route quality varies. Shenzhen hardware, Hangzhou digital economy, and Shanghai enterprise tech remain strong hooks.',
    scarceResource:
      'Route-specific host matching, supply-chain context, operator briefings, and backup workshops when factories or companies cannot approve visits.',
    contentAngle:
      'Shenzhen hardware routes, Hangzhou platform economy, Shanghai enterprise tech, robotics, smart manufacturing, and cross-border commerce.',
    cta: 'Open tech tour page',
  },
  {
    title: 'MBA China Innovation Tour',
    href: '/mba-china-innovation-tour',
    priority: 'Premium executive product',
    duration: '5-10 days',
    price: 'quote by group size',
    image: '/images/study-tours/ai-tech-company-study-tour.jpg',
    imageAlt: 'MBA China innovation study tour with AI technology and executive route planning',
    audience: 'MBA, EMBA, executive education, investor, and corporate strategy groups',
    buyerFit: 'MBA, EMBA, executive education, investor, and corporate strategy groups.',
    accessLevel: 'Senior host, founder/operator, AI, healthcare, tech, and market-entry access subject to approval.',
    learningOutput: 'Market-entry memo, sector risk matrix, innovation audit, and board-style debrief.',
    primaryAccess: 'AI, healthcare, tech, founder/operator, incubator, and executive market briefing route.',
    backupPlan: 'Sector case workshop, expert roundtable, policy briefing, or company simulation session.',
    offer:
      'A 5-10 day executive route combining AI, healthcare, tech, market entry, founder/operator roundtables, case workshops, and a final board-style debrief.',
    marketSignal:
      'Executive China tours are crowded at the generic company-visit layer. The space is still open for sector-specific routes with measurable outputs.',
    scarceResource:
      'Senior hosts, credible market briefings, bilingual facilitation, workshop design, and primary/backup visit architecture.',
    contentAngle:
      'China innovation strategy, market-entry cases, industry roundtables, executive assignments, and sector comparison guides.',
    cta: 'Open MBA page',
  },
  {
    title: 'White-Label Study Tour Operations',
    href: '/china-study-tours#request-route',
    priority: 'Partner channel product',
    duration: 'Custom dates',
    price: 'partner quote',
    image: '/tools/simulator/images/simulator/dali_bg.png',
    imageAlt: 'White-label China study tour operations route for partner groups and local coordination',
    audience: 'overseas agencies, schools, training firms, and tour operators that need a China operating partner',
    buyerFit: 'Overseas agencies, schools, training firms, and tour operators that need China-side execution.',
    accessLevel: 'Host outreach, local coordination, bilingual operation, safety materials, and partner-branded delivery.',
    learningOutput: 'Partner route concept, quote assumptions, safety SOP, parent/sponsor materials, and handover pack.',
    primaryAccess: 'Local route design, host approval management, bilingual logistics, and on-trip coordination.',
    backupPlan: 'Alternative hosts, classroom briefings, online expert Q&A, and revised local operating schedule.',
    offer:
      'Behind-the-scenes route design, host outreach, bilingual coordination, safety checklists, parent or sponsor materials, and local operations for partner-branded programs.',
    marketSignal:
      'Many overseas providers can sell demand but lack local China execution. This is a service gap rather than a traffic gap.',
    scarceResource:
      'Reliable ground coordination, host approval management, emergency contacts, transparent assumptions, and reusable partner materials.',
    contentAngle:
      'Partner playbooks, safety SOPs, route approval timelines, quote templates, and how to sell China study tours overseas.',
    cta: 'Request partner route',
  },
];

export const pricingAnchors = [
  {
    title: 'School Study Tour',
    price: 'from $1,899/student',
    detail:
      'Typical 7-10 day student group with campus planning, local transport, bilingual coordination, learning tasks, and safety operations. Final price depends on group size, dates, city count, accommodation level, and host fees.',
  },
  {
    title: 'AI/Tech or Healthcare Module',
    price: 'quote by group size',
    detail:
      'Half-day to 3-day professional modules with institution shortlisting, host outreach, interpretation, local logistics, and backup visit planning.',
  },
  {
    title: 'MBA China Innovation Tour',
    price: 'quote by group size',
    detail:
      'Executive route design for MBA, EMBA, corporate innovation, and investor groups, with market briefings, case workshops, and primary/backup visit options.',
  },
];

export const tripFacts = [
  {
    label: 'Program scope',
    value: 'Built around the group profile',
    detail:
      'School, family, MBA, executive, and partner groups need different pacing, supervision, and visit assumptions.',
  },
  {
    label: 'Route length',
    value: 'Short modules or full campus routes',
    detail:
      'Half-day industry visits, 1-3 day professional modules, and 7-14 day student routes are scoped separately.',
  },
  {
    label: 'On-trip support',
    value: 'Bilingual coordination where needed',
    detail:
      'English/Chinese host communication, local coordination, and interpretation can be included in the proposal.',
  },
  {
    label: 'Host access',
    value: 'Primary plan plus backup route',
    detail:
      'Campus, hospital, and company visits depend on approval, so every serious route separates confirmed items from backups.',
  },
];

export const sampleRouteFlow = [
  {
    title: 'Before arrival',
    timing: '2-6 weeks before',
    detail:
      'Confirm group profile, route goal, host outreach list, safety assumptions, visa needs, and backup learning format.',
  },
  {
    title: 'Arrival and orientation',
    timing: 'Day 1',
    detail:
      'Airport or station transfer where quoted, welcome briefing, China context session, city orientation, and daily communication setup.',
  },
  {
    title: 'Campus or industry access days',
    timing: 'Days 2-5+',
    detail:
      'Run university, healthcare, AI, tech, culture, or company-visit modules with prepared questions and bilingual facilitation.',
  },
  {
    title: 'Final debrief and next step',
    timing: 'Final day',
    detail:
      'Close with reflection, route findings, parent or sponsor notes, admissions pathway, and optional application or partner follow-up.',
  },
];

export const routeFlowVisuals = [
  {
    title: 'Campus and city orientation',
    image: '/tools/simulator/images/simulator/hub_bg.png',
    imageAlt: 'China study tour campus and city orientation visual itinerary board',
    label: 'Orientation',
  },
  {
    title: 'Industry access and expert sessions',
    image: '/images/study-tours/ai-tech-company-study-tour.jpg',
    imageAlt: 'China study tour AI and technology industry access visual itinerary board',
    label: 'Access days',
  },
  {
    title: 'Healthcare, culture, and final debrief',
    image: '/images/study-tours/healthcare-industry-study-tour.jpg',
    imageAlt: 'China healthcare study tour final debrief visual itinerary board',
    label: 'Debrief',
  },
];

export const availabilityWindows = [
  {
    window: 'Mar-May 2027',
    status: 'Open for private quote',
    route: 'School campus and culture route',
    capacity: '12-32 students',
    signal: 'Best window for spring break, pre-summer camps, and parent-facing school proposals.',
  },
  {
    window: 'Jun-Aug 2027',
    status: 'Host approval needed',
    route: 'AI, tech, and healthcare modules',
    capacity: '8-24 delegates',
    signal: 'High-demand period: shortlist primary hosts early and confirm backup workshops before deposit.',
  },
  {
    window: 'Sep-Dec 2027',
    status: 'Open for private quote',
    route: 'MBA and executive China innovation route',
    capacity: '10-28 professionals',
    signal: 'Strong fit for semester modules, corporate innovation weeks, and sponsor-funded delegations.',
  },
];

export const fitBoardSignals = [
  {
    title: 'Best fit',
    value: 'Groups with a clear learning theme',
    detail:
      'The strongest routes start with a defined audience, city preference, visit theme, and intended learning output.',
  },
  {
    title: 'Group readiness',
    value: 'Dates, size, budget, and supervision model',
    detail:
      'PandaOffer can scope faster when the brief includes traveler count, age or professional profile, budget level, and mobility limits.',
  },
  {
    title: 'Host approval risk',
    value: 'Primary access plus backup route',
    detail:
      'University, hospital, and company visits depend on host approval, so every serious proposal separates confirmed items from assumptions.',
  },
];

export const bookingPath = [
  {
    title: 'Check availability',
    detail: 'Send group size, dates, age or professional profile, city preference, budget level, and must-have visit themes.',
  },
  {
    title: 'Host approval and backup route',
    detail: 'PandaOffer checks primary hosts, prepares acceptable alternatives, and separates confirmed items from assumptions.',
  },
  {
    title: 'Proposal and deposit',
    detail: 'The written proposal states price band, inclusion scope, operating entity, payment method, and risk notes.',
  },
  {
    title: 'Final trip details',
    detail: 'Before travel, the group receives timing, contacts, preparation tasks, emergency routing, and final visit status.',
  },
];

export const quoteBriefFields = [
  {
    label: 'Group size',
    placeholder: '12 students / 24 executives',
  },
  {
    label: 'Audience',
    placeholder: 'MBA, hospital managers, high school students',
  },
  {
    label: 'Preferred dates',
    placeholder: 'March 2027 / 5 working days / flexible',
  },
  {
    label: 'Route priority',
    placeholder: 'AI demos, hospital operations, campus visits',
  },
  {
    label: 'Budget level',
    placeholder: 'Economy / standard / executive',
  },
];

export const proposalIncludes = [
  'Route concept with primary and backup visit options',
  'Group-fit assumptions and timing risks',
  'Budget band with host-fee and logistics assumptions',
  'Learning outcomes, workshop outputs, and required preparation',
];

export const proposalExclusions = [
  'Guaranteed access to a named company, hospital, or university before host approval',
  'International flights, personal insurance, and visa fees unless separately quoted',
  'Medical, legal, investment, or immigration advice outside the agreed tour scope',
];

export const trustItems = [
  {
    title: 'Company and contract identity',
    detail:
      'A formal proposal confirms the PandaOffer operating entity, named coordinator, payment account, invoice details, and service scope before deposit.',
  },
  {
    title: 'Payment methods',
    detail:
      'Service fees can be handled through Paddle-supported card, debit card, PayPal, or quoted group payment arrangements where applicable.',
  },
  {
    title: 'Insurance and safety',
    detail:
      'Groups receive a risk checklist covering travel insurance, medical access, activity suitability, dietary notes, transport assumptions, and escalation steps.',
  },
  {
    title: 'Emergency contacts',
    detail:
      'Each route includes a bilingual on-trip contact, host contact where approved, hotel contact, and emergency escalation contact shared before arrival.',
  },
  {
    title: 'Visa support',
    detail:
      'PandaOffer provides invitation-letter coordination guidance, entry-document checklists, X1/X2 study visa context, and arrival registration reminders.',
  },
  {
    title: 'Student-supervisor ratio',
    detail:
      'School groups are planned with a recommended 1:10 to 1:15 adult-to-student operating ratio, adjusted for age, city complexity, and activity type.',
  },
];

export const visitOptionSets = [
  {
    title: 'AI/Tech Visit Options',
    primary: [
      'AI application company visit subject to host approval',
      'Robotics, smart hardware, or enterprise software company visit subject to host approval',
      'Digital platform, e-commerce, fintech, or logistics operator visit subject to host approval',
    ],
    backup: [
      'University innovation lab, incubator, or entrepreneurship center',
      'Technology park showroom, accelerator, or maker-space briefing',
      'Founder, operator, investor, or product manager roundtable hosted in a classroom or meeting venue',
    ],
  },
  {
    title: 'Healthcare Visit Options',
    primary: [
      'Hospital department, international department, or checkup center visit subject to host approval',
      'Private hospital, specialty chain, or health management service walkthrough subject to host approval',
      'Medtech, digital health, AI healthcare, or genetic testing company visit subject to host approval',
    ],
    backup: [
      'Healthcare market briefing with case studies and service-flow mapping',
      'Doctor, hospital operator, or medical service expert Q&A in a private meeting venue',
      'University public health, medical education, or hospital management workshop where available',
    ],
  },
  {
    title: 'School and Campus Visit Options',
    primary: [
      'Campus visit to target university subject to host approval',
      'Admissions, scholarship, or international office briefing subject to host approval',
      'Student ambassador Q&A, dorm, canteen, library, or lab walkthrough where available',
    ],
    backup: [
      'Campus-area academic walk with PandaOffer university comparison briefing',
      'Study in China workshop covering majors, CSC, visas, cost, and parent concerns',
      'Online student, alumni, or admissions Q&A scheduled before or after the tour',
    ],
  },
];

export const conversionPathway = [
  {
    title: 'Tour debrief',
    detail:
      'Students leave with a structured reflection report: preferred city, campus fit, major interests, safety concerns, budget range, and family questions.',
  },
  {
    title: 'University matching',
    detail:
      'PandaOffer turns tour observations into a practical shortlist across C9, 985, 211, MBBS, language, bachelor, master, and PhD pathways.',
  },
  {
    title: 'Application and CSC support',
    detail:
      'After the tour, families can continue into application planning, document review, supervisor outreach, CSC strategy, and scholarship timelines.',
  },
  {
    title: 'Parent consultation',
    detail:
      'Parents get a clearer post-tour conversation about safety, visa route, costs, city choice, degree ROI, and whether China is the right next step.',
  },
];

export const contentPillars = [
  {
    title: 'Focused Route Pages',
    purpose:
      'Open a focused route page when the buyer already knows the theme: healthcare, AI, technology, MBA innovation, or school study tour.',
    assets: [
      'China Study Tour Programs',
      'China Healthcare Study Tour',
      'China AI Company Visits',
      'China Tech Company Study Tour',
      'MBA China Innovation Tour',
    ],
    primaryLink: '/china-study-tours',
    cta: 'Compare route pages',
  },
  {
    title: 'City and Sector Logic',
    purpose:
      'Choose city pairs by what the group needs to learn, not by sightseeing order.',
    assets: [
      'Shanghai + Hangzhou AI and digital economy',
      'Shenzhen robotics and hardware',
      'Guangzhou + Shenzhen medtech',
      'Beijing healthcare policy and AI research',
    ],
    primaryLink: '/blog/china-study-tours-healthcare-ai-tech-company-visits',
    cta: 'Read route guide',
  },
  {
    title: 'Trust and Operations Pack',
    purpose:
      'Answer the questions that block approval: host confirmation, payment, safety, insurance, supervision, visas, and emergency support.',
    assets: [
      'What is confirmed before deposit',
      'Primary and backup visit options',
      'Student-supervisor ratio',
      'Payment and quotation assumptions',
    ],
    primaryLink: '/china-study-tours#trust',
    cta: 'Review trust details',
  },
  {
    title: 'Post-Tour Admissions Pathway',
    purpose:
      'Turn a short visit into a practical next step for students and families considering long-term study in China.',
    assets: [
      'Post-tour university matching',
      'CSC scholarship planning after the tour',
      'City and major shortlist',
      'Parent decision checklist',
    ],
    primaryLink: '/study-in-china',
    cta: 'Open study pathway',
  },
];

export const seoTourPages = {
  healthcare: {
    slug: 'china-healthcare-study-tour',
    title: 'China Healthcare Study Tour',
    metaTitle: 'China Healthcare Study Tour',
    description:
      'Plan a China healthcare study tour with hospital operations, medtech, digital health, doctor-led Q&A, backup visits, safety, and admissions support for groups.',
    canonical: 'https://www.pandaoffer.top/china-healthcare-study-tour',
    label: 'Healthcare industry route',
    price: 'quote by group size',
    duration: 'Half day to 3 days',
    audience: 'healthcare executives, medical educators, investors, hospital managers, MBA/EMBA groups, and medical students',
    image: '/images/study-tours/healthcare-industry-study-tour.jpg',
    imageAlt:
      'China healthcare study tour with hospital operations, international department visit, medtech and digital health route options',
    brochureHref: '/brochures/pandaoffer-healthcare-study-tour.pdf',
    theme: 'teal',
    keywords: [
      'China healthcare study tour',
      'China hospital visit',
      'China medtech study tour',
      'China digital health company visit',
      'hospital management study tour China',
    ],
    heroBullets: [
      'Hospital operations and patient service flow',
      'International department, checkup center, or specialty chain options',
      'Medtech, AI healthcare, digital health, or genetic testing route design',
      'Doctor, operator, or expert Q&A with backup workshop plan',
    ],
    modules: [
      {
        title: 'Hospital Operations',
        text: 'Observe reception, triage, checkup, billing, international service, patient support, and operational positioning.',
      },
      {
        title: 'Clinical and Expert Exchange',
        text: 'Arrange doctor-led or operator-led Q&A where host approval allows, with briefing notes prepared in advance.',
      },
      {
        title: 'MedTech and Digital Health',
        text: 'Map China healthcare innovation across devices, health management, AI tools, genetics, and digital service models.',
      },
      {
        title: 'Market Insight',
        text: 'Add a practical session on regulation context, patient trust, premium care, private hospitals, and investment trends.',
      },
    ],
    sampleRoutes: [
      {
        title: 'Half-Day Hospital Deep Visit',
        cities: 'Shanghai, Beijing, Guangzhou, Shenzhen, Hangzhou',
        duration: '3-4 hours',
        bestFor: 'Focused executive or medical education groups',
        primary: 'Hospital department, international department, or checkup center visit subject to host approval.',
        backup: 'Healthcare operations workshop with a doctor, operator, or market expert if the host cannot approve the visit.',
        outcomes: ['Service-flow map', 'Expert Q&A notes', 'Operational comparison checklist'],
      },
      {
        title: 'Shanghai + Hangzhou Digital Health Route',
        cities: 'Shanghai, Hangzhou',
        duration: '2 days',
        bestFor: 'Digital health, AI healthcare, patient experience, and service innovation',
        primary: 'Hospital operations visit plus digital health or AI healthcare company visit subject to host approval.',
        backup: 'University public health session, tech park briefing, or healthcare market case workshop.',
        outcomes: ['China digital health market map', 'Patient journey analysis', 'Localization discussion'],
      },
      {
        title: 'Guangzhou + Shenzhen MedTech Route',
        cities: 'Guangzhou, Shenzhen',
        duration: '2-3 days',
        bestFor: 'Medical devices, genetics, cross-border care, and Greater Bay Area innovation',
        primary: 'Specialty chain, private hospital, medtech, or genetic testing company visit subject to host approval.',
        backup: 'Greater Bay Area healthcare briefing plus expert roundtable in a private meeting venue.',
        outcomes: ['GBA ecosystem map', 'Device/service positioning review', 'Cross-border care discussion'],
      },
    ],
    visitOptions: visitOptionSets[1],
  },
  aiCompanies: {
    slug: 'china-ai-company-visits',
    title: 'China AI Company Visits',
    metaTitle: 'China AI Company Visits',
    description:
      'Design China AI company visits with demos, enterprise software, robotics, university labs, backup options, host approval, and admissions follow-up for cohorts.',
    canonical: 'https://www.pandaoffer.top/china-ai-company-visits',
    label: 'AI company visit planning',
    price: 'quote by group size',
    duration: '1 to 3 days',
    audience: 'MBA/EMBA cohorts, university innovation teams, student groups, investors, and corporate strategy teams',
    image: '/images/study-tours/ai-tech-company-study-tour.jpg',
    imageAlt:
      'China AI company visit route for study tours covering product demos, innovation parks, university labs and market briefings',
    brochureHref: '/brochures/pandaoffer-ai-tech-study-tour.pdf',
    theme: 'indigo',
    keywords: [
      'China AI company visits',
      'AI study tour China',
      'China AI company visit',
      'MBA AI study tour China',
      'China innovation company visits',
    ],
    heroBullets: [
      'AI application demos and commercialization discussion',
      'Enterprise software, robotics, platform, and model-application routes',
      'Primary company visit plus backup lab, incubator, or roundtable option',
      'Case workshop on China AI adoption, pricing, data, and product-market fit',
    ],
    modules: [
      {
        title: 'AI Applications',
        text: 'Focus on deployable use cases: enterprise workflows, education, healthcare, manufacturing, retail, finance, and city services.',
      },
      {
        title: 'Product and Business Model',
        text: 'Discuss where Chinese AI products create value, how teams sell, and what changes when products localize overseas.',
      },
      {
        title: 'Innovation Ecosystem',
        text: 'Use company, incubator, university, and tech park options to show how talent, capital, and customers connect.',
      },
      {
        title: 'Student or MBA Workshop',
        text: 'Turn the visit into a structured assignment with market mapping, product critique, and final group presentations.',
      },
    ],
    sampleRoutes: [
      {
        title: 'Shanghai AI + Enterprise Tech Route',
        cities: 'Shanghai',
        duration: '1 day',
        bestFor: 'MBA/EMBA, investors, tech students, and corporate innovation teams',
        primary: 'AI application or enterprise software company visit subject to host approval.',
        backup: 'Innovation center, accelerator, university lab, or operator roundtable with product case review.',
        outcomes: ['AI commercialization map', 'China customer adoption notes', 'Product positioning critique'],
      },
      {
        title: 'Hangzhou Digital Economy + AI Route',
        cities: 'Hangzhou',
        duration: '1-2 days',
        bestFor: 'Platform economy, e-commerce, fintech, logistics, and AI-enabled operations',
        primary: 'Digital platform, AI operations, or incubator visit subject to host approval.',
        backup: 'Digital economy briefing, case workshop, and West Lake culture module for context.',
        outcomes: ['Platform ecosystem map', 'Growth model analysis', 'AI operations case memo'],
      },
      {
        title: 'Beijing AI Policy + Research Route',
        cities: 'Beijing',
        duration: '1-2 days',
        bestFor: 'AI governance, research commercialization, and policy-aware executive groups',
        primary: 'University lab, incubator, or AI company visit subject to host approval.',
        backup: 'AI policy briefing, academic exchange, or prototype-to-product case workshop.',
        outcomes: ['Policy and adoption briefing', 'Research commercialization notes', 'Group Q&A report'],
      },
    ],
    visitOptions: visitOptionSets[0],
  },
  techCompanies: {
    slug: 'china-tech-company-study-tour',
    title: 'China Tech Company Study Tour',
    metaTitle: 'China Tech Company Study Tour',
    description:
      'Build a China tech company study tour with robotics, hardware, digital platforms, e-commerce, innovation parks, host approval, and backup visits for cohorts.',
    canonical: 'https://www.pandaoffer.top/china-tech-company-study-tour',
    label: 'Technology company route',
    price: 'quote by group size',
    duration: '1 to 3 days',
    audience: 'technology students, engineering schools, MBA/EMBA cohorts, founders, investors, and corporate innovation teams',
    image: '/images/study-tours/ai-tech-company-study-tour.jpg',
    imageAlt:
      'China technology company study tour route with robotics, smart hardware, manufacturing, platforms and innovation parks',
    brochureHref: '/brochures/pandaoffer-ai-tech-study-tour.pdf',
    theme: 'sky',
    keywords: [
      'China tech company study tour',
      'China technology study tour',
      'Shenzhen tech study tour',
      'China robotics study tour',
      'China hardware company visit',
    ],
    heroBullets: [
      'Robotics, smart hardware, IoT, and industrial technology routes',
      'Digital platform, e-commerce, logistics, and cross-border trade modules',
      'Primary company visit subject to host approval with backup technical briefings',
      'Field assignment connecting product, supply chain, talent, and market logic',
    ],
    modules: [
      {
        title: 'Robotics and Hardware',
        text: 'Explore smart devices, prototyping, industrial design, quality control, and supply chain speed.',
      },
      {
        title: 'Digital Platforms',
        text: 'Review e-commerce, local services, fintech, logistics, cross-border trade, and data-driven operations.',
      },
      {
        title: 'Industrial Tech',
        text: 'Use factory, park, or expert backup options to discuss automation, supplier networks, and manufacturing systems.',
      },
      {
        title: 'China Go-to-Market',
        text: 'Frame the visit around product positioning, user adoption, pricing, channels, and overseas expansion.',
      },
    ],
    sampleRoutes: [
      {
        title: 'Shenzhen Robotics + Hardware Route',
        cities: 'Shenzhen',
        duration: '2 days',
        bestFor: 'Robotics, IoT, smart devices, supply chain, and industrial design',
        primary: 'Robotics, smart hardware, maker-space, or manufacturing company visit subject to host approval.',
        backup: 'Hardware ecosystem briefing, product teardown, supplier map, or operator Q&A in a meeting venue.',
        outcomes: ['Hardware ecosystem map', 'Prototype-to-production checklist', 'Supply chain reflection'],
      },
      {
        title: 'Guangzhou + Shenzhen Cross-Border Tech Route',
        cities: 'Guangzhou, Shenzhen',
        duration: '2-3 days',
        bestFor: 'Cross-border e-commerce, logistics, consumer tech, and brand operations',
        primary: 'Cross-border e-commerce, logistics, consumer electronics, or AI application company visit subject to host approval.',
        backup: 'Trade market research task, platform operations briefing, and product category mapping workshop.',
        outcomes: ['Category supply chain map', 'Cross-border growth notes', 'Team presentation deck'],
      },
      {
        title: 'Wuhan + Xian Hard-Tech Route',
        cities: 'Wuhan, Xian',
        duration: '2-3 days',
        bestFor: 'Engineering education, hard-tech, software, optoelectronics, and regional ecosystems',
        primary: 'University-linked innovation park, engineering lab, or regional tech company visit subject to host approval.',
        backup: 'Regional innovation briefing, university talent pipeline session, or central-vs-coastal ecosystem workshop.',
        outcomes: ['Regional ecosystem comparison', 'Talent pipeline notes', 'Hard-tech commercialization brief'],
      },
    ],
    visitOptions: visitOptionSets[0],
  },
  mbaInnovation: {
    slug: 'mba-china-innovation-tour',
    title: 'MBA China Innovation Tour',
    metaTitle: 'MBA China Innovation Tour',
    description:
      'Plan an MBA China innovation tour with AI, healthcare, tech, market-entry briefings, company visits subject to host approval, and backup roundtables for executives.',
    canonical: 'https://www.pandaoffer.top/mba-china-innovation-tour',
    label: 'MBA and EMBA innovation route',
    price: 'quote by group size',
    duration: '5 to 10 days',
    audience: 'MBA, EMBA, executive education, investor, corporate strategy, and university innovation groups',
    image: '/images/study-tours/ai-tech-company-study-tour.jpg',
    imageAlt:
      'MBA China innovation tour with AI, healthcare, technology, market entry and executive roundtable modules',
    brochureHref: '/brochures/pandaoffer-ai-tech-study-tour.pdf',
    theme: 'amber',
    keywords: [
      'MBA China innovation tour',
      'China innovation study tour',
      'EMBA China study tour',
      'MBA China company visits',
      'China market entry study tour',
    ],
    heroBullets: [
      'AI, healthcare, tech, digital economy, and market-entry learning tracks',
      'Executive-ready route design with primary and backup visit options',
      'Case workshops on business model, localization, talent, and partnerships',
      'Optional bridge into PandaOffer university matching for student or family groups',
    ],
    modules: [
      {
        title: 'Innovation Strategy',
        text: 'Study how Chinese teams test, localize, price, distribute, and scale products in competitive markets.',
      },
      {
        title: 'Market Entry',
        text: 'Add briefings on partnerships, customer adoption, channels, regulation context, and talent availability.',
      },
      {
        title: 'Sector Deep Dives',
        text: 'Choose AI, healthcare, robotics, smart hardware, digital platforms, fintech, or education technology.',
      },
      {
        title: 'Executive Output',
        text: 'Close the route with a group presentation, investment memo, innovation audit, or board-style debrief.',
      },
    ],
    sampleRoutes: [
      {
        title: 'Shanghai + Hangzhou Innovation Route',
        cities: 'Shanghai, Hangzhou',
        duration: '5-7 days',
        bestFor: 'MBA/EMBA cohorts studying AI, platforms, fintech, and consumer growth',
        primary: 'AI, digital platform, accelerator, or innovation center visit subject to host approval.',
        backup: 'Executive market briefing, founder/operator roundtable, and China digital economy case workshop.',
        outcomes: ['Market-entry memo', 'Business model critique', 'China digital economy map'],
      },
      {
        title: 'Shenzhen Hardware + Supply Chain Route',
        cities: 'Shenzhen, Guangzhou',
        duration: '5-8 days',
        bestFor: 'Operations, manufacturing, consumer tech, robotics, and cross-border commerce',
        primary: 'Hardware, robotics, logistics, or cross-border e-commerce company visit subject to host approval.',
        backup: 'Supply chain mapping workshop, product teardown, maker-space briefing, or operator Q&A.',
        outcomes: ['Supply chain map', 'Innovation speed analysis', 'Cross-border commercialization notes'],
      },
      {
        title: 'Beijing Policy + Healthcare Innovation Route',
        cities: 'Beijing, Shanghai',
        duration: '6-10 days',
        bestFor: 'Policy-aware executives, healthcare investors, and corporate strategy teams',
        primary: 'AI, healthcare, university lab, hospital, or incubator visit subject to host approval.',
        backup: 'Policy briefing, healthcare operations case, or academic roundtable with prepared questions.',
        outcomes: ['Policy and market context notes', 'Sector risk matrix', 'Executive debrief'],
      },
    ],
    visitOptions: visitOptionSets[0],
  },
};

export function getStudyTourMetadata(page) {
  return {
    title: page.metaTitle,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: page.canonical,
      languages: {
        'x-default': page.canonical,
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
      title: `${page.metaTitle} | PandaOffer`,
      description: page.description,
      url: page.canonical,
      siteName: 'PandaOffer',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: page.image,
          width: 1600,
          height: 900,
          alt: page.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.description,
      images: [page.image],
      site: '@pandaoffer',
      creator: '@pandaoffer',
    },
  };
}
