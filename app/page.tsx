'use client';

import { useState, useEffect } from 'react';

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
    <div className="bg-card border border-border rounded-lg p-8">
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
      <div className="grid grid-cols-7 gap-y-3">
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
              className={`relative aspect-square w-11 flex flex-col items-center justify-center text-sm rounded-md transition-all mx-auto ${
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
              <div key={i} className={`flex items-center gap-3 text-sm py-2 ${i > 0 ? 'border-t border-border/50' : ''}`}>
                <span className="text-muted w-20 text-xs shrink-0">{evt.time || 'All day'}</span>
                <span>{evt.title}</span>
              </div>
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
    </div>
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

  const agents = [
    { name: 'Atlas', role: 'Main', model: 'Opus', status: 'online' },
    { name: 'Voyage', role: 'Travel', model: 'Sonnet', status: 'idle' },
    { name: 'Harvest', role: 'Meal Prep', model: 'Sonnet', status: 'idle' },
    { name: 'Sage', role: 'Research', model: 'Opus', status: 'idle' },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-bold">
              <span className="text-accent">Atlas</span> <span className="inline-block w-px h-7 bg-white/40 mx-3 align-middle"></span> Mission Control
            </h1>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="text-muted">{currentDate} • {currentTime}</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-status animate-pulse"></div>
              <span className="text-status">Online</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar Panel */}
            <MiniCalendar />

            {/* Agents Panel */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Agents</h2>
                <a href="/agents" className="text-sm text-accent hover:underline">View all →</a>
              </div>
              <div className="space-y-3">
                {agents.map((agent, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          agent.status === 'online' ? 'bg-status' : 'bg-idle'
                        }`}
                      ></div>
                      <div>
                        <div className="font-medium text-sm">{agent.name}</div>
                        <div className="text-xs text-muted">{agent.role}</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted">{agent.model}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <div className="bg-card border border-border rounded-lg p-5">
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
            </div>

            {/* Headlines */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex items-center gap-3 mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <circle cx="12" cy="12" r="2"/>
                  <path d="M16.24 7.76a6 6 0 0 1 0 8.49"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  <path d="M7.76 16.24a6 6 0 0 1 0-8.49"/>
                  <path d="M4.93 19.07a10 10 0 0 1 0-14.14"/>
                </svg>
                <h2 className="text-xl font-semibold">Headlines</h2>
              </div>
              <div className="space-y-0">
                {[
                  { emoji: '🚢', text: 'Hapag-Lloyd in advanced talks to acquire Zim', url: 'https://www.reuters.com' },
                  { emoji: '🧠', text: 'Anthropic hits $380B valuation amid Pentagon AI dispute', url: 'https://www.bloomberg.com' },
                  { emoji: '💻', text: 'SpaceX eyes dual-class share structure ahead of IPO', url: 'https://www.cnbc.com' },
                  { emoji: '🌍', text: '250K rally in Munich for Iran regime change', url: 'https://www.bbc.com' },
                  { emoji: '📈', text: 'Container shipping rates pressured by Red Sea reopening', url: 'https://www.ft.com' },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-4 py-4 ${i > 0 ? 'border-t border-border/50' : ''}`}>
                    <span className="text-xl shrink-0">{item.emoji}</span>
                    <span className="text-base text-[#ddd] flex-1">{item.text}</span>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[#555] hover:text-[#0080FF] transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs text-muted">Updated 4:15 AM</span>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Certifications</h2>
                <a href="/certifications" className="text-sm text-accent hover:underline">View all →</a>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'MO-210 Excel 365', progress: 60 },
                  { name: 'AZ-900 Azure Fundamentals', progress: 40 },
                  { name: 'DP-900 Azure Data Fundamentals', progress: 15 },
                ].map((cert, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium">{cert.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium" style={{ color: '#F59E0B' }}>In Progress</span>
                        <span className="text-sm font-semibold text-accent">{cert.progress}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${cert.progress}%`, backgroundColor: '#0080FF' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
