'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';

interface Habit {
  id: string;
  name: string;
  category: 'Health' | 'Productivity' | 'Self-care';
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  todayDone: boolean;
  weeklyHistory: boolean[][]; // 12 weeks of 7 days
}

const categoryColors: Record<string, string> = {
  Health: '#00d4aa',
  Productivity: '#0080FF',
  'Self-care': '#A855F7',
};

const initialHabits: Habit[] = [
  {
    id: 'morning',
    name: 'Morning Routine',
    category: 'Self-care',
    currentStreak: 14,
    longestStreak: 31,
    completionRate: 89,
    todayDone: true,
    weeklyHistory: generateHistory(0.89),
  },
  {
    id: 'evening',
    name: 'Evening Routine',
    category: 'Self-care',
    currentStreak: 7,
    longestStreak: 21,
    completionRate: 76,
    todayDone: true,
    weeklyHistory: generateHistory(0.76),
  },
  {
    id: 'treadmill',
    name: 'Treadmill (30 min)',
    category: 'Health',
    currentStreak: 3,
    longestStreak: 18,
    completionRate: 62,
    todayDone: false,
    weeklyHistory: generateHistory(0.62),
  },
  {
    id: 'meditation',
    name: 'Meditation',
    category: 'Self-care',
    currentStreak: 21,
    longestStreak: 45,
    completionRate: 91,
    todayDone: true,
    weeklyHistory: generateHistory(0.91),
  },
  {
    id: 'theragun',
    name: 'Theragun',
    category: 'Health',
    currentStreak: 5,
    longestStreak: 14,
    completionRate: 58,
    todayDone: false,
    weeklyHistory: generateHistory(0.58),
  },
  {
    id: 'study',
    name: 'Study Session',
    category: 'Productivity',
    currentStreak: 9,
    longestStreak: 22,
    completionRate: 72,
    todayDone: false,
    weeklyHistory: generateHistory(0.72),
  },
  {
    id: 'mealprep',
    name: 'Meal Prep',
    category: 'Health',
    currentStreak: 2,
    longestStreak: 8,
    completionRate: 44,
    todayDone: false,
    weeklyHistory: generateHistory(0.44),
  },
];

function generateHistory(rate: number): boolean[][] {
  const weeks: boolean[][] = [];
  for (let w = 0; w < 12; w++) {
    const week: boolean[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(Math.random() < rate);
    }
    weeks.push(week);
  }
  return weeks;
}

