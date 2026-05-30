import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomeClientManager from '@/components/home/HomeClientManager';
import HeroHeader from '@/components/home/HeroHeader';
import StudyTourLead from '@/components/home/StudyTourLead';
import AffiliatesList from '@/components/home/AffiliatesList';
import DiscoverChina from '@/components/home/DiscoverChina';
import SocialProof from '@/components/home/SocialProof';
import PremiumServices from '@/components/home/PremiumServices';

import ToolsMenu from '@/components/tools/ToolsMenu';
import MedicalTourismBanner from '@/components/home/MedicalTourismBanner';

export const metadata = {
  title: 'PandaOffer | China Study Tours, University Matching & AI Advisor',
  description:
    'Plan China study tours with campus visits, healthcare industry routes, AI and tech company visits, plus AI-powered university matching and Study in China guidance.',
  keywords: [
    'China study tours',
    'Study in China',
    'China university matching',
    'China healthcare study tour',
    'China AI company visit',
    'China tech company visit',
    'CSC Scholarship',
  ],
  alternates: {
    canonical: 'https://www.pandaoffer.top',
  },
  openGraph: {
    title: 'PandaOffer | China Study Tours, University Matching & AI Advisor',
    description:
      'Custom China study tours, healthcare and AI/tech company routes, university matching, and Study in China guidance.',
    url: 'https://www.pandaoffer.top',
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
    title: 'PandaOffer | China Study Tours, University Matching & AI Advisor',
    description:
      'Custom China study tours, healthcare and AI/tech company routes, university matching, and Study in China guidance.',
    images: ['/images/study-tours/ai-tech-company-study-tour.jpg'],
  },
};

export default function PandaOfferApp() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* JSON-LD Structured Data for Website and Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "PandaOffer",
              "url": "https://www.pandaoffer.top/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.pandaoffer.top/blog?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PandaOffer",
              "alternateName": ["Panda Offer", "pandaoffer.top", "PandaOffer.top"],
              "url": "https://www.pandaoffer.top/",
              "logo": "https://www.pandaoffer.top/og-image.jpg",
              "description": "PandaOffer (Panda Offer) helps international students and professional groups explore China through study tours, university matching, CSC Scholarship guidance, healthcare industry routes, and AI/tech company visits.",
              "sameAs": ["https://discord.gg/7bU9kb23"],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "hello@pandaoffer.top",
                "contactType": "customer service"
              }
            }
          ])
        }}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full">
        <HomeClientManager 
          studyTourLead={<StudyTourLead />}
          heroHeader={<HeroHeader />}
          toolsMenu={<ToolsMenu />}
          affiliates={<AffiliatesList />}
          discoverChina={<DiscoverChina />}
          socialProof={<SocialProof />}
          premiumServices={<PremiumServices />}

        />
        <MedicalTourismBanner />
      </main>

      <Footer />
    </div>
  );
}
