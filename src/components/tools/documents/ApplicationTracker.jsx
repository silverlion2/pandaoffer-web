"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const STATUS_OPTIONS = [
  { id: 'not_started', label: 'Not Started', color: 'bg-slate-200 text-slate-600' },
  { id: 'in_progress', label: 'In Progress', color: 'bg-amber-100 text-amber-700' },
  { id: 'submitted', label: 'Submitted', color: 'bg-blue-100 text-blue-700' },
  { id: 'verified', label: 'Verified', color: 'bg-emerald-100 text-emerald-700' },
];

const STANDARD_DOCS = [
  { id: 'passport', title: 'Passport Copy' },
  { id: 'photo', title: 'Passport Photos' },
  { id: 'diploma', title: 'Degree Certificate' },
  { id: 'transcript', title: 'Academic Transcripts' },
  { id: 'study_plan', title: 'Study Plan / SOP' },
  { id: 'recommendation_1', title: 'Recommendation Letter 1' },
  { id: 'recommendation_2', title: 'Recommendation Letter 2' },
  { id: 'medical', title: 'Physical Examination Form' },
  { id: 'police', title: 'Non-Criminal Record' },
  { id: 'financial', title: 'Financial Proof' },
  { id: 'language', title: 'Language Certificate' },
  { id: 'csc_form', title: 'CSC Application Form' },
];

const STORAGE_KEY = 'pandaoffer_app_tracker';

function loadTracker() {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveTracker(universities) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(universities));
  } catch { /* quota exceeded */ }
}

export default function ApplicationTracker() {
  const [universities, setUniversities] = useState([]);
  const [newUniName, setNewUniName] = useState('');
  const [newUniDeadline, setNewUniDeadline] = useState('');
  const [expandedUni, setExpandedUni] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUniversities(loadTracker());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveTracker(universities);
    }
  }, [universities, hydrated]);

  const addUniversity = useCallback(() => {
    if (!newUniName.trim()) return;
    const newUni = {
      id: `uni_${Date.now()}`,
      name: newUniName.trim(),
      deadline: newUniDeadline || null,
      docs: STANDARD_DOCS.reduce((acc, doc) => {
        acc[doc.id] = 'not_started';
        return acc;
      }, {}),
    };
    setUniversities(prev => [...prev, newUni]);
    setNewUniName('');
    setNewUniDeadline('');
    setExpandedUni(newUni.id);
  }, [newUniName, newUniDeadline]);

  const removeUniversity = (uniId) => {
    setUniversities(prev => prev.filter(u => u.id !== uniId));
    setConfirmDelete(null);
    if (expandedUni === uniId) setExpandedUni(null);
  };

  const cycleStatus = (uniId, docId) => {
    const order = ['not_started', 'in_progress', 'submitted', 'verified'];
    setUniversities(prev =>
      prev.map(uni => {
        if (uni.id !== uniId) return uni;
        const currentIdx = order.indexOf(uni.docs[docId] || 'not_started');
        const nextIdx = (currentIdx + 1) % order.length;
        return {
          ...uni,
          docs: { ...uni.docs, [docId]: order[nextIdx] },
        };
      })
    );
  };

  const getProgress = (uni) => {
    const total = STANDARD_DOCS.length;
    const completed = Object.values(uni.docs).filter(
      s => s === 'submitted' || s === 'verified'
    ).length;
    return Math.round((completed / total) * 100);
  };

  const getProgressColor = (pct) => {
    if (pct === 100) return 'bg-emerald-500';
    if (pct >= 60) return 'bg-blue-500';
    if (pct >= 30) return 'bg-amber-500';
    return 'bg-slate-300';
  };

  if (!hydrated) {
    return (
      <div className="p-12 text-center text-slate-400 text-sm">Loading tracker...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add University */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Add a University</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newUniName}
            onChange={(e) => setNewUniName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addUniversity()}
            placeholder="University name (e.g. Zhejiang University)"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all bg-white placeholder:text-slate-400"
          />
          <input
            type="date"
            value={newUniDeadline}
            onChange={(e) => setNewUniDeadline(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all bg-white text-slate-600"
          />
          <button
            onClick={addUniversity}
            disabled={!newUniName.trim()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-sm hover:bg-rose-600 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      {/* University Cards */}
      {universities.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg mb-2">No universities added yet</p>
          <p className="text-sm">Add a university above to start tracking your application documents.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {universities.map(uni => {
            const progress = getProgress(uni);
            const isExpanded = expandedUni === uni.id;
            const daysLeft = uni.deadline
              ? Math.ceil((new Date(uni.deadline) - new Date()) / (1000 * 60 * 60 * 24))
              : null;

            return (
              <div
                key={uni.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                {/* University Header */}
                <div
                  className="flex items-center gap-4 p-5 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedUni(isExpanded ? null : uni.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-slate-900">{uni.name}</h3>
                      {daysLeft !== null && (
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          daysLeft <= 7 ? 'bg-red-100 text-red-600' :
                          daysLeft <= 30 ? 'bg-amber-100 text-amber-600' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? 'Due today!' : 'Past deadline'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${getProgressColor(progress)}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{progress}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {confirmDelete === uni.id ? (
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => removeUniversity(uni.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-all"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-300 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); setConfirmDelete(uni.id); }}
                        className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
                        title="Remove university"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    {isExpanded ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                  </div>
                </div>

                {/* Document Grid */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-5 bg-slate-50/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {STANDARD_DOCS.map(doc => {
                        const status = uni.docs[doc.id] || 'not_started';
                        const statusInfo = STATUS_OPTIONS.find(s => s.id === status);
                        return (
                          <div
                            key={doc.id}
                            onClick={() => cycleStatus(uni.id, doc.id)}
                            className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:shadow-sm transition-all"
                          >
                            <span className="text-sm font-medium text-slate-700">{doc.title}</span>
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-slate-400 mt-3 text-center">
                      Click any document to cycle its status: Not Started → In Progress → Submitted → Verified
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Info */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
        <p className="text-xs text-slate-400">
          💾 Your tracker is automatically saved in your browser. No account needed.
        </p>
      </div>
    </div>
  );
}
