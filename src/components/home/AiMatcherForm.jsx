"use client";

import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { aiMatcherSchema } from '@/lib/schema';

export default function AiMatcherForm({ onSubmit, defaultValues }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(aiMatcherSchema),
    defaultValues: defaultValues
  });

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 max-w-2xl mx-auto text-left relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10"></div>
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10 font-heading">
        <Search className="text-emerald-500" /> Find My Top 3 Universities
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nationality</label>
            <select 
              {...register('nationality')}
              className={`w-full p-3 bg-slate-50 border ${errors.nationality ? 'border-red-500' : 'border-slate-200'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none`}
            >
              <option value="">Select country...</option>
              <option value="India">India</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Other">Other</option>
            </select>
            {errors.nationality && <p className="text-xs text-red-500">{errors.nationality.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Target Major</label>
            <select 
              {...register('major')}
              className={`w-full p-3 bg-slate-50 border ${errors.major ? 'border-red-500' : 'border-slate-200'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none`}
            >
              <option value="">Select major...</option>
              <option value="MBBS">Medicine (MBBS - English)</option>
              <option value="STEM">Engineering / STEM</option>
              <option value="Business">Business / Economy</option>
            </select>
            {errors.major && <p className="text-xs text-red-500">{errors.major.message}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Current GPA / Marks</label>
          <div className="flex gap-2">
            <select
              {...register('gpa.scale')}
              className={`w-1/3 p-3 bg-slate-50 border ${errors.gpa?.scale ? 'border-red-500' : 'border-slate-200'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none`}
            >
              <option value="percentage">Percentage (%)</option>
              <option value="four">4.0 Scale</option>
              <option value="five">5.0 Scale</option>
            </select>
            <input 
              type="text" 
              placeholder="e.g. 85 or 3.5" 
              {...register('gpa.value')}
              className={`w-2/3 p-3 bg-slate-50 border ${errors.gpa?.value ? 'border-red-500' : 'border-slate-200'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:shadow-emerald-500/10 transition-all outline-none shadow-inner`}
            />
          </div>
          {errors.gpa?.value && <p className="text-xs text-red-500">{errors.gpa.value.message}</p>}
        </div>
        <button 
          type="submit" 
          className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1"
        >
          Unlock My Free AI Report <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
}
