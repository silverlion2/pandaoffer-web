import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

// 引入 Next.js 默认的优化字体
const inter = Inter({ subsets: ["latin"] });

// 这是你网站的全局 SEO 元数据（显示在浏览器标签页和 Google 搜索结果中）
export const metadata = {
  title: "PandaOffer | Your Ultimate Guide to Studying in China",
  description: "Zero BS. Just Your Best Fit in China. Get instant, AI-driven insights on university matching, WHO/NMC certification, and CSC Scholarship probability.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {/* 这里是你网站的所有页面内容 */}
        {children}
        
        {/* Google Analytics 追踪代码 */}
        {/* ⚠️ 极其重要：请务必将下面的 G-XXXXXXXXXX 替换为你在 GA 后台拿到的真实 ID */}
        <GoogleAnalytics gaId="G-WGF1X2F14X" />
        
      </body>
    </html>
  );
}