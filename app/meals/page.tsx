'use client';

import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

/* ─── types ─── */
interface Meal {
  name: string;
  emoji: string;
  calories: number;
  protein: number;
}

interface DayPlan {
  day: string;
  short: string;
  meals: Record<string, Meal>;
}

/* ─── slot labels ─── */
const SLOTS = [
  { key: 'meal1', label: 'Meal 1', sub: 'Breakfast' },
  { key: 'meal2', label: 'Meal 2', sub: 'Lunch' },
  { key: 'meal3', label: 'Meal 3', sub: 'Dinner' },
  { key: 'shake1', label: 'Shake 1', sub: '' },
  { key: 'shake2', label: 'Shake 2', sub: '' },
  { key: 'snacks', label: 'Snacks', sub: '' },
] as const;

/* ─── mock data ─── */
const WEEK: DayPlan[] = [
  {
    day: 'Monday',
    short: 'Mon',
    meals: {
      meal1: { name: 'Overnight Oats', emoji: '🥣', calories: 420, protein: 28 },
      meal2: { name: 'Chicken Rice Bowl', emoji: '🍗', calories: 620, protein: 48 },
      meal3: { name: 'Grilled Salmon + Veggies', emoji: '🐟', calories: 580, protein: 44 },
      shake1: { name: 'Chocolate Protein', emoji: '🥤', calories: 260, protein: 40 },
      shake2: { name: 'Banana PB Shake', emoji: '🍌', calories: 310, protein: 36 },
      snacks: { name: 'Greek Yogurt + Berries', emoji: '🫐', calories: 180, protein: 14 },
    },
  },
  {
    day: 'Tuesday',
    short: 'Tue',
    meals: {
      meal1: { name: 'Eggs & Avocado Toast', emoji: '🥑', calories: 450, protein: 26 },
      meal2: { name: 'Turkey Wrap', emoji: '🌯', calories: 540, protein: 38 },
      meal3: { name: 'Beef Stir Fry', emoji: '🥩', calories: 640, protein: 50 },
      shake1: { name: 'Vanilla Protein', emoji: '🥤', calories: 250, protein: 40 },
      shake2: { name: 'Green Smoothie', emoji: '🥬', calories: 220, protein: 30 },
      snacks: { name: 'Almonds & Dark Choc', emoji: '🍫', calories: 200, protein: 8 },
    },
  },
  {
    day: 'Wednesday',
    short: 'Wed',
    meals: {
      meal1: { name: 'Protein Pancakes', emoji: '🥞', calories: 480, protein: 34 },
      meal2: { name: 'Tuna Salad Bowl', emoji: '🥗', calories: 490, protein: 42 },
      meal3: { name: 'Chicken Fajitas', emoji: '🌮', calories: 600, protein: 46 },
      shake1: { name: 'Strawberry Protein', emoji: '🥤', calories: 260, protein: 40 },
      shake2: { name: 'Oat Milk Shake', emoji: '🥛', calories: 280, protein: 32 },
      snacks: { name: 'Rice Cakes + PB', emoji: '🍘', calories: 190, protein: 10 },
    },
  },
  {
    day: 'Thursday',
    short: 'Thu',
    meals: {
      meal1: { name: 'Overnight Oats', emoji: '🥣', calories: 420, protein: 28 },
      meal2: { name: 'Grilled Chicken Salad', emoji: '🥗', calories: 510, protein: 44 },
      meal3: { name: 'Shrimp Pasta', emoji: '🍝', calories: 570, protein: 40 },
      shake1: { name: 'Chocolate Protein', emoji: '🥤', calories: 260, protein: 40 },
      shake2: { name: 'Berry Blast Shake', emoji: '🍓', calories: 270, protein: 34 },
      snacks: { name: 'Cottage Cheese + Fruit', emoji: '🍑', calories: 160, protein: 18 },
    },
  },
  {
    day: 'Friday',
    short: 'Fri',
    meals: {
      meal1: { name: 'Eggs & Turkey Bacon', emoji: '🍳', calories: 400, protein: 32 },
      meal2: { name: 'Chicken Rice Bowl', emoji: '🍗', calories: 620, protein: 48 },
      meal3: { name: 'Grilled Salmon + Veggies', emoji: '🐟', calories: 580, protein: 44 },
      shake1: { name: 'Vanilla Protein', emoji: '🥤', calories: 250, protein: 40 },
      shake2: { name: 'Banana PB Shake', emoji: '🍌', calories: 310, protein: 36 },
      snacks: { name: 'Protein Bar', emoji: '🍫', calories: 220, protein: 20 },
    },
  },
  {
    day: 'Saturday',
    short: 'Sat',
    meals: {
      meal1: { name: 'Veggie Omelette', emoji: '🥚', calories: 380, protein: 28 },
      meal2: { name: 'Poke Bowl', emoji: '🍣', calories: 560, protein: 38 },
      meal3: { name: 'Ribeye & Sweet Potato', emoji: '🥩', calories: 720, protein: 54 },
      shake1: { name: 'Chocolate Protein', emoji: '🥤', calories: 260, protein: 40 },
      shake2: { name: 'Mango Protein Shake', emoji: '🥭', calories: 290, protein: 34 },
      snacks: { name: 'Trail Mix', emoji: '🥜', calories: 250, protein: 10 },
    },
  },
  {
    day: 'Sunday',
    short: 'Sun',
    meals: {
      meal1: { name: 'French Toast + Berries', emoji: '🍞', calories: 460, protein: 24 },
      meal2: { name: 'Turkey Burger + Salad', emoji: '🍔', calories: 580, protein: 42 },
      meal3: { name: 'Lemon Herb Chicken', emoji: '🍋', calories: 550, protein: 46 },
      shake1: { name: 'Vanilla Protein', emoji: '🥤', calories: 250, protein: 40 },
      shake2: { name: 'Green Smoothie', emoji: '🥬', calories: 220, protein: 30 },
      snacks: { name: 'Greek Yogurt + Honey', emoji: '🍯', calories: 190, protein: 16 },
    },
  },
];

