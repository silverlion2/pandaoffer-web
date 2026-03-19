"use client";

import React, { useState } from 'react';
import { FileCheck, PenTool, GraduationCap, Mail, ClipboardList } from 'lucide-react';
import ApplicationChecklist from './documents/ApplicationChecklist';
import StudyPlanGenerator from './documents/StudyPlanGenerator';
import SOPGenerator from './documents/SOPGenerator';
import RecommendationTemplate from './documents/RecommendationTemplate';
import ApplicationTracker from './documents/ApplicationTracker';

const TABS = [
  {
    id: 'checklist',
    label: 'Application Checklist',
    shortLabel: 'Checklist',
    icon: FileCheck,
    color: 'blue',
    description: 'Generate a personalized, 100% definitive document checklist so you don\u2019t miss anything.',
    Component: ApplicationChecklist,
  },
  {
    id: 'study-plan',
    label: 'CSC Study Plan',
    shortLabel: 'Study Plan',
    icon: PenTool,
    color: 'blue',
    description: 'Fill in guided sections to generate a CSC-ready Study Plan with live preview and word count.',
    Component: StudyPlanGenerator,
  },
  {
    id: 'sop',
    label: 'Statement of Purpose',
    shortLabel: 'SOP',
    icon: GraduationCap,
    color: 'indigo',
    description: 'Create a compelling personal statement with guided prompts for each section.',
    Component: SOPGenerator,
  },
  {
    id: 'recommendation',
    label: 'Recommendation Letter',
    shortLabel: 'Rec Letter',
    icon: Mail,
    color: 'emerald',
    description: 'Generate a professional recommendation letter template to share with your professor.',
    Component: RecommendationTemplate,
  },
  {
    id: 'tracker',
    label: 'Application Tracker',
    shortLabel: 'Tracker',
    icon: ClipboardList,
    color: 'rose',
    description: 'Track document status across multiple university applications. Saved in your browser.',
    Component: ApplicationTracker,
  },
];

export default function DocumentWizard() {
  const [activeTab, setActiveTab] = useState('checklist');

  const currentTab = TABS.find(t => t.id === activeTab) || TABS[0];
  const ActiveComponent = currentTab.Component;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-3 font-heading">Document Generator & Templates</h2>
        <p className="text-slate-500 text-sm">
          Everything you need to prepare, write, and track your application documents — free and ready to use.
        </p>
      </div>

      {/* Tab Bar */}
      <div className="mb-8">
        <div className="flex overflow-x-auto scrollbar-hide -mx-2 px-2 pb-2 gap-1.5 sm:gap-2">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Description */}
      <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <p className="text-sm text-slate-600 text-center">{currentTab.description}</p>
      </div>

      {/* Active Tab Content */}
      <ActiveComponent />
    </div>
  );
}
