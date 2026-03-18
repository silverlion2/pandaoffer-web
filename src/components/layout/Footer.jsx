import Link from 'next/link';
import { MessageSquare, Mail, Heart } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">PandaOffer</span>
            </div>
            <p className="text-sm leading-relaxed">
              Zero BS. Just your best fit in China. AI-driven university matching, WHO/NMC verification, and CSC Scholarship guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog & Guides</Link></li>
              <li><Link href="/blog/csc-scholarship-guide-2026" className="hover:text-emerald-400 transition-colors">CSC Scholarship Guide</Link></li>
              <li><Link href="/blog/mbbs-in-china-who-recognized" className="hover:text-emerald-400 transition-colors">MBBS Universities</Link></li>
              <li><Link href="/blog/cost-of-living-china-2026" className="hover:text-emerald-400 transition-colors">Cost of Living</Link></li>
              <li><Link href="/blog/china-student-visa-x1-x2-guide" className="hover:text-emerald-400 transition-colors">Visa Guide</Link></li>
            </ul>
          </div>

          {/* Study Guides */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Study Guides</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/china-university-tiers-c9-985-211" className="hover:text-emerald-400 transition-colors">University Tiers Explained</Link></li>
              <li><Link href="/blog/how-to-write-csc-study-plan" className="hover:text-emerald-400 transition-colors">CSC Study Plan Template</Link></li>
              <li><Link href="/blog/documents-needed-study-china" className="hover:text-emerald-400 transition-colors">Document Checklist</Link></li>
              <li><Link href="/blog/beijing-vs-hangzhou-where-to-study" className="hover:text-emerald-400 transition-colors">Beijing vs. Hangzhou</Link></li>
              <li><Link href="/blog/first-30-days-china-survival" className="hover:text-emerald-400 transition-colors">First 30 Days Survival</Link></li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href={siteConfig.links.discord} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare size={14} /> Join Discord
                </a>
              </li>
              <li>
                <a 
                  href="mailto:hello@pandaoffer.top" 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Mail size={14} /> hello@pandaoffer.top
                </a>
              </li>
            </ul>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mt-6 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-emerald-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} PandaOffer. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-red-400" /> for international students worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
