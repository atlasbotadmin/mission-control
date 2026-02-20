'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

// Mock data — will be replaced with live API data
const agents = [
  { name: 'Atlas', model: 'Opus 4.6', color: '#0080FF', inputTokens: 2_847_320, outputTokens: 1_423_660, calls: 342, avgResponseMs: 4200, costIn: 42.71, costOut: 85.42 },
  { name: 'Sage', model: 'Sonnet 4.5', color: '#A855F7', inputTokens: 1_256_800, outputTokens: 628_400, calls: 187, avgResponseMs: 2100, costIn: 3.77, costOut: 9.43 },
  { name: 'Forge', model: 'Opus 4.6', color: '#F59E0B', inputTokens: 982_140, outputTokens: 1_891_230, calls: 56, avgResponseMs: 8400, costIn: 14.73, costOut: 113.47 },
  { name: 'Harvest', model: 'Sonnet 4.5', color: '#00d4aa', inputTokens: 412_600, outputTokens: 206_300, calls: 64, avgResponseMs: 1800, costIn: 1.24, costOut: 3.09 },
  { name: 'Voyage', model: 'Sonnet 4.5', color: '#EC4899', inputTokens: 189_400, outputTokens: 94_700, calls: 23, avgResponseMs: 2300, costIn: 0.57, costOut: 1.42 },
];

const dailyCosts = [
  { day: 'Feb 14', cost: 18.42 },
  { day: 'Feb 15', cost: 24.67 },
  { day: 'Feb 16', cost: 52.31 },
  { day: 'Feb 17', cost: 38.19 },
  { day: 'Feb 18', cost: 12.84 },
  { day: 'Feb 19', cost: 29.56 },
  { day: 'Feb 20', cost: 9.23 },
];

const hourlySpark = [0.2, 0.1, 0.05, 0.02, 0.8, 1.0, 0.9, 0.6, 0.7, 0.85, 0.5, 0.65, 0.9, 0.7, 0.4, 0.3, 0.5, 0.6, 0.8, 0.45, 0.3, 0.6, 0.4, 0.15];

const totalInput = agents.reduce((s, a) => s + a.inputTokens, 0);
const totalOutput = agents.reduce((s, a) => s + a.outputTokens, 0);
const totalCost = agents.reduce((s, a) => s + a.costIn + a.costOut, 0);
const totalCalls = agents.reduce((s, a) => s + a.calls, 0);
const avgCostPerConvo = totalCost / totalCalls;
const weekCost = dailyCosts.reduce((s, d) => s + d.cost, 0);
const maxDailyCost = Math.max(...dailyCosts.map(d => d.cost));

function formatTokens(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
  return n.toString();
}

function ProgressRing({ percent, color, size = 72, stroke = 5 }: { percent: number; color: string; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#252525" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </svg>
  );
}

