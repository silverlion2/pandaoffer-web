import '@fontsource-variable/inter';
import '@fontsource-variable/outfit';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Toaster } from 'sonner';
import RouteVoteWidget from '@/components/engagement/RouteVoteWidget';
import AuthProvider from '@/components/providers/AuthProvider';
import { ModeProvider } from '@/components/providers/ModeProvider';
import './globals.css';

const siteJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.pandaoffer.top/#organization',
    name: 'PandaOffer',
    alternateName: 'Panda Offer',
    url: 'https://www.pandaoffer.top/',
    logo: 'https://www.pandaoffer.top/og-image.jpg',
    description:
      'PandaOffer helps international students study in China with AI university matching, CSC scholarship planning, MBBS guidance, China study tours, and application support.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@pandaoffer.top',
      contactType: 'customer support',
      availableLanguage: ['English', 'Chinese'],
    },
    sameAs: ['https://discord.gg/7bU9kb23'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.pandaoffer.top/#website',
    name: 'PandaOffer',
    alternateName: 'Panda Offer',
    url: 'https://www.pandaoffer.top/',
    publisher: {
      '@id': 'https://www.pandaoffer.top/#organization',
    },
  },
];

export const metadata = {
  metadataBase: new URL('https://www.pandaoffer.top'),
  applicationName: 'PandaOffer',
  verification: {
    google: 'zLREZ7AR-fIkNCQu19gJE9hmMZZEAqMEedboCeo1zyE',
  },
  title: {
    default: 'PandaOffer (Panda Offer) | AI-Powered Study in China Guide',
    template: '%s | PandaOffer',
  },
  description:
    'PandaOffer (Panda Offer) is an AI-powered Study in China guide with university matching, CSC scholarship planning, WHO/NMC-recognized MBBS guidance, China study tours, and expert support for international students.',
  keywords: [
    'PandaOffer',
    'Panda Offer',
    'pandaoffer.top',
    'Study in China',
    'Study in China 2026',
    'CSC Scholarship',
    'CSC Scholarship 2026',
    'MBBS in China',
    'Chinese Universities',
    'China Admissions',
    'Study Abroad China',
    'Chinese Government Scholarship',
    'Universities in China for international students',
    'C9 League universities',
    '985 universities China',
    'China study tours',
  ],
  authors: [{ name: 'PandaOffer Team' }],
  creator: 'PandaOffer',
  publisher: 'PandaOffer',
  category: 'education',
  alternates: {
    canonical: 'https://www.pandaoffer.top/',
  },
  openGraph: {
    title: 'PandaOffer (Panda Offer) | AI-Powered Study in China Guide',
    description:
      'PandaOffer helps international students study in China with AI matching, CSC scholarship planning, MBBS guidance, China study tours, and expert application support.',
    url: 'https://www.pandaoffer.top/',
    siteName: 'PandaOffer',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PandaOffer - Study in China',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PandaOffer (Panda Offer) | AI-Powered Study in China Guide',
    description:
      'AI university matching, CSC scholarship planning, MBBS guidance, China study tours, and application support for international students.',
    images: ['/og-image.jpg'],
    site: '@pandaoffer',
    creator: '@pandaoffer',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="zLREZ7AR-fIkNCQu19gJE9hmMZZEAqMEedboCeo1zyE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="font-sans">
        <ModeProvider>
          <AuthProvider>
            {children}
            <RouteVoteWidget />
          </AuthProvider>
        </ModeProvider>

        <Toaster position="bottom-right" richColors />
        <GoogleAnalytics gaId="G-WGF1X2F14X" />
      </body>
    </html>
  );
}
