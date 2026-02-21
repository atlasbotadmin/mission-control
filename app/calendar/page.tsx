'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';

type EventCategory = 'Work' | 'Routine' | 'Personal' | 'Study';

interface CalendarEvent {
  id: string;
  title: string;
  category: EventCategory;
  dayOfWeek: number; // 0=Mon, 6=Sun
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
  recurring?: boolean;
  days?: number[]; // for recurring events on specific days
}

const categoryColors: Record<EventCategory, string> = {
  Work: '#0080FF',
  Routine: '#00d4aa',
  Personal: '#A855F7',
  Study: '#F59E0B',
};

const categoryBgColors: Record<EventCategory, string> = {
  Work: '#0080FF20',
  Routine: '#00d4aa20',
  Personal: '#A855F720',
  Study: '#F59E0B20',
};

// Mock events
const mockEvents: CalendarEvent[] = [
  // Port Houston shifts - Mon-Fri 6a-2p
  ...[0, 1, 2, 3, 4].map((d) => ({
    id: `work-${d}`,
    title: 'Port Houston - Opening',
    category: 'Work' as EventCategory,
    dayOfWeek: d,
    startHour: 6,
    startMin: 0,
    endHour: 14,
    endMin: 0,
    recurring: true,
  })),
  // Morning Routine - daily 4:30a-5:30a
  ...[0, 1, 2, 3, 4, 5, 6].map((d) => ({
    id: `morning-${d}`,
    title: 'Morning Routine',
    category: 'Routine' as EventCategory,
    dayOfWeek: d,
    startHour: 4,
    startMin: 30,
    endHour: 5,
    endMin: 30,
    recurring: true,
  })),
  // Evening Routine - daily 8:30p-9:30p
  ...[0, 1, 2, 3, 4, 5, 6].map((d) => ({
    id: `evening-${d}`,
    title: 'Evening Routine',
    category: 'Routine' as EventCategory,
    dayOfWeek: d,
    startHour: 20,
    startMin: 30,
    endHour: 21,
    endMin: 30,
    recurring: true,
  })),
  // AZ-900 Study - Wed 3p-4:30p
  {
    id: 'study-wed',
    title: 'AZ-900 Study',
    category: 'Study',
    dayOfWeek: 2,
    startHour: 15,
    startMin: 0,
    endHour: 16,
    endMin: 30,
  },
  // Workout - Mon/Wed/Fri 2:30p-3:30p
  ...[0, 2, 4].map((d) => ({
    id: `workout-${d}`,
    title: 'Workout',
    category: 'Personal' as EventCategory,
    dayOfWeek: d,
    startHour: 14,
    startMin: 30,
    endHour: 15,
    endMin: 30,
    recurring: true,
  })),
  // Weekend meal prep - Sat 2p-4p
  {
    id: 'mealprep',
    title: 'Meal Prep',
    category: 'Personal',
    dayOfWeek: 5,
    startHour: 14,
    startMin: 0,
    endHour: 16,
    endMin: 0,
  },
];

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dayNamesFull = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours = Array.from({ length: 18 }, (_, i) => i + 5); // 5AM - 10PM

