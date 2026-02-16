'use client';

import { useState } from 'react';

const certifications = [
  {
    id: 'mo-210',
    name: 'MO-210 — Microsoft Excel 365',
    issuer: 'Microsoft',
    status: 'In Progress' as const,
    progress: 60,
    examDate: 'Mar 2026',
    topics: [
      { name: 'Manage Worksheets and Workbooks', done: true },
      { name: 'Manage Data Cells and Ranges', done: true },
      { name: 'Manage Tables and Table Data', done: true },
      { name: 'Perform Operations by Using Formulas and Functions', done: false },
      { name: 'Manage Charts', done: false },
    ],
  },
  {
    id: 'az-900',
    name: 'AZ-900 — Azure Fundamentals',
    issuer: 'Microsoft',
    status: 'In Progress' as const,
    progress: 40,
    examDate: 'Apr 2026',
    topics: [
      { name: 'Describe Cloud Concepts', done: true },
      { name: 'Describe Azure Architecture and Services', done: true },
      { name: 'Describe Azure Management and Governance', done: false },
      { name: 'Practice Exams', done: false },
    ],
  },
  {
    id: 'dp-900',
    name: 'DP-900 — Azure Data Fundamentals',
    issuer: 'Microsoft',
    status: 'In Progress' as const,
    progress: 15,
    examDate: 'Jun 2026',
    topics: [
      { name: 'Describe Core Data Concepts', done: true },
      { name: 'Identify Considerations for Relational Data', done: false },
      { name: 'Describe Considerations for Working with Non-Relational Data', done: false },
      { name: 'Describe an Analytics Workload on Azure', done: false },
      { name: 'Practice Exams', done: false },
    ],
  },
];

const studyLog = [
  { date: 'Feb 15', subject: 'AZ-900 Module 3', duration: '45 min' },
  { date: 'Feb 13', subject: 'MO-210 Formulas Practice', duration: '1 hr' },
  { date: 'Feb 11', subject: 'DP-900 Core Concepts', duration: '30 min' },
  { date: 'Feb 9', subject: 'AZ-900 Module 2 Review', duration: '1 hr' },
  { date: 'Feb 7', subject: 'MO-210 Tables Deep Dive', duration: '45 min' },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    'In Progress': 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30',
    'Completed': 'bg-[#00d4aa]/15 text-[#00d4aa] border-[#00d4aa]/30',
    'Not Started': 'bg-[#555]/15 text-[#888] border-[#555]/30',
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colors[status] || colors['Not Started']}`}>
      {status}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
      <div
        className="h-full bg-[#0080FF] rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function CertificationsPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ 'mo-210': true, 'az-900': true, 'dp-900': true });

  const toggle = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-background text-text p-8 pl-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0080FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="10" r="6" />
          <path d="M12 16v6" />
          <path d="M8 22l4-2 4 2" />
          <path d="M10 7l2 2 4-4" />
        </svg>
        <h1 className="text-2xl font-semibold text-white">Certifications</h1>
      </div>
      <p className="text-[#888] mb-8 ml-[40px]">Track your professional development</p>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Certs in Progress', value: '3' },
          { label: 'Study Hours (Feb)', value: '12' },
          { label: 'Next Exam', value: 'MO-210 · Mar 2026' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-5">
            <div className="text-xs text-[#888] uppercase tracking-wider mb-1">{s.label}</div>
            <div className="text-lg font-semibold text-white">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Certification Cards */}
      <div className="space-y-4 mb-10">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{cert.name}</h2>
                <p className="text-sm text-[#888]">{cert.issuer}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#888]">Exam: {cert.examDate}</span>
                <StatusBadge status={cert.status} />
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <ProgressBar value={cert.progress} />
              <span className="text-sm font-medium text-[#0080FF] whitespace-nowrap">{cert.progress}%</span>
            </div>

            <button
              onClick={() => toggle(cert.id)}
              className="text-xs text-[#888] hover:text-white transition-colors mb-3"
            >
              {expanded[cert.id] ? '▾ Hide topics' : '▸ Show topics'}
            </button>

            {expanded[cert.id] && (
              <div className="space-y-2 mt-2">
                {cert.topics.map((topic) => (
                  <div key={topic.name} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${topic.done ? 'bg-[#00d4aa]/20 border-[#00d4aa]' : 'border-[#333]'}`}>
                      {topic.done && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${topic.done ? 'text-[#ccc]' : 'text-[#888]'}`}>{topic.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Study Log */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Study Sessions</h2>
        <div className="space-y-3">
          {studyLog.map((entry, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-[#1a1a1a] last:border-0">
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#888] w-14">{entry.date}</span>
                <span className="text-sm text-[#ccc]">{entry.subject}</span>
              </div>
              <span className="text-sm text-[#888]">{entry.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
