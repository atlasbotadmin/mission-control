'use client';

import { useState, useCallback, useMemo } from 'react';

interface SubSection {
  name: string;
  done: boolean;
}

interface Module {
  name: string;
  subSections: SubSection[];
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  examDate: string;
  modules: Module[];
}

const initialCertifications: Certification[] = [
  {
    id: 'mo-210',
    name: 'MO-210 — Microsoft Excel 365',
    issuer: 'Microsoft',
    examDate: 'Mar 2026',
    modules: [
      { name: 'Manage Worksheets and Workbooks', subSections: [
        { name: 'Navigate within workbooks', done: true },
        { name: 'Format worksheets and workbooks', done: true },
        { name: 'Customize options and views', done: true },
        { name: 'Configure content for collaboration', done: true },
      ]},
      { name: 'Manage Data Cells and Ranges', subSections: [
        { name: 'Manipulate data in worksheets', done: true },
        { name: 'Format cells and ranges', done: true },
        { name: 'Define and reference named ranges', done: true },
        { name: 'Summarize data visually', done: true },
      ]},
      { name: 'Manage Tables and Table Data', subSections: [
        { name: 'Create and format tables', done: true },
        { name: 'Modify tables', done: true },
        { name: 'Filter and sort table data', done: true },
      ]},
      { name: 'Perform Operations by Using Formulas and Functions', subSections: [
        { name: 'Insert references', done: false },
        { name: 'Calculate and transform data', done: false },
        { name: 'Format and modify text', done: false },
        { name: 'Perform logical operations', done: false },
        { name: 'Look up data with functions', done: false },
      ]},
      { name: 'Manage Charts', subSections: [
        { name: 'Create charts', done: false },
        { name: 'Modify charts', done: false },
        { name: 'Format charts', done: false },
      ]},
    ],
  },
  {
    id: 'az-900',
    name: 'AZ-900 — Azure Fundamentals',
    issuer: 'Microsoft',
    examDate: 'Apr 2026',
    modules: [
      { name: 'Describe Cloud Concepts', subSections: [
        { name: 'Define cloud computing', done: true },
        { name: 'Describe the benefits of cloud services', done: true },
        { name: 'Describe cloud service types (IaaS, PaaS, SaaS)', done: true },
      ]},
      { name: 'Describe Azure Architecture and Services', subSections: [
        { name: 'Describe core Azure architectural components', done: true },
        { name: 'Describe Azure compute and networking', done: true },
        { name: 'Describe Azure storage services', done: true },
        { name: 'Describe Azure identity, access, and security', done: true },
      ]},
      { name: 'Describe Azure Management and Governance', subSections: [
        { name: 'Describe cost management in Azure', done: false },
        { name: 'Describe features and tools for governance and compliance', done: false },
        { name: 'Describe features and tools for managing and deploying Azure resources', done: false },
        { name: 'Describe monitoring tools in Azure', done: false },
      ]},
      { name: 'Practice Exams', subSections: [
        { name: 'Microsoft Learn practice assessment', done: false },
        { name: 'Third-party practice tests', done: false },
        { name: 'Review weak areas', done: false },
      ]},
    ],
  },
  {
    id: 'dp-900',
    name: 'DP-900 — Azure Data Fundamentals',
    issuer: 'Microsoft',
    examDate: 'Jun 2026',
    modules: [
      { name: 'Describe Core Data Concepts', subSections: [
        { name: 'Describe ways to represent data', done: true },
        { name: 'Identify options for data storage', done: true },
        { name: 'Describe common data workloads', done: true },
        { name: 'Identify roles and responsibilities for data workloads', done: true },
      ]},
      { name: 'Identify Considerations for Relational Data', subSections: [
        { name: 'Describe relational concepts', done: false },
        { name: 'Describe normalization', done: false },
        { name: 'Identify common SQL statements', done: false },
        { name: 'Describe common database objects', done: false },
      ]},
      { name: 'Describe Considerations for Non-Relational Data', subSections: [
        { name: 'Describe Azure storage services for non-relational data', done: false },
        { name: 'Describe Azure Cosmos DB', done: false },
        { name: 'Describe characteristics of non-relational data', done: false },
      ]},
      { name: 'Describe an Analytics Workload', subSections: [
        { name: 'Describe common elements of large-scale analytics', done: false },
        { name: 'Describe data warehousing', done: false },
        { name: 'Describe real-time data analytics', done: false },
        { name: 'Describe data visualization in Power BI', done: false },
      ]},
      { name: 'Practice Exams', subSections: [
        { name: 'Microsoft Learn practice assessment', done: false },
        { name: 'Third-party practice tests', done: false },
        { name: 'Review weak areas', done: false },
      ]},
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
  const color = value === 100 ? '#00d4aa' : '#0080FF';
  return (
    <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

function Checkbox({ checked, onChange, size = 16 }: { checked: boolean; onChange: () => void; size?: number }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      className={`flex-shrink-0 rounded border flex items-center justify-center transition-all duration-200 ${
        checked ? 'bg-[#00d4aa]/20 border-[#00d4aa]' : 'border-[#333] hover:border-[#555]'
      }`}
      style={{ width: size, height: size }}
    >
      {checked && (
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 12 12" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6l3 3 5-5" />
        </svg>
      )}
    </button>
  );
}

function PartialCheckbox({ checked, partial, onChange, size = 18 }: { checked: boolean; partial: boolean; onChange: () => void; size?: number }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      className={`flex-shrink-0 rounded border flex items-center justify-center transition-all duration-200 ${
        checked ? 'bg-[#00d4aa]/20 border-[#00d4aa]' : partial ? 'bg-[#F59E0B]/15 border-[#F59E0B]/50' : 'border-[#333] hover:border-[#555]'
      }`}
      style={{ width: size, height: size }}
    >
      {checked ? (
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 12 12" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6l3 3 5-5" />
        </svg>
      ) : partial ? (
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 12 12" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round">
          <path d="M2 6h8" />
        </svg>
      ) : null}
    </button>
  );
}

export default function CertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>(initialCertifications);
  const [expandedCerts, setExpandedCerts] = useState<Record<string, boolean>>({ 'mo-210': true, 'az-900': true, 'dp-900': true });
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  const toggleCert = (id: string) => setExpandedCerts(p => ({ ...p, [id]: !p[id] }));
  const toggleModule = (key: string) => setExpandedModules(p => ({ ...p, [key]: !p[key] }));

  const toggleSubSection = useCallback((certId: string, modIdx: number, subIdx: number) => {
    setCerts(prev => prev.map(c => {
      if (c.id !== certId) return c;
      const modules = c.modules.map((m, mi) => {
        if (mi !== modIdx) return m;
        const subSections = m.subSections.map((s, si) => si === subIdx ? { ...s, done: !s.done } : s);
        return { ...m, subSections };
      });
      return { ...c, modules };
    }));
  }, []);

  const toggleModuleAll = useCallback((certId: string, modIdx: number) => {
    setCerts(prev => prev.map(c => {
      if (c.id !== certId) return c;
      const mod = c.modules[modIdx];
      const allDone = mod.subSections.every(s => s.done);
      const newDone = !allDone;
      const modules = c.modules.map((m, mi) => {
        if (mi !== modIdx) return m;
        return { ...m, subSections: m.subSections.map(s => ({ ...s, done: newDone })) };
      });
      return { ...c, modules };
    }));
  }, []);

  const getProgress = (cert: Certification) => {
    const total = cert.modules.reduce((a, m) => a + m.subSections.length, 0);
    const done = cert.modules.reduce((a, m) => a + m.subSections.filter(s => s.done).length, 0);
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  const getStatus = (progress: number) => progress === 100 ? 'Completed' : progress === 0 ? 'Not Started' : 'In Progress';

  return (
    <div className="min-h-screen bg-background text-text p-8 pl-24">
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
        {(() => {
          const inProgress = certs.filter(c => { const p = getProgress(c); return p > 0 && p < 100; }).length;
          const completed = certs.filter(c => getProgress(c) === 100).length;
          return [
            { label: 'Certs in Progress', value: String(inProgress) },
            { label: 'Completed', value: String(completed) },
            { label: 'Next Exam', value: 'MO-210 · Mar 2026' },
          ];
        })().map((s) => (
          <div key={s.label} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-5">
            <div className="text-xs text-[#888] uppercase tracking-wider mb-1">{s.label}</div>
            <div className="text-lg font-semibold text-white">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Certification Cards */}
      <div className="space-y-4 mb-10">
        {certs.map((cert) => {
          const progress = getProgress(cert);
          const status = getStatus(progress);
          return (
            <div key={cert.id} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{cert.name}</h2>
                  <p className="text-sm text-[#888]">{cert.issuer}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#888]">Exam: {cert.examDate}</span>
                  <StatusBadge status={status} />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <ProgressBar value={progress} />
                <span className={`text-sm font-medium whitespace-nowrap ${progress === 100 ? 'text-[#00d4aa]' : 'text-[#0080FF]'}`}>{progress}%</span>
              </div>

              <button
                onClick={() => toggleCert(cert.id)}
                className="text-xs text-[#888] hover:text-white transition-colors mb-3"
              >
                {expandedCerts[cert.id] ? <><span className="text-lg">▾</span> Hide modules</> : <><span className="text-lg">▸</span> Show modules</>}
              </button>

              {expandedCerts[cert.id] && (
                <div className="space-y-1 mt-2">
                  {cert.modules.map((mod, modIdx) => {
                    const modKey = `${cert.id}-${modIdx}`;
                    const allDone = mod.subSections.every(s => s.done);
                    const someDone = mod.subSections.some(s => s.done);
                    const isExpanded = expandedModules[modKey] ?? false;
                    const doneCount = mod.subSections.filter(s => s.done).length;

                    return (
                      <div key={modIdx}>
                        <div
                          onClick={() => toggleModule(modKey)}
                          className="flex items-center gap-3 py-2 px-2 rounded-lg cursor-pointer hover:bg-[#111] transition-colors group"
                        >
                          <span className="text-lg text-[#555] group-hover:text-[#888] transition-all duration-200 w-5 inline-flex items-center justify-center">
                            {isExpanded ? '▾' : '▸'}
                          </span>
                          <PartialCheckbox
                            checked={allDone}
                            partial={someDone && !allDone}
                            onChange={() => toggleModuleAll(cert.id, modIdx)}
                          />
                          <span className={`text-sm font-medium flex-1 ${allDone ? 'text-[#ccc]' : 'text-[#999]'}`}>
                            Module {modIdx + 1}: {mod.name}
                          </span>
                          <span className="text-xs text-[#555]">
                            {doneCount}/{mod.subSections.length}
                          </span>
                        </div>

                        <div
                          className="overflow-hidden transition-all duration-300"
                          style={{
                            maxHeight: isExpanded ? `${mod.subSections.length * 40}px` : '0px',
                            opacity: isExpanded ? 1 : 0,
                          }}
                        >
                          <div className="ml-[52px] space-y-0.5 pb-2">
                            {mod.subSections.map((sub, subIdx) => (
                              <div
                                key={subIdx}
                                onClick={() => toggleSubSection(cert.id, modIdx, subIdx)}
                                className="flex items-center gap-3 py-1.5 px-2 rounded cursor-pointer hover:bg-[#111]/50 transition-colors"
                              >
                                <Checkbox checked={sub.done} onChange={() => toggleSubSection(cert.id, modIdx, subIdx)} />
                                <span className={`text-sm ${sub.done ? 'text-[#aaa] line-through decoration-[#333]' : 'text-[#777]'}`}>
                                  {sub.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
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
