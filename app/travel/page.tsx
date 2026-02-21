'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';

type TripStatus = 'Planning' | 'Booked' | 'Completed';

interface ItineraryItem {
  time: string;
  title: string;
  description: string;
}

interface BudgetItem {
  category: string;
  estimated: number;
  spent: number;
}

interface PackingItem {
  name: string;
  packed: boolean;
}

interface Trip {
  id: string;
  destination: string;
  country: string;
  dateRange: string;
  startDate: Date;
  status: TripStatus;
  accent: string;
  gradient: string;
  itinerary: ItineraryItem[];
  budget: BudgetItem[];
  packingList: PackingItem[];
}

const statusColors: Record<TripStatus, string> = {
  Planning: '#F59E0B',
  Booked: '#00d4aa',
  Completed: '#0080FF',
};

const trips: Trip[] = [
  {
    id: 'austin',
    destination: 'Austin',
    country: 'Texas, USA',
    dateRange: 'Mar 14 - 16, 2026',
    startDate: new Date(2026, 2, 14),
    status: 'Booked',
    accent: '#00d4aa',
    gradient: 'linear-gradient(135deg, #00d4aa15, #00d4aa05)',
    itinerary: [
      { time: 'Fri 2:00 PM', title: 'Drive to Austin', description: 'Depart Houston, ~2.5 hrs' },
      { time: 'Fri 6:00 PM', title: 'Check-in & dinner', description: 'South Congress area' },
      { time: 'Sat 9:00 AM', title: 'Barton Springs', description: 'Morning swim' },
      { time: 'Sat 12:00 PM', title: 'Lunch on Rainey St', description: 'Explore the strip' },
      { time: 'Sat 7:00 PM', title: '6th Street', description: 'Live music' },
      { time: 'Sun 10:00 AM', title: 'Brunch & drive back', description: 'Return to Houston' },
    ],
    budget: [
      { category: 'Hotel', estimated: 320, spent: 289 },
      { category: 'Gas', estimated: 60, spent: 0 },
      { category: 'Food & Drinks', estimated: 200, spent: 0 },
      { category: 'Activities', estimated: 80, spent: 0 },
    ],
    packingList: [
      { name: 'Sunglasses', packed: true },
      { name: 'Swim trunks', packed: true },
      { name: 'Portable charger', packed: false },
      { name: 'Camera', packed: false },
      { name: 'Casual outfits (x3)', packed: false },
    ],
  },
  {
    id: 'cancun',
    destination: 'Canc\u00FAn',
    country: 'Mexico',
    dateRange: 'Apr 18 - 25, 2026',
    startDate: new Date(2026, 3, 18),
    status: 'Planning',
    accent: '#0080FF',
    gradient: 'linear-gradient(135deg, #0080FF15, #0080FF05)',
    itinerary: [
      { time: 'Sat', title: 'Fly to Canc\u00FAn', description: 'IAH \u2192 CUN' },
      { time: 'Sun', title: 'Beach day', description: 'Hotel zone beaches' },
      { time: 'Mon', title: 'Chich\u00E9n Itz\u00E1', description: 'Day trip to ruins' },
      { time: 'Tue', title: 'Cenotes tour', description: 'Swim in cenotes' },
      { time: 'Wed', title: 'Isla Mujeres', description: 'Ferry & snorkeling' },
    ],
    budget: [
      { category: 'Flights', estimated: 450, spent: 0 },
      { category: 'Hotel (7 nights)', estimated: 1100, spent: 0 },
      { category: 'Food & Drinks', estimated: 500, spent: 0 },
      { category: 'Activities', estimated: 300, spent: 0 },
      { category: 'Transportation', estimated: 150, spent: 0 },
    ],
    packingList: [
      { name: 'Passport', packed: false },
      { name: 'Sunscreen SPF 50', packed: false },
      { name: 'Snorkel gear', packed: false },
      { name: 'Travel adapter', packed: false },
      { name: 'Beach towel', packed: false },
      { name: 'Water shoes', packed: false },
    ],
  },
  {
    id: 'nyc',
    destination: 'NYC',
    country: 'New York, USA',
    dateRange: 'Oct 2 - 6, 2026',
    startDate: new Date(2026, 9, 2),
    status: 'Planning',
    accent: '#A855F7',
    gradient: 'linear-gradient(135deg, #A855F715, #A855F705)',
    itinerary: [
      { time: 'Fri', title: 'Arrive JFK', description: 'Check into hotel in Manhattan' },
      { time: 'Sat', title: 'Central Park & Museums', description: 'MET, Natural History' },
      { time: 'Sun', title: 'Brooklyn Bridge & DUMBO', description: 'Walk the bridge, explore' },
      { time: 'Mon', title: 'Broadway show', description: 'TBD show' },
      { time: 'Tue', title: 'Fly home', description: 'Morning flight back' },
    ],
    budget: [
      { category: 'Flights', estimated: 380, spent: 0 },
      { category: 'Hotel (4 nights)', estimated: 900, spent: 0 },
      { category: 'Food & Drinks', estimated: 400, spent: 0 },
      { category: 'Broadway', estimated: 200, spent: 0 },
      { category: 'Transportation', estimated: 100, spent: 0 },
    ],
    packingList: [
      { name: 'Fall jacket', packed: false },
      { name: 'Walking shoes', packed: false },
      { name: 'Umbrella', packed: false },
      { name: 'Layers', packed: false },
    ],
  },
  {
    id: 'honeymoon',
    destination: 'Honeymoon',
    country: 'TBD',
    dateRange: 'Sep 2026',
    startDate: new Date(2026, 8, 1),
    status: 'Planning',
    accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B15, #F59E0B05)',
    itinerary: [
      { time: 'TBD', title: 'Destination research', description: 'Shortlist locations' },
      { time: 'TBD', title: 'Book flights & hotel', description: 'Awaiting confirmation' },
    ],
    budget: [
      { category: 'Flights', estimated: 2000, spent: 0 },
      { category: 'Accommodation', estimated: 3000, spent: 0 },
      { category: 'Activities', estimated: 1000, spent: 0 },
      { category: 'Food & Drinks', estimated: 800, spent: 0 },
    ],
    packingList: [],
  },
];

