'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';

const CATEGORIES = [
  { name: 'Work', color: '#0080FF', data: [8, 8, 8, 8, 8, 0, 0], total: 40, delta: '+2.5' },
  { name: 'Study', color: '#8B5CF6', data: [1, 0, 1.5, 0, 1, 2, 0], total: 5.5, delta: '+0.5' },
  { name: 'Fitness', color: '#00d4aa', data: [1.5, 1, 0, 1.5, 1, 0, 1], total: 6, delta: '−1' },
];

const TOTAL = 51.5;

const DAILY_DATA = [
  { date: 'Mon, Feb 10', work: 8, study: 1, fitness: 1.5 },
  { date: 'Tue, Feb 11', work: 8, study: 0, fitness: 1 },
  { date: 'Wed, Feb 12', work: 8, study: 1.5, fitness: 0 },
  { date: 'Thu, Feb 13', work: 8, study: 0, fitness: 1.5 },
  { date: 'Fri, Feb 14', work: 8, study: 1, fitness: 1 },
  { date: 'Sat, Feb 15', work: 0, study: 2, fitness: 0 },
  { date: 'Sun, Feb 16', work: 0, study: 0, fitness: 1 },
];

// Cumulative weekly data for area chart (4 weeks)
const WEEKLY_TRENDS = [
  { week: 'Week 1', work: 36, study: 4, fitness: 8 },
  { week: 'Week 2', work: 38, study: 5, fitness: 7 },
  { week: 'Week 3', work: 40, study: 4.5, fitness: 5.5 },
  { week: 'Week 4', work: 40, study: 5.5, fitness: 6 },
];

