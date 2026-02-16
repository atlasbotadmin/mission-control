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
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="text-muted hover:text-foreground transition-colors p-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <h2 className="text-lg font-semibold">{monthNames[viewMonth]} {viewYear}</h2>
        <button onClick={nextMonth} className="text-muted hover:text-foreground transition-colors p-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {dayHeaders.map((d, i) => (
          <div key={i} className="text-center text-xs text-muted py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
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
              className={`relative flex flex-col items-center justify-center py-1.5 text-sm rounded-md transition-all ${
                isSelected
                  ? 'bg-accent text-white font-semibold'
                  : isToday
                  ? 'ring-1 ring-accent text-accent font-medium'
                  : 'text-foreground hover:bg-white/5'
              }`}
            >
              {day}
              {hasEvents && (
                <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-accent'}`} />
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

  const projects = [
    { name: 'EA Launch', target: 'Feb 17, 2026', progress: 85 },
    { name: 'Wedding Planning', target: 'Sep 2026', progress: 30 },
    { name: 'MO-210 Excel Certification', target: null, progress: 60 },
  ];

  const agents = [
    { name: 'Atlas', role: 'Main', model: 'Opus', status: 'online' },
    { name: 'Voyage', role: 'Travel', model: 'Sonnet', status: 'idle' },
    { name: 'Harvest', role: 'Meal Prep', model: 'Sonnet', status: 'idle' },
    { name: 'Sage', role: 'Research', model: 'Opus', status: 'idle' },
  ];

  const activityFeed = [
    'Completed "Update budget spreadsheet"',
    'Started AZ-900 Module 3',
    'Archived 5 completed tasks',
    'Updated wedding guest list',
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-bold">
              Atlas <span className="text-accent">Mission Control</span>
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

            {/* Projects Summary */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Projects</h2>
                <a href="/projects" className="text-sm text-accent hover:underline">View all →</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, i) => (
                  <div key={i} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-sm">{project.name}</h3>
                        {project.target && (
                          <p className="text-xs text-muted mt-1">{project.target}</p>
                        )}
                      </div>
                      <span className="text-lg font-semibold text-accent">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
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
                          agent.status === 'online' ? 'bg-status' : 'bg-gray-600'
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

            {/* Stats */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Stats</h2>
                <a href="/stats" className="text-sm text-accent hover:underline">View all →</a>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Tasks this week</span>
                  <span className="text-2xl font-bold text-accent">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Current streak</span>
                  <span className="text-2xl font-bold text-accent">5 days</span>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted mb-1">Last weekly review</div>
                  <div className="text-sm">Feb 7, 2026</div>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {activityFeed.map((activity, i) => (
                  <div key={i} className="text-sm text-muted flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>{activity}</span>
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
