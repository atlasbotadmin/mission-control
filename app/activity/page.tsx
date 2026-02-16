'use client';

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
    <div className="min-h-screen p-8 md:p-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0080FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 15.5 14" />
          </svg>
          <h1 className="text-2xl font-semibold text-white">Activity</h1>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <button className="w-8 h-8 rounded-lg bg-[#141414] border border-[#252525] flex items-center justify-center text-[#888] hover:text-white hover:border-[#333] transition-colors">‹</button>
          <span className="text-[#ccc] font-medium px-2">Feb 10 – Feb 16, 2026</span>
          <button className="w-8 h-8 rounded-lg bg-[#141414] border border-[#252525] flex items-center justify-center text-[#888] hover:text-white hover:border-[#333] transition-colors">›</button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Hours', value: TOTAL, color: '#0080FF', delta: '+2' },
          ...CATEGORIES.map(c => ({ label: c.name, value: c.total, color: c.color, delta: c.delta })),
        ].map((m) => (
          <div key={m.label} className="bg-[#0e0e0e] border border-[#1a1a1a] rounded-xl p-5">
            <div className="text-xs text-[#666] uppercase tracking-wider mb-2">{m.label}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-white">{m.value}</span>
              <span className="text-xs text-[#555]">hrs</span>
            </div>
            <div className="text-xs mt-1" style={{ color: m.color }}>{m.delta} hrs</div>
            <div className="mt-3 h-1 rounded-full bg-[#1a1a1a]">
              <div className="h-1 rounded-full" style={{ width: `${(m.value / TOTAL) * 100}%`, backgroundColor: m.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Breakdown Grid */}
      <div className="bg-[#0e0e0e] border border-[#1a1a1a] rounded-xl p-6 mb-10">
        <h2 className="text-sm font-medium text-[#888] uppercase tracking-wider mb-6">Weekly Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: 500 }}>
            <thead>
              <tr>
                <th className="text-left text-xs text-[#555] pb-4 w-24"></th>
                {DAYS.map(d => (
                  <th key={d} className="text-center text-xs text-[#666] pb-4 font-medium">{d}</th>
                ))}
                <th className="text-right text-xs text-[#555] pb-4 pl-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((cat) => (
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
                        <div
                          className="w-full rounded-md flex items-center justify-center text-xs font-medium transition-all"
                          style={{
                            height: 40,
                            backgroundColor: hrs > 0 ? `${cat.color}${Math.round((hrs / 8) * 40 + 15).toString(16).padStart(2, '0')}` : '#141414',
                            color: hrs > 0 ? '#fff' : '#333',
                          }}
                        >
                          {hrs > 0 ? hrs : '–'}
                        </div>
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
      </div>

      {/* Weekly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stacked Bar Chart */}
        <div className="lg:col-span-2 bg-[#0e0e0e] border border-[#1a1a1a] rounded-xl p-6">
          <h2 className="text-sm font-medium text-[#888] uppercase tracking-wider mb-6">Daily Totals</h2>
          <div className="flex items-end gap-3 h-48">
            {DAYS.map((day, i) => {
              const work = CATEGORIES[0].data[i];
              const study = CATEGORIES[1].data[i];
              const fitness = CATEGORIES[2].data[i];
              const total = work + study + fitness;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col-reverse rounded-md overflow-hidden" style={{ height: `${(total / MAX_HOURS) * 100}%`, minHeight: total > 0 ? 4 : 0 }}>
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
                  </div>
                  <span className="text-[10px] text-[#555]">{day}</span>
                </div>
              );
            })}
          </div>
          {/* Y-axis label */}
          <div className="flex justify-between text-[10px] text-[#444] mt-1 px-1">
            <span>0h</span><span>{MAX_HOURS}h</span>
          </div>
        </div>

        {/* Distribution */}
        <div className="bg-[#0e0e0e] border border-[#1a1a1a] rounded-xl p-6">
          <h2 className="text-sm font-medium text-[#888] uppercase tracking-wider mb-6">Distribution</h2>
          <div className="flex flex-col gap-5">
            {CATEGORIES.map((cat) => {
              const pct = ((cat.total / TOTAL) * 100).toFixed(1);
              return (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#aaa]">{cat.name}</span>
                    <span style={{ color: cat.color }} className="font-medium">{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#1a1a1a]">
                    <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: cat.color }} />
                  </div>
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-8 pt-5 border-t border-[#1a1a1a]">
            {CATEGORIES.map(c => (
              <div key={c.name} className="flex items-center gap-2 text-xs text-[#666]">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