function formatHour(h: number): string {
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

function formatTime(h: number, m: number): string {
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

// Generate month data
function getMonthData(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = (firstDay.getDay() + 6) % 7; // Mon=0
  const daysInMonth = lastDay.getDate();
  return { startDayOfWeek, daysInMonth, month, year };
}

export default function CalendarPage() {
  const [view, setView] = useState<'week' | 'month'>('week');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const now = new Date();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  const currentDayOfWeek = (now.getDay() + 6) % 7; // Mon=0

  const monthData = useMemo(() => getMonthData(now.getFullYear(), now.getMonth()), []);

  // Mock month events: assign dayOfWeek-based events to actual month dates
  const monthEvents = useMemo(() => {
    const map: Record<number, CalendarEvent[]> = {};
    for (let d = 1; d <= monthData.daysInMonth; d++) {
      const date = new Date(monthData.year, monthData.month, d);
      const dow = (date.getDay() + 6) % 7;
      map[d] = mockEvents.filter((e) => e.dayOfWeek === dow);
    }
    return map;
  }, [monthData]);

  const dayEvents = selectedDay !== null
    ? mockEvents.filter((e) => e.dayOfWeek === (selectedDay !== null ? selectedDay : currentDayOfWeek))
    : mockEvents.filter((e) => e.dayOfWeek === currentDayOfWeek);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Calendar"
        right={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('week')}
              className={`text-xs px-4 py-2 rounded-lg transition-colors ${
                view === 'week' ? 'bg-accent text-white' : 'bg-card border border-border text-muted hover:text-text'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView('month')}
              className={`text-xs px-4 py-2 rounded-lg transition-colors ${
                view === 'month' ? 'bg-accent text-white' : 'bg-card border border-border text-muted hover:text-text'
              }`}
            >
              Month
            </button>
          </div>
        }
      />

      <div className="p-8 md:p-12 max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Main Calendar Area */}
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex-1 min-w-0"
          >
            {view === 'week' ? (
              /* Week View */
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Day headers */}
                <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border">
                  <div className="p-3" />
                  {dayNames.map((name, i) => (
                    <div
                      key={name}
                      className={`p-3 text-center text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors ${
                        i === currentDayOfWeek
                          ? 'text-accent bg-accent/5'
                          : 'text-muted hover:text-text'
                      }`}
                      onClick={() => setSelectedDay(i)}
                    >
                      <div>{name}</div>
                      {i === currentDayOfWeek && (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mx-auto mt-1" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Time grid */}
                <div className="relative max-h-[600px] overflow-y-auto">
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border/50 h-[50px] relative"
                    >
                      <div className="px-2 py-1 text-[10px] text-muted text-right pr-3 -translate-y-2">
                        {formatHour(hour)}
                      </div>
                      {dayNames.map((_, di) => {
                        const eventsInSlot = mockEvents.filter(
                          (e) =>
                            e.dayOfWeek === di &&
                            e.startHour <= hour &&
                            e.endHour > hour
                        );
                        return (
                          <div
                            key={di}
                            className="border-l border-border/30 relative cursor-pointer hover:bg-white/[0.01]"
                            onClick={() => setSelectedDay(di)}
                          >
                            {eventsInSlot.map((ev) => {
                              if (ev.startHour !== hour) return null;
                              const durationHours =
                                ev.endHour +
                                ev.endMin / 60 -
                                (ev.startHour + ev.startMin / 60);
                              const topOffset = (ev.startMin / 60) * 50;
                              const height = durationHours * 50 - 2;

                              return (
                                <motion.div
                                  key={ev.id}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: di * 0.03, duration: 0.3 }}
                                  className="absolute left-0.5 right-0.5 rounded-md px-1.5 py-1 overflow-hidden z-10"
                                  style={{
                                    top: topOffset,
                                    height: Math.max(height, 22),
                                    backgroundColor: categoryBgColors[ev.category],
                                    borderLeft: `3px solid ${categoryColors[ev.category]}`,
                                  }}
                                >
                                  <p
                                    className="text-[10px] font-medium truncate"
                                    style={{ color: categoryColors[ev.category] }}
                                  >
                                    {ev.title}
                                  </p>
                                  {height > 30 && (
                                    <p className="text-[9px] text-muted truncate">
                                      {formatTime(ev.startHour, ev.startMin)}
                                    </p>
                                  )}
                                </motion.div>
                              );
                            })}
                          </div>
                        );
                      })}

                      {/* Current time indicator */}
                      {hour === currentHour && (
                        <div
                          className="absolute left-[60px] right-0 h-[2px] bg-red-500 z-20 pointer-events-none"
                          style={{ top: `${(currentMin / 60) * 50}px` }}
                        >
                          <div className="absolute -left-1.5 -top-[4px] w-[10px] h-[10px] rounded-full bg-red-500" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 px-4 py-3 border-t border-border">
                  {(Object.keys(categoryColors) as EventCategory[]).map((cat) => (
                    <div key={cat} className="flex items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ backgroundColor: categoryColors[cat] }}
                      />
                      <span className="text-[10px] text-muted">{cat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Month View */
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                  <h2 className="text-lg font-semibold font-[family-name:var(--font-oxanium)]">
                    {new Date(monthData.year, monthData.month).toLocaleString('default', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h2>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 border-b border-border">
                  {dayNames.map((name) => (
                    <div
                      key={name}
                      className="p-2 text-center text-[10px] font-medium uppercase tracking-wider text-muted"
                    >
                      {name}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7">
                  {/* Empty cells for offset */}
                  {Array.from({ length: monthData.startDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-24 border-b border-r border-border/30" />
                  ))}

                  {Array.from({ length: monthData.daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isToday = day === now.getDate();
                    const evts = monthEvents[day] || [];
                    const uniqueCategories = [...new Set(evts.map((e) => e.category))];
                    const dayDow = (new Date(monthData.year, monthData.month, day).getDay() + 6) % 7;

                    return (
                      <motion.div
                        key={day}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.01 * i, duration: 0.2 }}
                        className={`h-24 border-b border-r border-border/30 p-2 cursor-pointer hover:bg-white/[0.02] transition-colors ${
                          isToday ? 'bg-accent/5' : ''
                        }`}
                        onClick={() => setSelectedDay(dayDow)}
                      >
                        <span
                          className={`text-xs ${
                            isToday
                              ? 'bg-accent text-white w-6 h-6 rounded-full inline-flex items-center justify-center font-semibold'
                              : 'text-muted'
                          }`}
                        >
                          {day}
                        </span>
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {uniqueCategories.slice(0, 4).map((cat) => (
                            <div
                              key={cat}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: categoryColors[cat] }}
                            />
                          ))}
                        </div>
                        {evts.length > 0 && (
                          <p className="text-[9px] text-muted mt-1 truncate">
                            {evts.length} event{evts.length > 1 ? 's' : ''}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* Day Detail Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="w-72 shrink-0 hidden lg:block"
          >
            <div className="bg-card border border-border rounded-xl p-5 sticky top-28">
              <h3 className="text-sm font-semibold font-[family-name:var(--font-oxanium)] mb-4">
                {selectedDay !== null ? dayNamesFull[selectedDay] : dayNamesFull[currentDayOfWeek]}
              </h3>

              <div className="space-y-3">
                <AnimatePresence mode="wait">
                  {dayEvents
                    .sort((a, b) => a.startHour - b.startHour || a.startMin - b.startMin)
                    .map((ev, i) => (
                      <motion.div
                        key={ev.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ delay: i * 0.05, duration: 0.25 }}
                        className="rounded-lg p-3"
                        style={{
                          backgroundColor: categoryBgColors[ev.category],
                          borderLeft: `3px solid ${categoryColors[ev.category]}`,
                        }}
                      >
                        <p className="text-xs font-semibold text-text">{ev.title}</p>
                        <p className="text-[10px] text-muted mt-1">
                          {formatTime(ev.startHour, ev.startMin)} - {formatTime(ev.endHour, ev.endMin)}
                        </p>
                        <span
                          className="inline-block text-[9px] uppercase tracking-wider mt-1.5 px-1.5 py-0.5 rounded"
                          style={{
                            color: categoryColors[ev.category],
                            backgroundColor: categoryColors[ev.category] + '20',
                          }}
                        >
                          {ev.category}
                        </span>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {/* Weather placeholder */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Weather</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {'\u2600\uFE0F'}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-text">72\u00B0F</p>
                    <p className="text-[10px] text-muted">Partly Cloudy</p>
                  </div>
                </div>
              </div>

              {/* Reminders placeholder */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Reminders</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Pack gym bag</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-status" />
                    <span>Review study notes</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