function getFlameScale(streak: number): string {
  if (streak >= 21) return 'text-2xl';
  if (streak >= 14) return 'text-xl';
  if (streak >= 7) return 'text-lg';
  return 'text-base';
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, todayDone: !h.todayDone } : h))
    );
  };

  const completedToday = habits.filter((h) => h.todayDone).length;
  const totalHabits = habits.length;

  // Build combined heatmap data
  const getHeatmapData = () => {
    if (selectedHabit) {
      const habit = habits.find((h) => h.id === selectedHabit);
      if (!habit) return [];
      return habit.weeklyHistory;
    }
    // Overall: ratio of habits completed each day
    const combined: number[][] = [];
    for (let w = 0; w < 12; w++) {
      const week: number[] = [];
      for (let d = 0; d < 7; d++) {
        const done = habits.filter((h) => h.weeklyHistory[w][d]).length;
        week.push(done / totalHabits);
      }
      combined.push(week);
    }
    return combined;
  };

  const heatmapData = getHeatmapData();
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Habits"
        right={
          <div className="flex items-center gap-3">
            <div className="bg-card border border-border rounded-lg px-4 py-2 text-sm">
              <span className="text-muted">Today:</span>{' '}
              <span className="text-accent font-semibold">{completedToday}</span>
              <span className="text-muted"> / {totalHabits}</span>
            </div>
          </div>
        }
      />

      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8">
        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold font-[family-name:var(--font-oxanium)]">
              Activity Heatmap
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedHabit(null)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                  !selectedHabit
                    ? 'bg-accent text-white'
                    : 'bg-border/50 text-muted hover:text-text'
                }`}
              >
                Overall
              </button>
              {habits.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHabit(h.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-colors hidden md:block ${
                    selectedHabit === h.id
                      ? 'bg-accent text-white'
                      : 'bg-border/50 text-muted hover:text-text'
                  }`}
                >
                  {h.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Day labels + grid */}
          <div className="flex gap-2">
            <div className="flex flex-col gap-[3px] pt-5">
              {dayLabels.map((d) => (
                <div key={d} className="h-[14px] text-[10px] text-muted flex items-center">
                  {d}
                </div>
              ))}
            </div>
            <div className="flex gap-[3px] flex-1 overflow-x-auto">
              {heatmapData.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {(selectedHabit
                    ? (week as boolean[]).map((v: boolean) => (v ? 1 : 0))
                    : (week as number[])
                  ).map((val: number, di: number) => {
                    let color = '#1a1a1a';
                    if (typeof val === 'number') {
                      if (val >= 0.8) color = '#0080FF';
                      else if (val >= 0.5) color = '#0080FFaa';
                      else if (val > 0) color = '#0080FF40';
                    }
                    return (
                      <motion.div
                        key={di}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.2 + wi * 0.03 + di * 0.01,
                          duration: 0.2,
                        }}
                        className="w-[14px] h-[14px] rounded-[3px]"
                        style={{ backgroundColor: color }}
                        title={`Week ${wi + 1}, ${dayLabels[di]}: ${
                          typeof val === 'number' ? Math.round(val * 100) + '%' : val ? 'Done' : 'Missed'
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 mt-4 justify-end">
            <span className="text-[10px] text-muted">Less</span>
            {['#1a1a1a', '#0080FF40', '#0080FFaa', '#0080FF'].map((c) => (
              <div
                key={c}
                className="w-3 h-3 rounded-[2px]"
                style={{ backgroundColor: c }}
              />
            ))}
            <span className="text-[10px] text-muted">More</span>
          </div>
        </motion.div>

        {/* Today's Habits */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold font-[family-name:var(--font-oxanium)] mb-4">
            Today&apos;s Habits
          </h2>
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {habits.map((habit, i) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
                onClick={() => toggleHabit(habit.id)}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      habit.todayDone
                        ? 'bg-accent border-accent'
                        : 'border-[#444] hover:border-accent/50'
                    }`}
                  >
                    {habit.todayDone && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2.5 6L5 8.5L9.5 3.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    )}
                  </div>
                  <span
                    className={`text-sm transition-all ${
                      habit.todayDone ? 'text-muted line-through' : 'text-text'
                    }`}
                  >
                    {habit.name}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full"
                    style={{
                      color: categoryColors[habit.category],
                      backgroundColor: categoryColors[habit.category] + '15',
                    }}
                  >
                    {habit.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className={getFlameScale(habit.currentStreak)}>
                    {habit.currentStreak > 0 ? '\uD83D\uDD25' : ''}
                  </span>
                  <span className="text-muted font-mono">{habit.currentStreak}d</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Streak Overview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold font-[family-name:var(--font-oxanium)] mb-4">
            Streak Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {habits.map((habit, i) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.4 }}
                className="bg-card border border-border rounded-xl p-4 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs text-muted truncate pr-2">{habit.name}</p>
                  <span className={getFlameScale(habit.currentStreak)}>
                    {habit.currentStreak > 0 ? '\uD83D\uDD25' : '\u2B50'}
                  </span>
                </div>
                <p className="text-2xl font-bold font-[family-name:var(--font-oxanium)] text-text">
                  {habit.currentStreak}
                  <span className="text-xs text-muted font-normal ml-1">days</span>
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-muted">
                    Best: <span className="text-text">{habit.longestStreak}d</span>
                  </span>
                  <span
                    className="font-semibold"
                    style={{
                      color:
                        habit.completionRate >= 80
                          ? '#00d4aa'
                          : habit.completionRate >= 60
                          ? '#F59E0B'
                          : '#ef4444',
                    }}
                  >
                    {habit.completionRate}%
                  </span>
                </div>
                {/* Mini progress bar */}
                <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor:
                        habit.completionRate >= 80
                          ? '#00d4aa'
                          : habit.completionRate >= 60
                          ? '#F59E0B'
                          : '#ef4444',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${habit.completionRate}%` }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-5 flex items-center justify-between"
        >
          <p className="text-sm text-muted">
            You completed{' '}
            <span className="text-accent font-semibold">{completedToday}</span> of{' '}
            <span className="text-text font-semibold">{totalHabits}</span> habits today
          </p>
          <div className="h-2 flex-1 max-w-xs ml-6 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedToday / totalHabits) * 100}%` }}
              transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