function getDaysAway(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function TravelPage() {
  const [expandedTrip, setExpandedTrip] = useState<string | null>(null);
  const [packingState, setPackingState] = useState<Record<string, boolean[]>>(() => {
    const state: Record<string, boolean[]> = {};
    trips.forEach((t) => {
      state[t.id] = t.packingList.map((p) => p.packed);
    });
    return state;
  });

  const togglePacking = (tripId: string, idx: number) => {
    setPackingState((prev) => {
      const updated = { ...prev };
      updated[tripId] = [...(updated[tripId] || [])];
      updated[tripId][idx] = !updated[tripId][idx];
      return updated;
    });
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Travel"
        right={
          <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Plan a Trip
          </button>
        }
      />

      <div className="p-8 md:p-12 max-w-7xl mx-auto">
        {trips.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <span className="text-5xl mb-4">{'\u2708\uFE0F'}</span>
            <p className="text-lg text-muted">No trips planned yet &mdash; time to explore!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trips.map((trip, i) => {
              const isExpanded = expandedTrip === trip.id;
              const daysAway = getDaysAway(trip.startDate);
              const totalEstimated = trip.budget.reduce((s, b) => s + b.estimated, 0);
              const totalSpent = trip.budget.reduce((s, b) => s + b.spent, 0);

              return (
                <motion.div
                  key={trip.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className={`bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-opacity-60 transition-all ${
                    isExpanded ? 'md:col-span-2' : ''
                  }`}
                  style={{
                    borderColor: isExpanded ? trip.accent + '40' : undefined,
                  }}
                  onClick={() => setExpandedTrip(isExpanded ? null : trip.id)}
                >
                  {/* Card Header */}
                  <div
                    className="p-5 relative"
                    style={{ background: trip.gradient }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold font-[family-name:var(--font-oxanium)] text-text">
                          {trip.destination}
                        </h3>
                        <p className="text-xs text-muted mt-1">{trip.country}</p>
                      </div>
                      <span
                        className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          color: statusColors[trip.status],
                          backgroundColor: statusColors[trip.status] + '18',
                        }}
                      >
                        {trip.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <div>
                        <p className="text-[10px] text-muted uppercase tracking-wider">Dates</p>
                        <p className="text-sm text-text mt-0.5">{trip.dateRange}</p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-[10px] text-muted uppercase tracking-wider">Countdown</p>
                        <p className="text-lg font-bold font-[family-name:var(--font-oxanium)]" style={{ color: trip.accent }}>
                          {daysAway}
                          <span className="text-xs text-muted font-normal ml-1">days</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-border">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
                            {/* Itinerary */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">
                                Itinerary
                              </h4>
                              <div className="space-y-0 relative">
                                <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border" />
                                {trip.itinerary.map((item, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
                                    className="flex gap-3 py-2 relative"
                                  >
                                    <div
                                      className="w-[11px] h-[11px] rounded-full border-2 bg-background mt-0.5 z-10 shrink-0"
                                      style={{ borderColor: trip.accent }}
                                    />
                                    <div>
                                      <p className="text-[10px] text-muted">{item.time}</p>
                                      <p className="text-xs text-text font-medium">{item.title}</p>
                                      <p className="text-[10px] text-muted">{item.description}</p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {/* Budget */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">
                                Budget
                              </h4>
                              <div className="space-y-3">
                                {trip.budget.map((item, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.15 + idx * 0.05, duration: 0.3 }}
                                  >
                                    <div className="flex justify-between text-xs mb-1">
                                      <span className="text-muted">{item.category}</span>
                                      <span className="text-text">
                                        ${item.spent > 0 ? item.spent : '—'}{' '}
                                        <span className="text-muted">/ ${item.estimated}</span>
                                      </span>
                                    </div>
                                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                                      <motion.div
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: trip.accent }}
                                        initial={{ width: 0 }}
                                        animate={{
                                          width:
                                            item.spent > 0
                                              ? `${Math.min((item.spent / item.estimated) * 100, 100)}%`
                                              : '0%',
                                        }}
                                        transition={{ delay: 0.3 + idx * 0.05, duration: 0.6 }}
                                      />
                                    </div>
                                  </motion.div>
                                ))}
                                <div className="pt-2 border-t border-border flex justify-between text-xs">
                                  <span className="text-muted font-medium">Total</span>
                                  <span className="text-text font-semibold">
                                    ${totalSpent > 0 ? totalSpent.toLocaleString() : '—'}{' '}
                                    <span className="text-muted font-normal">
                                      / ${totalEstimated.toLocaleString()}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Packing List */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">
                                Packing List
                              </h4>
                              {trip.packingList.length === 0 ? (
                                <p className="text-xs text-muted italic">No items yet</p>
                              ) : (
                                <div className="space-y-2">
                                  {trip.packingList.map((item, idx) => {
                                    const isPacked = packingState[trip.id]?.[idx] ?? item.packed;
                                    return (
                                      <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.15 + idx * 0.04, duration: 0.25 }}
                                        className="flex items-center gap-2.5 cursor-pointer group"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          togglePacking(trip.id, idx);
                                        }}
                                      >
                                        <div
                                          className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                                            isPacked
                                              ? 'border-accent bg-accent'
                                              : 'border-[#444] group-hover:border-accent/50'
                                          }`}
                                        >
                                          {isPacked && (
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                              <path
                                                d="M2 5L4 7L8 3"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                          )}
                                        </div>
                                        <span
                                          className={`text-xs transition-all ${
                                            isPacked ? 'text-muted line-through' : 'text-text'
                                          }`}
                                        >
                                          {item.name}
                                        </span>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
