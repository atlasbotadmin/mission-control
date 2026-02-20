'use client';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CATEGORIES = [
  { name: 'Work', color: '#0080FF', data: [8, 8, 8, 8, 8, 0, 0], total: 40, delta: '+2.5' },
  { name: 'Study', color: '#8B5CF6', data: [1, 0, 1.5, 0, 1, 2, 0], total: 5.5, delta: '+0.5' },
  { name: 'Fitness', color: '#00d4aa', data: [1.5, 1, 0, 1.5, 1, 0, 1], total: 6, delta: '−1' },
];

const TOTAL = 51.5;
const MAX_HOURS = 12;

export default function ActivityPage() {
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

      {/* Weekly Breakdown Grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-card border border-border rounded-xl p-6 mb-10"
      >
        <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-6">Weekly Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: 500 }}>
            <thead>
              <tr>
                <th className="text-left text-xs text-[#555] pb-4 w-24"></th>
                {DAYS.map(d => (
                  <th key={d} className="text-center text-xs text-muted pb-4 font-medium">{d}</th>
                ))}
                <th className="text-right text-xs text-[#555] pb-4 pl-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((cat, catIdx) => (
                <tr key={cat.name}>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm text-[#aaa]">{cat.name}</span>
                    </div>
                  </td>
                  {cat.data.map((hrs, i) => (
                    <td key={i} className="py-2 px-1">
                      <div className="flex flex-col items-center gap-1">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + catIdx * 0.08 + i * 0.03 }}
                          className="w-full rounded-md flex items-center justify-center text-xs font-medium transition-all"
                          style={{
                            height: 40,
                            backgroundColor: hrs > 0 ? `${cat.color}${Math.round((hrs / 8) * 40 + 15).toString(16).padStart(2, '0')}` : '#141414',
                            color: hrs > 0 ? '#fff' : '#333',
                          }}
                        >
                          {hrs > 0 ? hrs : '–'}
                        </motion.div>
                      </div>
                    </td>
                  ))}
                  <td className="py-2 pl-4 text-right">
                    <span className="text-sm font-semibold" style={{ color: cat.color }}>{cat.total}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Weekly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stacked Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-6">Daily Totals</h2>
          <div className="flex items-end gap-3 h-48">
            {DAYS.map((day, i) => {
              const work = CATEGORIES[0].data[i];
              const study = CATEGORIES[1].data[i];
              const fitness = CATEGORIES[2].data[i];
              const total = work + study + fitness;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    className="w-full flex flex-col-reverse rounded-md overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: `${(total / MAX_HOURS) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.55 + i * 0.08 }}
                    style={{ minHeight: total > 0 ? 4 : 0 }}
                  >
                    {CATEGORIES.map((cat) => {
                      const h = cat.data[i];
                      if (h === 0) return null;
                      return (
                        <div
                          key={cat.name}
                          style={{ height: `${(h / total) * 100}%`, backgroundColor: cat.color }}
                          className="w-full min-h-[2px]"
                        />
                      );
                    })}
                  </motion.div>
                  <span className="text-[10px] text-[#555]">{day}</span>
                </div>
              );
            })}
          </div>
          {/* Y-axis label */}
          <div className="flex justify-between text-[10px] text-[#444] mt-1 px-1">
            <span>0h</span><span>{MAX_HOURS}h</span>
          </div>
        </motion.div>

        {/* Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-6">Distribution</h2>
          <div className="flex flex-col gap-5">
            {CATEGORIES.map((cat, i) => {
              const pct = ((cat.total / TOTAL) * 100).toFixed(1);
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#aaa]">{cat.name}</span>
                    <span style={{ color: cat.color }} className="font-medium">{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#1a1a1a]">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.7 + i * 0.1 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-8 pt-5 border-t border-border">
            {CATEGORIES.map(c => (
              <div key={c.name} className="flex items-center gap-2 text-xs text-muted">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
                {c.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
}