function Sparkline({ data, color, height = 32 }: { data: number[]; color: string; height?: number }) {
  const w = 100;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${height - v * height}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <polyline points={`0,${height} ${points} ${w},${height}`} fill={`${color}15`} stroke="none" />
    </svg>
  );
}

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Stats" right={
        <div className="flex gap-1 bg-background border border-border rounded-lg p-1">
          {(['7d', '30d', 'all'] as const).map(r => (
            <button key={r} onClick={() => setTimeRange(r)}
              className={`px-3 py-1 text-xs rounded-md transition-all ${timeRange === r ? 'bg-accent text-white' : 'text-muted hover:text-text'}`}>
              {r === 'all' ? 'All' : r}
            </button>
          ))}
        </div>
      } />

      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-8">

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Total Tokens', value: formatTokens(totalInput + totalOutput), sub: `${formatTokens(totalInput)} in · ${formatTokens(totalOutput)} out`, color: '#0080FF' },
            { label: 'Est. Cost', value: `$${totalCost.toFixed(2)}`, sub: `$${weekCost.toFixed(2)} this week`, color: '#00d4aa' },
            { label: 'API Calls', value: totalCalls.toString(), sub: `${(totalCalls / 7).toFixed(0)}/day avg`, color: '#A855F7' },
            { label: 'Avg Cost/Call', value: `$${avgCostPerConvo.toFixed(2)}`, sub: 'across all agents', color: '#F59E0B' },
            { label: 'Most Active', value: [...agents].sort((a, b) => b.calls - a.calls)[0].name, sub: `${[...agents].sort((a, b) => b.calls - a.calls)[0].calls} calls`, color: [...agents].sort((a, b) => b.calls - a.calls)[0].color },
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted mb-1">{kpi.label}</div>
              <div className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
              <div className="text-xs text-muted mt-1">{kpi.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Daily Cost Trend + 24h Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Daily Cost Trend</h2>
            <div className="flex items-end gap-2" style={{ height: 160 }}>
              {dailyCosts.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs text-muted">${d.cost.toFixed(0)}</div>
                  <motion.div
                    className="w-full rounded-t-md"
                    style={{ background: `linear-gradient(to top, #0080FF, #0080FF88)` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.cost / maxDailyCost) * 120}px` }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                  />
                  <div className="text-xs text-muted">{d.day.split(' ')[1]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">24h Activity</h2>
            <p className="text-xs text-muted mb-4">Requests by hour</p>
            <Sparkline data={hourlySpark} color="#0080FF" height={80} />
            <div className="flex justify-between text-xs text-muted mt-2">
              <span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>Now</span>
            </div>
          </div>
        </div>

        {/* Bottom row: Agent Breakdown + Cost by Model Donut */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Breakdown — 2/3 width */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Agent Breakdown</h2>
            <div className="space-y-4">
              {agents.map((agent, i) => {
                const agentTotal = agent.costIn + agent.costOut;
                const costPct = (agentTotal / totalCost) * 100;
                const tokenPct = ((agent.inputTokens + agent.outputTokens) / (totalInput + totalOutput)) * 100;
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <ProgressRing percent={costPct} color={agent.color} />
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: agent.color }}>
                        {costPct.toFixed(0)}%
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{agent.name}</span>
                        <span className="text-xs text-muted px-2 py-0.5 rounded-full border border-border">{agent.model}</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-1.5 mb-2">
                        <motion.div className="h-1.5 rounded-full" style={{ backgroundColor: agent.color }}
                          initial={{ width: 0 }} animate={{ width: `${tokenPct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }} />
                      </div>
                      <div className="flex gap-4 text-xs text-muted">
                        <span>{formatTokens(agent.inputTokens)} in</span>
                        <span>{formatTokens(agent.outputTokens)} out</span>
                        <span>{agent.calls} calls</span>
                        <span>{(agent.avgResponseMs / 1000).toFixed(1)}s avg</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold" style={{ color: agent.color }}>${agentTotal.toFixed(2)}</div>
                      <div className="text-xs text-muted">${agent.costIn.toFixed(2)} in · ${agent.costOut.toFixed(2)} out</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Cost by Model — Donut Chart — 1/3 width */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-lg p-6 flex flex-col items-center"
          >
            <h2 className="text-lg font-semibold mb-6 self-start">Cost by Model</h2>
            {(() => {
              const opus = agents.filter(a => a.model.includes('Opus'));
              const sonnet = agents.filter(a => a.model.includes('Sonnet'));
              const opusCost = opus.reduce((s, a) => s + a.costIn + a.costOut, 0);
              const sonnetCost = sonnet.reduce((s, a) => s + a.costIn + a.costOut, 0);
              const opusPct = (opusCost / totalCost) * 100;
              const sonnetPct = (sonnetCost / totalCost) * 100;
              const size = 160;
              const strokeW = 20;
              const r = (size - strokeW) / 2;
              const circ = 2 * Math.PI * r;
              const opusLen = (opusPct / 100) * circ;
              const sonnetLen = (sonnetPct / 100) * circ;
              const gap = 4;

              return (
                <>
                  <div className="relative" style={{ width: size, height: size }}>
                    <svg width={size} height={size} className="transform -rotate-90">
                      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1a1a1a" strokeWidth={strokeW} />
                      <motion.circle
                        cx={size / 2} cy={size / 2} r={r} fill="none"
                        stroke="#0080FF" strokeWidth={strokeW} strokeLinecap="round"
                        strokeDasharray={`${opusLen - gap} ${circ - opusLen + gap}`}
                        initial={{ strokeDashoffset: circ }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                      />
                      <motion.circle
                        cx={size / 2} cy={size / 2} r={r} fill="none"
                        stroke="#A855F7" strokeWidth={strokeW} strokeLinecap="round"
                        strokeDasharray={`${sonnetLen - gap} ${circ - sonnetLen + gap}`}
                        strokeDashoffset={-opusLen}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">${totalCost.toFixed(0)}</span>
                      <span className="text-xs text-muted">total</span>
                    </div>
                  </div>

                  <div className="w-full mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0080FF' }} />
                        <span className="text-sm font-medium">Opus 4.6</span>
                      </div>
                      <span className="text-sm font-semibold text-accent">{opusPct.toFixed(0)}%</span>
                    </div>
                    <div className="text-center text-xl font-bold text-accent">${opusCost.toFixed(2)}</div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#A855F7' }} />
                        <span className="text-sm font-medium">Sonnet 4.5</span>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: '#A855F7' }}>{sonnetPct.toFixed(0)}%</span>
                    </div>
                    <div className="text-center text-xl font-bold" style={{ color: '#A855F7' }}>${sonnetCost.toFixed(2)}</div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
