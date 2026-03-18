import React from 'react';
import { RotateCcw } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Refund Policy',
  description: 'PandaOffer refund policy — learn about our money-back guarantee, eligibility, and how to request a refund.',
  openGraph: {
    title: 'Refund Policy | PandaOffer',
    description: 'PandaOffer refund policy — learn about our money-back guarantee, eligibility, and how to request a refund.',
    url: 'https://www.pandaoffer.top/refund',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pandaoffer.top/refund',
  },
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 mb-8 transition-colors">
          &larr; Back to Home
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <RotateCcw size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading">Refund Policy</h1>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="text-sm text-slate-500 mb-8">Last Updated: March 2026</p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Our Guarantee</h2>
            <p className="mb-4">
              At PandaOffer, your satisfaction is our priority. We stand behind our services with a transparent refund policy. If you are not satisfied with your purchase, you may request a refund within the applicable timeframe outlined below.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Eligibility for Refunds</h2>
            <p className="mb-4">Refund eligibility depends on the service purchased:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>1v1 Strategy Call ($49):</strong> Full refund if the session has not yet taken place. If you have attended the session, refunds are not available as the service has been delivered.</li>
              <li><strong>CSC Scholarship Pro ($299):</strong> Full refund within 14 days of purchase if you have not yet received your completed documents (SOP, recommendation letters, professor contact list).</li>
              <li><strong>Done-For-You Package ($899+):</strong> Guaranteed admission or 100% refund. If we are unable to secure an admission offer from any of the agreed-upon universities, you will receive a full refund.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. How to Request a Refund</h2>
            <p className="mb-4">To request a refund, please follow these steps:</p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Send an email to <a href="mailto:hello@pandaoffer.top" className="text-emerald-600 hover:text-emerald-700 underline">hello@pandaoffer.top</a> with the subject line &quot;Refund Request&quot;.</li>
              <li>Include your full name, the email address used for purchase, and the service you purchased.</li>
              <li>Briefly describe the reason for your refund request.</li>
            </ol>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Processing Time</h2>
            <p className="mb-4">
              Once we receive your refund request, we will review it within 5 business days. If approved, the refund will be processed to your original payment method within 7–10 business days. Refunds are issued by our payment partner, Paddle, who acts as the Merchant of Record.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Non-Refundable Situations</h2>
            <p className="mb-4">Refunds are not available in the following situations:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>The service has already been fully delivered (e.g., completed strategy call, delivered application documents).</li>
              <li>The refund request is submitted after the applicable refund window has closed.</li>
              <li>The customer provided false or misleading information that affected the outcome of the service.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">6. Chargebacks</h2>
            <p className="mb-4">
              We encourage you to contact us directly before initiating a chargeback with your bank or credit card company. We are committed to resolving any issues promptly and fairly.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Refund Policy or wish to discuss your situation, please contact us at <a href="mailto:hello@pandaoffer.top" className="text-emerald-600 hover:text-emerald-700 underline">hello@pandaoffer.top</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
