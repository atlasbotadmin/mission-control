'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHeader from './components/PageHeader';

// Mock event data
const eventData: Record<string, { time: string; title: string }[]> = {
  '2026-02-16': [
    { time: '4:30 AM', title: 'Morning Routine' },
    { time: '6:00 AM', title: 'Port Houston (Opening) 6:00 AM - 2:00 PM' },
    { time: '2:30 PM', title: 'Workout' },
    { time: '8:30 PM', title: 'Evening Routine' },
  ],
  '2026-02-17': [
    { time: '4:30 AM', title: 'Morning Routine' },
    { time: '6:00 AM', title: 'Port Houston (Opening) 6:00 AM - 2:00 PM' },
    { time: '', title: 'EA Launch Day 🚀' },
    { time: '8:30 PM', title: 'Evening Routine' },
  ],
  '2026-02-18': [
    { time: '4:30 AM', title: 'Morning Routine' },
    { time: '6:00 AM', title: 'Port Houston (Opening) 6:00 AM - 2:00 PM' },
    { time: '3:00 PM', title: 'AZ-900 Study Session' },
    { time: '8:30 PM', title: 'Evening Routine' },
  ],
  '2026-02-19': [
    { time: '4:30 AM', title: 'Morning Routine' },
    { time: '6:00 AM', title: 'Port Houston (Opening) 6:00 AM - 2:00 PM' },
    { time: '8:30 PM', title: 'Evening Routine' },
  ],
  '2026-02-20': [
    { time: '4:30 AM', title: 'Morning Routine' },
    { time: '6:00 AM', title: 'Port Houston (Opening) 6:00 AM - 2:00 PM' },
    { time: '', title: 'Payday 💰' },
    { time: '8:30 PM', title: 'Evening Routine' },
  ],
  '2026-02-21': [
    { time: '8:00 AM', title: 'Morning Routine' },
    { time: '', title: 'Weekend (no work)' },
    { time: '8:30 PM', title: 'Evening Routine' },
  ],
  '2026-02-22': [
    { time: '8:00 AM', title: 'Morning Routine' },
    { time: '', title: 'Weekend (no work)' },
    { time: '2:00 PM', title: 'Meal Prep' },
    { time: '8:30 PM', title: 'Evening Routine' },
  ],
};

function getDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function MiniCalendar() {
  const today = new Date(2026, 1, 16); // Feb 16, 2026
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(getDateKey(today.getFullYear(), today.getMonth(), today.getDate()));

  const todayKey = getDateKey(today.getFullYear(), today.getMonth(), today.getDate());
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayHeaders = ['S','M','T','W','T','F','S'];

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0); }
    else setViewMonth(viewMonth + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedEvents = eventData[selectedDate] || [];
  const selectedDateObj = new Date(selectedDate + 'T12:00:00');
  const selectedLabel = selectedDateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card border border-border rounded-lg p-8"
    >
      {/* Month nav */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="text-muted hover:text-foreground transition-colors p-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <h2 className="text-lg font-semibold">{monthNames[viewMonth]} {viewYear}</h2>
        <button onClick={nextMonth} className="text-muted hover:text-foreground transition-colors p-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 pb-3 mb-3" style={{ borderBottom: '1px solid #252525' }}>
        {dayHeaders.map((d, i) => (
          <div key={i} className="text-center text-xs text-muted py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-6">
        {cells.map((day, i) => {
          if (day === null) return <div key={i} />;
          const key = getDateKey(viewYear, viewMonth, day);
          const isToday = key === todayKey;
          const isSelected = key === selectedDate;
          const hasEvents = !!eventData[key];
          return (
            <button
              key={i}
              onClick={() => setSelectedDate(key)}
              className={`relative w-[3.25rem] h-[3.25rem] flex items-center justify-center text-sm rounded-md transition-all mx-auto ${
                isSelected
                  ? 'bg-accent text-white font-semibold'
                  : isToday
                  ? 'ring-1 ring-accent text-accent font-medium'
                  : 'text-foreground hover:bg-white/5'
              }`}
            >
              {day}
              {hasEvents && (
                <span className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-accent'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Events list */}
      <div className="mt-5 pt-4 border-t border-border">
        <h3 className="text-sm text-muted mb-3">{selectedLabel}</h3>
        {selectedEvents.length === 0 ? (
          <p className="text-sm text-muted">No events scheduled</p>
        ) : (
          <div className="space-y-0">
            {selectedEvents.map((evt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-3 text-sm py-2 ${i > 0 ? 'border-t border-border/50' : ''}`}
              >
                <span className="text-muted w-20 text-xs shrink-0">{evt.time || 'All day'}</span>
                <span>{evt.title}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Shift & Weather */}
      <div className="mt-4 pt-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Current Shift</span>
          <span className="text-accent">Opening: 6:00a - 2:00p</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Weather</span>
          <span>72°F • Partly Cloudy</span>
        </div>
      </div>
    </motion.div>
  );
}

// Token Costs grouped bar chart data (monthly, 6 months)
const TOKEN_COST_DATA = [
  { day: 'Sep', estimated: 140, actual: 98 },
  { day: 'Oct', estimated: 150, actual: 127 },
  { day: 'Nov', estimated: 150, actual: 112 },
  { day: 'Dec', estimated: 160, actual: 175 },
  { day: 'Jan', estimated: 160, actual: 134 },
  { day: 'Feb', estimated: 150, actual: 89 },
];

function TokenCostsWidget() {
  const totalEst = TOKEN_COST_DATA.reduce((s, d) => s + d.estimated, 0);
  const totalAct = TOKEN_COST_DATA.reduce((s, d) => s + d.actual, 0);
  const savings = totalEst - totalAct;
  const savingsPct = Math.round((savings / totalEst) * 100);
  const maxVal = Math.max(...TOKEN_COST_DATA.flatMap(d => [d.estimated, d.actual]));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.42 }}
      className="bg-card border border-border rounded-lg p-5 flex flex-col flex-1"
    >
      <h2 className="text-sm font-medium text-[#ccc] uppercase tracking-wider mb-5">Token Costs</h2>

      {/* Grouped Bar Chart */}
      <div className="relative flex-1 flex flex-col">
        {/* Gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none" style={{ paddingBottom: 28 }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="border-t border-[#1a1a1a] w-full" />
          ))}
        </div>

        {/* Bars */}
        <div className="flex items-end gap-3 relative flex-1" style={{ minHeight: 160 }}>
          {TOKEN_COST_DATA.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex items-end gap-1 w-full justify-center" style={{ height: '80%' }}>
                {/* Estimated bar */}
                <motion.div
                  className="flex-1 max-w-[14px] rounded-t-sm"
                  style={{ backgroundColor: 'rgba(136,136,136,0.3)' }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.estimated / maxVal) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.06 }}
                />
                {/* Actual bar */}
                <motion.div
                  className="flex-1 max-w-[14px] rounded-t-sm bg-[#0080FF]"
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.actual / maxVal) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.06 }}
                />
              </div>
              <span className="text-[9px] text-[#555] mt-1 whitespace-nowrap">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Row */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: 'rgba(136,136,136,0.3)' }} />
            <span className="text-muted">Estimated: <span className="text-[#aaa]">${totalEst}</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 rounded-sm bg-[#0080FF]" />
            <span className="text-muted">Actual: <span className="text-[#aaa]">${totalAct}</span></span>
          </div>
        </div>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#00d4aa]/15 text-[#00d4aa]"
        >
          ${savings} saved ({savingsPct}%)
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Dashboard" right={
        <div className="flex items-center gap-6 text-sm">
          <div className="text-muted">{currentDate} • {currentTime}</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-status animate-pulse"></div>
            <span className="text-status">Online</span>
          </div>
        </div>
      } />
      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-8">

        {/* KPI Summary Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Hours This Week', value: '51.5', sub: '40 work · 5.5 study · 6 fitness', color: '#0080FF' },
            { label: 'Next Event', value: 'Morning', sub: '4:30 AM · Routine', color: '#00d4aa' },
            { label: 'Days Until Payday', value: '4', sub: 'Feb 20, 2026', color: '#F59E0B' },
            { label: 'Active Agents', value: '1', sub: 'Atlas online · 6 idle', color: '#A855F7' },
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted mb-1">{kpi.label}</div>
              <div className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
              <div className="text-xs text-muted mt-1">{kpi.sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar Panel */}
            <MiniCalendar />

          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Weather Widget */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-card border border-border rounded-lg p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-light tracking-tight">62°F</div>
                  <div className="text-sm mt-1">Partly Cloudy</div>
                  <div className="text-xs text-muted mt-0.5">Houston, TX</div>
                </div>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-accent">
                  <circle cx="20" cy="24" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M20 13v-3M20 38v-3M9 24H6M34 24h-3M12.3 16.3l-2.1-2.1M29.8 33.8l-2.1-2.1M27.7 16.3l2.1-2.1M10.2 33.8l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M28 28a8 8 0 0 1 8-8 6 6 0 0 1 6 6c0 3.3-2.7 6-6 6H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted">
                <span>H: 69° L: 57°</span>
                <span>·</span>
                <span>85% humidity</span>
                <span>·</span>
                <span>12 mph N</span>
              </div>
            </motion.div>

            {/* Doing Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="bg-card border border-border rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-medium text-[#ccc] uppercase tracking-wider">Doing</h2>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/20 text-accent">2</span>
                </div>
                <a href="/tasks" className="text-xs text-accent hover:underline">View all →</a>
              </div>
              {(() => {
                const doingTasks = [
                  { name: 'Mission Control UI Upgrade', category: 'Atlas', color: '#A855F7' },
                  { name: 'MO-210 Study: Formulas & Functions', category: 'Work', color: '#0080FF' },
                ];
                return doingTasks.length > 0 ? (
                  <div className="space-y-2">
                    {doingTasks.map((task, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.44 + i * 0.08 }}
                        className="flex items-center gap-3 py-2 px-3 rounded-md bg-background/50"
                      >
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: task.color }} />
                        <span className="text-sm flex-1">{task.name}</span>
                        <span className="text-xs text-muted">{task.category}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted">All clear — nothing in progress</p>
                );
              })()}
            </motion.div>

            {/* Token Costs */}
            <TokenCostsWidget />

          </div>
        </div>
      </div>
    </div>
  );
}
