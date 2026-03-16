import { Inter, Outfit } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Toaster } from 'sonner';
import "./globals.css";

// 引入 Next.js 默认的优化字体
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

// Global SEO metadata (displayed in browser tabs and Google search results)
export const metadata = {
  metadataBase: new URL('https://www.pandaoffer.top'),
  verification: {
    google: 'zLREZ7AR-fIkNCQu19gJE9hmMZZEAqMEedboCeo1zyE',
  },
  title: {
    default: "PandaOffer | Your Ultimate Guide to Studying in China",
    template: "%s | PandaOffer"
  },
  description: "Zero BS. Just Your Best Fit in China. Get instant, AI-driven insights on university matching, WHO/NMC certification, and CSC Scholarship probability.",
  keywords: ["Study in China", "Chinese Universities", "MBBS in China", "CSC Scholarship", "China Admissions", "Study Abroad", "PandaOffer"],
  authors: [{ name: "PandaOffer Team" }],
  creator: "PandaOffer",
  publisher: "PandaOffer",
  openGraph: {
    title: "PandaOffer | Your Ultimate Guide to Studying in China",
    description: "Zero BS. Just Your Best Fit in China. Get instant, AI-driven insights on university matching, WHO/NMC certification, and CSC Scholarship probability.",
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
    title: "PandaOffer | Your Ultimate Guide to Studying in China",
    description: "Zero BS. Just Your Best Fit in China. Get instant, AI-driven insights on university matching, WHO/NMC certification, and CSC Scholarship probability.",
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
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        
        {/* 这里是你网站的所有页面内容 */}
        {children}
        
        <Toaster position="bottom-right" richColors />
        
        {/* Google Analytics 追踪代码 */}
        {/* ⚠️ 极其重要：请务必将下面的 G-XXXXXXXXXX 替换为你在 GA 后台拿到的真实 ID */}
        <GoogleAnalytics gaId="G-WGF1X2F14X" />
        
      </body>
    </html>
  );
}