'use client';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

const ACCENT = '#10B981';

const KPI_DATA = [
  { label: 'Monthly Budget', value: '$4,200', sub: 'Set for February', color: ACCENT },
  { label: 'Spent This Month', value: '$2,847', sub: '67.8% of budget', color: '#F59E0B' },
  { label: 'Savings Rate', value: '18.3%', sub: '$768 saved this month', color: '#0080FF' },
  { label: 'Next Payday', value: 'Feb 20', sub: 'In 0 days', color: '#A855F7' },
];

const SPENDING_CATEGORIES = [
  { name: 'Rent', amount: 1200, color: '#0080FF' },
  { name: 'Food', amount: 620, color: '#F59E0B' },
  { name: 'Transport', amount: 380, color: '#8B5CF6' },
  { name: 'Subscriptions', amount: 247, color: '#00d4aa' },
  { name: 'Other', amount: 400, color: '#EF4444' },
];

const MONTHLY_TREND = [
  { month: 'Sep', amount: 3100 },
  { month: 'Oct', amount: 3450 },
  { month: 'Nov', amount: 2980 },
  { month: 'Dec', amount: 3800 },
  { month: 'Jan', amount: 3200 },
  { month: 'Feb', amount: 2847 },
];

const BUDGET_VS_ACTUAL = [
  { category: 'Rent', budget: 1200, actual: 1200, color: '#0080FF' },
  { category: 'Food', budget: 700, actual: 620, color: '#F59E0B' },
  { category: 'Transport', budget: 400, actual: 380, color: '#8B5CF6' },
  { category: 'Subscriptions', budget: 250, actual: 247, color: '#00d4aa' },
  { category: 'Other', budget: 500, actual: 400, color: '#EF4444' },
];

const UPCOMING_EXPENSES = [
  { name: 'Rent', date: 'Mar 1', amount: '$1,200', icon: '🏠' },
  { name: 'Car Payment', date: 'Mar 5', amount: '$385', icon: '🚗' },
  { name: 'Netflix', date: 'Mar 8', amount: '$15.99', icon: '📺' },
  { name: 'Spotify', date: 'Mar 8', amount: '$10.99', icon: '🎵' },
  { name: 'iCloud Storage', date: 'Mar 12', amount: '$2.99', icon: '☁️' },
  { name: 'Internet', date: 'Mar 15', amount: '$79.99', icon: '🌐' },
];

