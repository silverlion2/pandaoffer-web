import React from 'react';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | PandaOffer',
  description: 'Learn how PandaOffer protects your privacy and handles your data.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 mb-8 transition-colors">
          &larr; Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <Shield size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading">Privacy Policy</h1>
          </div>
          
          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="text-sm text-slate-500 mb-8">Last Updated: March 2026</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              PandaOffer collects information you provide directly to us when you use our service, such as:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Contact Information:</strong> Your email address when you sign up to receive your personalized university matches.</li>
              <li><strong>Search Criteria:</strong> Academic scores, budget preferences, desired subjects, and city preferences entered into our AI matching tool.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Generate and deliver your personalized list of Chinese universities.</li>
              <li>Improve our AI matching algorithms and website features.</li>
              <li>Communicate with you regarding our services, updates, or offers.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Data Security and Sharing</h2>
            <p className="mb-4">
              We implement reasonable security measures to protect your data. We do not sell your personal information to third parties. We may share anonymized, aggregated search trends for statistical purposes but these cannot be linked back to you.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Third-Party Links</h2>
            <p className="mb-4">
              Our website may contain affiliate links or links to third-party services (like payment processors or VPN providers). We are not responsible for the privacy practices of these external sites. We encourage you to read their respective privacy policies.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Your Rights</h2>
            <p className="mb-4">
              You have the right to request access to, correction of, or deletion of your personal data held by us. To exercise these rights or ask any questions about this Privacy Policy, please contact us.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">6. Payment Data</h2>
            <p className="mb-4">
              Payments for our premium services are processed by <strong>Paddle</strong>, who acts as our Merchant of Record. PandaOffer does not collect, store, or have access to your credit card numbers, bank account details, or other sensitive payment information. All payment data is handled securely by Paddle in accordance with PCI DSS standards. For more information, please refer to <a href="https://www.paddle.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">Paddle&apos;s Privacy Policy</a>.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or how your data is handled, please contact us at <a href="mailto:hello@pandaoffer.top" className="text-emerald-600 hover:text-emerald-700 underline">hello@pandaoffer.top</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
