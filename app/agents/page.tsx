'use client';

interface Agent {
  name: string;
  role: string;
  model: string;
  status: string;
  description: string;
  capabilities: string[];
  lastActive: string;
}

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
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
    </div>
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
      lastActive: 'Active now'
    },
    { 
      name: 'Voyage', 
      role: 'Travel', 
      model: 'Sonnet', 
      status: 'idle',
      description: 'Travel planning specialist for trip research, bookings, and itineraries',
      capabilities: ['Flight Search', 'Hotel Booking', 'Itinerary Planning', 'Travel Tips'],
      lastActive: '2 hours ago'
    },
    { 
      name: 'Harvest', 
      role: 'Meal Prep', 
      model: 'Sonnet', 
      status: 'idle',
      description: 'Meal planning and prep assistant with recipe suggestions and grocery lists',
      capabilities: ['Recipe Search', 'Meal Planning', 'Grocery Lists', 'Nutrition Info'],
      lastActive: '5 hours ago'
    },
    { 
      name: 'Sage', 
      role: 'Research', 
      model: 'Opus', 
      status: 'idle',
      description: 'Deep research specialist for technical topics and learning assistance',
      capabilities: ['Web Research', 'Summarization', 'Documentation', 'Analysis'],
      lastActive: '1 day ago'
    },
  ];

  const activeAgents = agents.filter(a => a.status === 'online');
  const idleAgents = agents.filter(a => a.status === 'idle');

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="pb-6 border-b border-border">
          <h1 className="text-3xl font-bold">
              <span className="text-accent">Atlas</span> <span className="inline-block w-px h-7 bg-white/40 mx-3 align-middle"></span> Agents
            </h1>
          <p className="text-muted mt-2">AI agents and their capabilities</p>
        </header>

        {/* Active Agents */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-status animate-pulse"></div>
            <h2 className="text-lg font-semibold text-status">Active Agents</h2>
            <span className="text-xs text-muted ml-1">({activeAgents.length})</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeAgents.map((agent, i) => (
              <AgentCard key={i} agent={agent} />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-border"></div>

        {/* Idle Agents */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-idle"></div>
            <h2 className="text-lg font-semibold text-idle">Idle Agents</h2>
            <span className="text-xs text-muted ml-1">({idleAgents.length})</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {idleAgents.map((agent, i) => (
              <AgentCard key={i} agent={agent} />
            ))}
          </div>
        </section>

        {/* Add Agent Button */}
        <div className="flex justify-center pt-6">
          <button className="px-6 py-3 bg-accent text-background rounded-lg font-medium hover:bg-accent/90 transition-colors">
            + Add New Agent
          </button>
        </div>
      </div>
    </div>
  );
}
