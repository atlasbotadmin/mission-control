'use client';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

interface Agent {
  name: string;
  role: string;
  model: string;
  status: string;
  description: string;
  capabilities: string[];
  lastActive: string;
  color: string;
}

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              agent.status === 'online' ? 'bg-status animate-pulse' : 'bg-idle'
            }`}
          ></div>
          <div>
            <h3 className="font-semibold text-xl">{agent.name}</h3>
            <p className="text-sm text-muted">{agent.role}</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-background text-xs rounded-full border border-border">
          {agent.model}
        </span>
      </div>

      <p className="text-sm text-muted mb-4">{agent.description}</p>

      <div className="space-y-3">
        <div>
          <h4 className="text-xs font-semibold text-muted mb-2">CAPABILITIES</h4>
          <div className="flex flex-wrap gap-2">
            {agent.capabilities.map((cap, j) => (
              <span key={j} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded border border-accent/20">
                {cap}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
          <span className="text-muted">Last active</span>
          <span className={agent.status === 'online' ? 'text-status' : 'text-idle'}>
            {agent.lastActive}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AgentsPage() {
  const agents: Agent[] = [
    {
      name: 'Atlas',
      role: 'Main',
      model: 'Opus',
      status: 'online',
      description: 'Primary executive assistant handling core tasks, scheduling, and coordination',
      capabilities: ['Task Management', 'Calendar', 'Email', 'Research'],
      lastActive: 'Active now',
      color: '#0080FF',
    },
    {
      name: 'Forge',
      role: 'Web Architect',
      model: 'Opus',
      status: 'online',
      description: 'Senior web architect building and upgrading Mission Control interfaces',
      capabilities: ['Next.js', 'React', 'UI/UX', 'Architecture'],
      lastActive: 'Active now',
      color: '#F59E0B',
    },
    {
      name: 'Sage',
      role: 'Research',
      model: 'Opus',
      status: 'idle',
      description: 'Deep research specialist for technical topics and learning assistance',
      capabilities: ['Web Research', 'Summarization', 'Documentation', 'Analysis'],
      lastActive: '1 day ago',
      color: '#A855F7',
    },
    {
      name: 'Anvil',
      role: 'Backend Engineer',
      model: 'Sonnet',
      status: 'idle',
      description: 'Backend systems specialist handling APIs, databases, and infrastructure',
      capabilities: ['API Design', 'Databases', 'DevOps', 'Testing'],
      lastActive: '3 hours ago',
      color: '#EC4899',
    },
    {
      name: 'Vault',
      role: 'Data & Security',
      model: 'Sonnet',
      status: 'idle',
      description: 'Data management and security specialist for encryption, storage, and compliance',
      capabilities: ['Encryption', 'Data Storage', 'Compliance', 'Backup'],
      lastActive: '6 hours ago',
      color: '#6366F1',
    },
    {
      name: 'Voyage',
      role: 'Travel',
      model: 'Sonnet',
      status: 'idle',
      description: 'Travel planning specialist for trip research, bookings, and itineraries',
      capabilities: ['Flight Search', 'Hotel Booking', 'Itinerary Planning', 'Travel Tips'],
      lastActive: '2 hours ago',
      color: '#EC4899',
    },
    {
      name: 'Harvest',
      role: 'Meal Prep',
      model: 'Sonnet',
      status: 'idle',
      description: 'Meal planning and prep assistant with recipe suggestions and grocery lists',
      capabilities: ['Recipe Search', 'Meal Planning', 'Grocery Lists', 'Nutrition Info'],
      lastActive: '5 hours ago',
      color: '#00d4aa',
    },
  ];

  const activeAgents = agents.filter(a => a.status === 'online');
  const idleAgents = agents.filter(a => a.status === 'idle');
  const totalCallsToday = 42;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Agents" />
      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-8">

        {/* KPI Summary Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Agents', value: String(agents.length), sub: `${activeAgents.length} active · ${idleAgents.length} idle`, color: '#0080FF' },
            { label: 'Active Now', value: String(activeAgents.length), sub: activeAgents.map(a => a.name).join(', '), color: '#00d4aa' },
            { label: 'Calls Today', value: String(totalCallsToday), sub: '6/call avg', color: '#A855F7' },
            { label: 'Top Model', value: 'Opus', sub: '3 agents · highest capacity', color: '#F59E0B' },
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted mb-1">{kpi.label}</div>
              <div className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
              <div className="text-xs text-muted mt-1">{kpi.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Active Agents */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-status animate-pulse"></div>
            <h2 className="text-lg font-semibold text-status">Active Agents</h2>
            <span className="text-xs text-muted ml-1">({activeAgents.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {activeAgents.map((agent, i) => (
              <AgentCard key={agent.name} agent={agent} index={i} />
            ))}
          </div>
        </motion.section>

        {/* Divider */}
        <div className="border-t border-border"></div>

        {/* Idle Agents */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-idle"></div>
            <h2 className="text-lg font-semibold text-idle">Idle Agents</h2>
            <span className="text-xs text-muted ml-1">({idleAgents.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {idleAgents.map((agent, i) => (
              <AgentCard key={agent.name} agent={agent} index={i + activeAgents.length} />
            ))}
          </div>
        </motion.section>

        {/* Add Agent Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center pt-6"
        >
          <button className="px-6 py-3 bg-accent text-background rounded-lg font-medium hover:bg-accent/90 transition-colors">
            + Add New Agent
          </button>
        </motion.div>
      </div>
    </div>
  );
}