/* ─── helpers ─── */
function getDayTotals(day: DayPlan) {
  return Object.values(day.meals).reduce(
    (acc, m) => ({ calories: acc.calories + m.calories, protein: acc.protein + m.protein }),
    { calories: 0, protein: 0 }
  );
}

function getTodayIndex(): number {
  const jsDay = new Date().getDay(); // 0=Sun
  return jsDay === 0 ? 6 : jsDay - 1; // convert to Mon=0
}

/* ─── page ─── */
export default function MealPlanPage() {
  const todayIdx = getTodayIndex();

  const weeklyCalories = WEEK.reduce((s, d) => s + getDayTotals(d).calories, 0);
  const weeklyProtein = WEEK.reduce((s, d) => s + getDayTotals(d).protein, 0);
  const avgDailyProtein = Math.round(weeklyProtein / 7);
  const avgDailyCalories = Math.round(weeklyCalories / 7);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Meal Plan"
        right={
          <span className="text-xs text-muted font-medium tracking-wide uppercase">
            Week of Feb 17 – 23
          </span>
        }
      />

      <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-6">
        {/* ── weekly summary bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { label: 'Weekly Calories', value: weeklyCalories.toLocaleString(), unit: 'kcal', color: 'text-accent' },
            { label: 'Avg Daily Protein', value: `${avgDailyProtein}g`, unit: '', color: 'text-status' },
            { label: 'Avg Daily Calories', value: avgDailyCalories.toLocaleString(), unit: 'kcal', color: 'text-accent' },
            { label: 'Meal Prep', value: '5 / 7', unit: 'days prepped', color: 'text-idle' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <p className="text-[11px] text-muted uppercase tracking-wider mb-1">{stat.label}</p>
              <p className={`text-xl font-semibold font-[family-name:var(--font-oxanium)] ${stat.color}`}>
                {stat.value}
                {stat.unit && <span className="text-xs text-muted ml-1 font-normal">{stat.unit}</span>}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── desktop: weekly grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hidden lg:block bg-card border border-border rounded-xl overflow-hidden"
        >
          {/* header row */}
          <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-border">
            <div className="p-3" />
            {WEEK.map((d, i) => {
              const isToday = i === todayIdx;
              return (
                <div
                  key={d.day}
                  className={`p-3 text-center border-l border-border ${isToday ? 'bg-accent/8' : ''}`}
                >
                  <p className={`text-xs font-semibold uppercase tracking-wider ${isToday ? 'text-accent' : 'text-muted'}`}>
                    {d.short}
                  </p>
                  {isToday && (
                    <span className="inline-block mt-1 w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </div>
              );
            })}
          </div>

          {/* meal rows */}
          {SLOTS.map((slot) => (
            <div key={slot.key} className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-border last:border-b-0">
              {/* row label */}
              <div className="p-3 flex flex-col justify-center">
                <p className="text-xs font-semibold text-white/90">{slot.label}</p>
                {slot.sub && <p className="text-[10px] text-muted">{slot.sub}</p>}
              </div>

              {/* day cells */}
              {WEEK.map((d, i) => {
                const meal = d.meals[slot.key];
                const isToday = i === todayIdx;
                return (
                  <motion.div
                    key={d.day}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 + i * 0.04, duration: 0.3 }}
                    className={`p-2.5 border-l border-border group hover:bg-white/[0.02] transition-colors ${isToday ? 'bg-accent/5' : ''}`}
                  >
                    <div className="flex items-start gap-1.5">
                      <span className="text-sm mt-0.5 shrink-0">{meal.emoji}</span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-white/90 leading-tight truncate">
                          {meal.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-muted">{meal.calories} cal</span>
                          <span className="text-[10px] text-status/80">{meal.protein}g P</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}

          {/* totals row */}
          <div className="grid grid-cols-[100px_repeat(7,1fr)] border-t border-accent/20 bg-accent/[0.03]">
            <div className="p-3 flex items-center">
              <p className="text-xs font-bold text-accent uppercase tracking-wider">Totals</p>
            </div>
            {WEEK.map((d, i) => {
              const totals = getDayTotals(d);
              const isToday = i === todayIdx;
              return (
                <motion.div
                  key={d.day}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.04, duration: 0.3 }}
                  className={`p-3 border-l border-border text-center ${isToday ? 'bg-accent/8' : ''}`}
                >
                  <p className="text-sm font-semibold font-[family-name:var(--font-oxanium)] text-white">
                    {totals.calories.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-muted">kcal</p>
                  <p className="text-xs font-semibold text-status mt-0.5">{totals.protein}g</p>
                  <p className="text-[10px] text-muted">protein</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── mobile / tablet: stacked day cards ── */}
        <div className="lg:hidden space-y-4">
          {WEEK.map((d, dayIdx) => {
            const totals = getDayTotals(d);
            const isToday = dayIdx === todayIdx;
            return (
              <motion.div
                key={d.day}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + dayIdx * 0.06, duration: 0.4 }}
                className={`bg-card border rounded-xl overflow-hidden ${isToday ? 'border-accent/50' : 'border-border'}`}
              >
                {/* day header */}
                <div className={`px-4 py-3 flex items-center justify-between ${isToday ? 'bg-accent/8' : 'bg-white/[0.02]'}`}>
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-semibold font-[family-name:var(--font-oxanium)] ${isToday ? 'text-accent' : 'text-white'}`}>
                      {d.day}
                    </h3>
                    {isToday && (
                      <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-muted">{totals.calories.toLocaleString()} kcal</span>
                    <span className="text-status font-medium">{totals.protein}g P</span>
                  </div>
                </div>

                {/* meals */}
                <div className="divide-y divide-border">
                  {SLOTS.map((slot) => {
                    const meal = d.meals[slot.key];
                    return (
                      <div key={slot.key} className="px-4 py-2.5 flex items-center gap-3">
                        <span className="text-base shrink-0">{meal.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-white/90 truncate">{meal.name}</p>
                          <p className="text-[10px] text-muted">{slot.label}{slot.sub ? ` · ${slot.sub}` : ''}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[11px] text-muted">{meal.calories} cal</p>
                          <p className="text-[10px] text-status/80">{meal.protein}g P</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
