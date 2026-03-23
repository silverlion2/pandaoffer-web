import '@fontsource-variable/inter';
import '@fontsource-variable/outfit';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Toaster } from 'sonner';
import AuthProvider from '@/components/providers/AuthProvider';
import { ModeProvider } from '@/components/providers/ModeProvider';
import "./globals.css";

// Global SEO metadata (displayed in browser tabs and Google search results)
export const metadata = {
  metadataBase: new URL('https://www.pandaoffer.top'),
  verification: {
    google: 'zLREZ7AR-fIkNCQu19gJE9hmMZZEAqMEedboCeo1zyE',
  },
  title: {
    default: "PandaOffer (Panda Offer) | AI-Powered Study in China Guide",
    template: "%s | PandaOffer"
  },
  description: "PandaOffer (Panda Offer) — your ultimate guide to studying in China. AI-driven university matching, CSC Scholarship probability calculator, WHO/NMC-recognized MBBS programs, and expert guidance for international students.",
  keywords: ["PandaOffer", "Panda Offer", "pandaoffer.top", "Study in China", "Study in China 2026", "CSC Scholarship", "CSC Scholarship 2026", "MBBS in China", "Chinese Universities", "China Admissions", "Study Abroad China", "Chinese Government Scholarship", "Universities in China for international students", "C9 League universities", "985 universities China"],
  authors: [{ name: "PandaOffer Team" }],
  creator: "PandaOffer",
  publisher: "PandaOffer",
  alternates: {
    canonical: 'https://www.pandaoffer.top',
  },
  openGraph: {
    title: "PandaOffer (Panda Offer) | AI-Powered Study in China Guide",
    description: "PandaOffer (Panda Offer) — AI-driven university matching, CSC Scholarship calculator, and expert guidance for international students studying in China.",
    url: "https://www.pandaoffer.top",
    siteName: "PandaOffer",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PandaOffer - Study in China",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PandaOffer (Panda Offer) | AI-Powered Study in China Guide",
    description: "PandaOffer (Panda Offer) — AI-driven university matching, CSC Scholarship calculator, and expert guidance for international students studying in China.",
    images: ["/og-image.jpg"],
    creator: "@pandaoffer",
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
      </head>
      <body className="font-sans">
        <ModeProvider>
          <AuthProvider>
            {/* 这里是你网站的所有页面内容 */}
            {children}
          </AuthProvider>
        </ModeProvider>
        
        <Toaster position="bottom-right" richColors />
        
        {/* Google Analytics 追踪代码 */}
        {/* ⚠️ 极其重要：请务必将下面的 G-XXXXXXXXXX 替换为你在 GA 后台拿到的真实 ID */}
        <GoogleAnalytics gaId="G-WGF1X2F14X" />
        
      </body>
    </html>
  );
}