export default function ActivityPage() {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  // Area chart dimensions
  const areaW = 600;
  const areaH = 200;
  const areaPadL = 40;
  const areaPadR = 20;
  const areaPadT = 10;
  const areaPadB = 30;
  const plotW = areaW - areaPadL - areaPadR;
  const plotH = areaH - areaPadT - areaPadB;

  const maxWeekly = Math.max(...WEEKLY_TRENDS.map(w => w.work + w.study + w.fitness));

  function getAreaPaths() {
    const points = WEEKLY_TRENDS.map((w, i) => ({
      x: areaPadL + (i / (WEEKLY_TRENDS.length - 1)) * plotW,
      work: w.work,
      study: w.study,
      fitness: w.fitness,
    }));

    const toY = (v: number) => areaPadT + plotH - (v / maxWeekly) * plotH;

    // Stacked areas: fitness on bottom, then study, then work on top
    const fitnessTop = points.map(p => ({ x: p.x, y: toY(p.fitness) }));
    const studyTop = points.map(p => ({ x: p.x, y: toY(p.fitness + p.study) }));
    const workTop = points.map(p => ({ x: p.x, y: toY(p.fitness + p.study + p.work) }));
    const baseline = points.map(p => ({ x: p.x, y: toY(0) }));

    function makePath(top: { x: number; y: number }[], bottom: { x: number; y: number }[]) {
      const forward = top.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
      const backward = [...bottom].reverse().map((p) => `L${p.x},${p.y}`).join(' ');
      return `${forward} ${backward} Z`;
    }

    function makeLine(pts: { x: number; y: number }[]) {
      return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    }

    return {
      fitnessArea: makePath(fitnessTop, baseline),
      studyArea: makePath(studyTop, fitnessTop),
      workArea: makePath(workTop, studyTop),
      fitnessLine: makeLine(fitnessTop),
      studyLine: makeLine(studyTop),
      workLine: makeLine(workTop),
    };
  }

  const paths = getAreaPaths();

  return (
    <div className="min-h-screen">
      <PageHeader title="Activity" right={
        <div className="flex items-center gap-3 text-sm">
          <button className="w-8 h-8 rounded-lg bg-[#141414] border border-[#252525] flex items-center justify-center text-[#888] hover:text-white hover:border-[#333] transition-colors">‹</button>
          <span className="text-[#ccc] font-medium px-2">Feb 10 – Feb 16, 2026</span>
          <button className="w-8 h-8 rounded-lg bg-[#141414] border border-[#252525] flex items-center justify-center text-[#888] hover:text-white hover:border-[#333] transition-colors">›</button>
        </div>
      } />
      <div className="p-8 md:p-12">

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Hours', value: TOTAL, color: '#0080FF', delta: '+2', spark: [38, 42, 45, 48, 46, 50, 51.5] },
          ...CATEGORIES.map(c => ({ label: c.name, value: c.total, color: c.color, delta: c.delta, spark: c.data })),
        ].map((m, i) => {
          const isPositive = !m.delta.startsWith('−');
          const sparkH = 24;
          const sparkW = 60;
          const sparkMax = Math.max(...m.spark, 1);
          const sparkPoints = m.spark.map((v, si) => `${(si / (m.spark.length - 1)) * sparkW},${sparkH - (v / sparkMax) * sparkH}`).join(' ');
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-5 overflow-hidden"
              style={{ borderLeft: `3px solid ${m.color}` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="text-xs text-muted uppercase tracking-wider">{m.label}</div>
                <svg viewBox={`0 0 ${sparkW} ${sparkH}`} width={sparkW} height={sparkH} className="flex-shrink-0">
                  <polyline points={sparkPoints} fill="none" stroke={m.color} strokeWidth="1.5" strokeLinejoin="round" />
                  <polyline points={`0,${sparkH} ${sparkPoints} ${sparkW},${sparkH}`} fill={`${m.color}15`} stroke="none" />
                </svg>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight" style={{ color: m.color }}>{m.value}</span>
                <span className="text-xs text-[#555]">hrs</span>
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  {isPositive ? (
                    <path d="M6 2L10 7H2L6 2Z" fill="#00d4aa" />
                  ) : (
                    <path d="M6 10L2 5H10L6 10Z" fill="#ef4444" />
                  )}
                </svg>
                <span className={`text-sm font-semibold ${isPositive ? 'text-[#00d4aa]' : 'text-red-400'}`}>{m.delta} hrs</span>
                <span className="text-xs text-muted ml-0.5">vs last week</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Daily Timeline / Journal View */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mb-10"
      >
        <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">Daily Timeline</h2>
        <div className="flex flex-col gap-2">
          {DAILY_DATA.map((day, i) => {
            const total = day.work + day.study + day.fitness;
            const isExpanded = expandedDay === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
              >
                <div
                  className="bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-4 cursor-pointer hover:border-[#333] transition-colors group"
                  onClick={() => setExpandedDay(isExpanded ? null : i)}
                >
                  {/* Date Label */}
                  <div className="w-28 shrink-0">
                    <div className="text-sm font-medium text-[#ccc]">{day.date.split(', ')[0]}</div>
                    <div className="text-xs text-muted">{day.date.split(', ')[1]}</div>
                  </div>

                  {/* Stacked Horizontal Bar */}
                  <div className="flex-1 h-8 rounded-lg overflow-hidden bg-[#141414] flex">
                    {total > 0 ? (
                      <>
                        {day.work > 0 && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(day.work / total) * 100}%` }}
                            transition={{ duration: 0.6, delay: 0.5 + i * 0.06 }}
                            className="h-full"
                            style={{ backgroundColor: '#0080FF' }}
                          />
                        )}
                        {day.study > 0 && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(day.study / total) * 100}%` }}
                            transition={{ duration: 0.6, delay: 0.6 + i * 0.06 }}
                            className="h-full"
                            style={{ backgroundColor: '#8B5CF6' }}
                          />
                        )}
                        {day.fitness > 0 && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(day.fitness / total) * 100}%` }}
                            transition={{ duration: 0.6, delay: 0.7 + i * 0.06 }}
                            className="h-full"
                            style={{ backgroundColor: '#00d4aa' }}
                          />
                        )}
                      </>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs text-[#444]">Rest day</div>
                    )}
                  </div>

                  {/* Total Hours */}
                  <div className="w-16 text-right shrink-0">
                    <span className="text-lg font-bold text-[#ccc]">{total > 0 ? total : '–'}</span>
                    {total > 0 && <span className="text-xs text-muted ml-0.5">hrs</span>}
                  </div>

                  {/* Expand indicator */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-muted group-hover:text-[#888] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </div>

                {/* Expanded Breakdown */}
                <AnimatePresence>
                  {isExpanded && total > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[#0a0a0a] border border-t-0 border-border rounded-b-xl px-5 py-3 flex items-center gap-6 ml-32">
                        {[
                          { label: 'Work', value: day.work, color: '#0080FF' },
                          { label: 'Study', value: day.study, color: '#8B5CF6' },
                          { label: 'Fitness', value: day.fitness, color: '#00d4aa' },
                        ].filter(s => s.value > 0).map(s => (
                          <div key={s.label} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                            <span className="text-xs text-muted">{s.label}</span>
                            <span className="text-sm font-semibold" style={{ color: s.color }}>{s.value}h</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Cumulative Weekly Trends Area Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-muted uppercase tracking-wider">Weekly Trends</h2>
          <div className="flex items-center gap-4">
            {CATEGORIES.map(c => (
              <div key={c.name} className="flex items-center gap-1.5 text-xs text-muted">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>

        <svg viewBox={`0 0 ${areaW} ${areaH}`} className="w-full" style={{ height: 220 }} preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = areaPadT + plotH * (1 - pct);
            return (
              <g key={i}>
                <line x1={areaPadL} y1={y} x2={areaW - areaPadR} y2={y} stroke="#1a1a1a" strokeWidth="1" />
                <text x={areaPadL - 6} y={y + 3} textAnchor="end" fill="#555" fontSize="9">
                  {Math.round(maxWeekly * pct)}h
                </text>
              </g>
            );
          })}

          {/* Work area (top) */}
          <motion.path
            d={paths.workArea}
            fill="#0080FF15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          />
          <motion.path
            d={paths.workLine}
            fill="none"
            stroke="#0080FF"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          />

          {/* Study area (middle) */}
          <motion.path
            d={paths.studyArea}
            fill="#8B5CF620"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          />
          <motion.path
            d={paths.studyLine}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.0 }}
          />

          {/* Fitness area (bottom) */}
          <motion.path
            d={paths.fitnessArea}
            fill="#00d4aa20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          />
          <motion.path
            d={paths.fitnessLine}
            fill="none"
            stroke="#00d4aa"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          />

          {/* Week labels */}
          {WEEKLY_TRENDS.map((w, i) => (
            <text
              key={i}
              x={areaPadL + (i / (WEEKLY_TRENDS.length - 1)) * plotW}
              y={areaH - 5}
              textAnchor="middle"
              fill="#555"
              fontSize="10"
            >
              {w.week}
            </text>
          ))}
        </svg>
      </motion.div>

      </div>
    </div>
  );
}
