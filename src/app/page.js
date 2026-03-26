import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomeClientManager from '@/components/home/HomeClientManager';
import HeroHeader from '@/components/home/HeroHeader';
import AffiliatesList from '@/components/home/AffiliatesList';
import DiscoverChina from '@/components/home/DiscoverChina';
import SocialProof from '@/components/home/SocialProof';
import PremiumServices from '@/components/home/PremiumServices';

import ToolsMenu from '@/components/tools/ToolsMenu';
import MedicalTourismBanner from '@/components/home/MedicalTourismBanner';

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
              "description": "PandaOffer (Panda Offer) is an AI-powered platform helping international students study in China — university matching, CSC Scholarship guidance, and MBBS program recommendations.",
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