import Navbar from '@/components/layout/Navbar';
import HomeClientManager from '@/components/home/HomeClientManager';
import HeroHeader from '@/components/home/HeroHeader';
import BudgetCalculator from '@/components/home/BudgetCalculator';
import AffiliatesList from '@/components/home/AffiliatesList';
import DiscoverChina from '@/components/home/DiscoverChina';
import SocialProof from '@/components/home/SocialProof';
import PremiumServices from '@/components/home/PremiumServices';
import FAQSection from '@/components/home/FAQSection';

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
              "url": "https://www.pandaoffer.top/"
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PandaOffer",
              "url": "https://www.pandaoffer.top/",
              "logo": "https://www.pandaoffer.top/og-image.jpg"
            }
          ])
        }}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full">
        <HomeClientManager 
          heroHeader={<HeroHeader />}
          budgetCalculator={<BudgetCalculator />}
          affiliates={<AffiliatesList />}
          discoverChina={<DiscoverChina />}
          socialProof={<SocialProof />}
          premiumServices={<PremiumServices />}
          faqSection={<FAQSection />}
        />
      </main>
    </div>
  );
}