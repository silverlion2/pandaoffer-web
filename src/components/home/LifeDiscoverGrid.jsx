import Link from 'next/link';
import { Coffee, Users, Smartphone } from 'lucide-react';

export default function LifeDiscoverGrid() {
  return (
    <div id="discover" className="pt-8 border-t border-slate-200 mt-12">

      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading">Life in China</h2>
          <p className="text-slate-500 mt-2">Essential guides for surviving and thriving as a foreign student.</p>
        </div>
        <Link href="/blog" className="text-indigo-600 font-bold hover:underline hidden md:block">
          View all guides &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/blog/cashless-survival-alipay-wechat" className="group cursor-pointer block">
          <div className="h-48 bg-slate-200 rounded-2xl mb-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center transition-transform group-hover:scale-105">
               <Smartphone size={48} className="text-white opacity-50" />
            </div>
            <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
              Day 1 Essential
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
            Cashless Survival: Alipay & WeChat Pay
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2">
            China is virtually cashless. Link your foreign card and start paying for everything from trains to street food.
          </p>
        </Link>

        <Link href="/blog/making-friends-dating-social-life-china" className="group cursor-pointer block">
          <div className="h-48 bg-slate-200 rounded-2xl mb-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center transition-transform group-hover:scale-105">
               <Users size={48} className="text-white opacity-50" />
            </div>
            <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
              Social Life
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
            Making Friends & Social Life in China
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2">
            From campus clubs to city meetups — how to build genuine friendships and navigate the social scene.
          </p>
        </Link>

        <Link href="/blog/campus-food-complete-guide" className="group cursor-pointer block">
          <div className="h-48 bg-slate-200 rounded-2xl mb-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center transition-transform group-hover:scale-105">
               <Coffee size={48} className="text-white opacity-50" />
            </div>
            <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
              Daily Life
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
            Campus Food: The Complete Guide
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2">
            Canteen culture, halal options, Meituan delivery, and how to eat well on a student budget.
          </p>
        </Link>
      </div>
    </div>
  );
}