export default function FinancesPage() {
  const totalSpent = SPENDING_CATEGORIES.reduce((s, c) => s + c.amount, 0);

  // Donut chart math
  const donutR = 70;
  const donutStroke = 28;
  const donutCircumference = 2 * Math.PI * donutR;

  // Line chart dimensions
  const lineW = 500;
  const lineH = 160;
  const linePadL = 40;
  const linePadR = 20;
  const linePadT = 10;
  const linePadB = 25;
  const plotW = lineW - linePadL - linePadR;
  const plotH = lineH - linePadT - linePadB;
  const lineMax = Math.max(...MONTHLY_TREND.map(m => m.amount));
  const lineMin = Math.min(...MONTHLY_TREND.map(m => m.amount)) * 0.85;

  const linePoints = MONTHLY_TREND.map((m, i) => ({
    x: linePadL + (i / (MONTHLY_TREND.length - 1)) * plotW,
    y: linePadT + plotH - ((m.amount - lineMin) / (lineMax - lineMin)) * plotH,
  }));
  const linePath = linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${linePoints[linePoints.length - 1].x},${linePadT + plotH} L${linePoints[0].x},${linePadT + plotH} Z`;

  // Budget bar max
  const budgetMax = Math.max(...BUDGET_VS_ACTUAL.map(b => Math.max(b.budget, b.actual)));

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Finances" />
      <div className="p-8 md:p-12">

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {KPI_DATA.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card border border-border rounded-xl p-5"
            style={{ borderLeft: `3px solid ${kpi.color}` }}
          >
            <div className="text-xs text-muted uppercase tracking-wider mb-2">{kpi.label}</div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ color: kpi.color }}>{kpi.value}</div>
            <div className="text-xs text-muted mt-1">{kpi.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Spending Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-6">Spending Breakdown</h2>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <svg width="180" height="180" viewBox="0 0 180 180">
                {(() => {
                  let cumOffset = 0;
                  return SPENDING_CATEGORIES.map((cat, i) => {
                    const pct = cat.amount / totalSpent;
                    const dashLen = pct * donutCircumference;
                    const dashGap = donutCircumference - dashLen;
                    const offset = -cumOffset * donutCircumference;
                    cumOffset += pct;
                    return (
                      <motion.circle
                        key={cat.name}
                        cx="90"
                        cy="90"
                        r={donutR}
                        fill="none"
                        stroke={cat.color}
                        strokeWidth={donutStroke}
                        strokeDasharray={`${dashLen} ${dashGap}`}
                        strokeDashoffset={offset}
                        strokeLinecap="butt"
                        transform="rotate(-90 90 90)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      />
                    );
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold" style={{ color: ACCENT }}>${totalSpent.toLocaleString()}</span>
                <span className="text-xs text-muted">total spent</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {SPENDING_CATEGORIES.map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: cat.color }} />
                  <span className="text-[#aaa]">{cat.name}</span>
                </div>
                <span className="font-medium" style={{ color: cat.color }}>${cat.amount}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Spending Trend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="lg:col-span-2 bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-6">Monthly Spending Trend</h2>
          <svg viewBox={`0 0 ${lineW} ${lineH}`} className="w-full" style={{ height: 200 }} preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
              const y = linePadT + plotH * (1 - pct);
              const val = lineMin + (lineMax - lineMin) * pct;
              return (
                <g key={i}>
                  <line x1={linePadL} y1={y} x2={lineW - linePadR} y2={y} stroke="#1a1a1a" strokeWidth="1" />
                  <text x={linePadL - 6} y={y + 3} textAnchor="end" fill="#555" fontSize="9">
                    ${Math.round(val / 100) * 100}
                  </text>
                </g>
              );
            })}

            {/* Area fill */}
            <motion.path
              d={areaPath}
              fill={`${ACCENT}12`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            {/* Line */}
            <motion.path
              d={linePath}
              fill="none"
              stroke={ACCENT}
              strokeWidth="2.5"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Dots */}
            {linePoints.map((p, i) => (
              <motion.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="3.5"
                fill={ACCENT}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.08 }}
              />
            ))}

            {/* Month labels */}
            {MONTHLY_TREND.map((m, i) => (
              <text
                key={i}
                x={linePoints[i].x}
                y={lineH - 5}
                textAnchor="middle"
                fill="#555"
                fontSize="10"
              >
                {m.month}
              </text>
            ))}
          </svg>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget vs Actual */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-6">Budget vs Actual</h2>
          <div className="space-y-5">
            {BUDGET_VS_ACTUAL.map((item, i) => {
              const budgetPct = (item.budget / budgetMax) * 100;
              const actualPct = (item.actual / budgetMax) * 100;
              const isUnder = item.actual <= item.budget;
              return (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                >
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-[#aaa]">{item.category}</span>
                    <span className={`text-xs font-medium ${isUnder ? 'text-[#10B981]' : 'text-red-400'}`}>
                      ${item.actual} / ${item.budget}
                    </span>
                  </div>
                  <div className="relative h-4 rounded-full bg-[#1a1a1a] overflow-hidden">
                    {/* Budget bar (background) */}
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full opacity-20"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${budgetPct}%` }}
                      transition={{ duration: 0.6, delay: 0.65 + i * 0.08 }}
                    />
                    {/* Actual bar (foreground) */}
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${actualPct}%` }}
                      transition={{ duration: 0.8, delay: 0.7 + i * 0.08 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border text-xs text-muted">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-2 rounded-sm bg-[#555] opacity-40" />
              <span>Budget</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-2 rounded-sm" style={{ backgroundColor: ACCENT }} />
              <span>Actual</span>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Expenses */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-6">Upcoming Expenses</h2>
          <div className="space-y-0">
            {UPCOMING_EXPENSES.map((expense, i) => (
              <motion.div
                key={expense.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.06 }}
                className={`flex items-center gap-4 py-3 ${i > 0 ? 'border-t border-border/50' : ''}`}
              >
                <span className="text-lg w-8 text-center">{expense.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{expense.name}</div>
                  <div className="text-xs text-muted">{expense.date}</div>
                </div>
                <span className="text-sm font-semibold" style={{ color: ACCENT }}>{expense.amount}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      </div>
    </div>
  );
}
