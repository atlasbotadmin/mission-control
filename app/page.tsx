'use client';

import { useState, useEffect } from 'react';

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

  const events = [
    { time: '8:30 AM', title: 'Morning Routine' },
    { time: '8:30 PM', title: 'Evening Routine' },
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
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-accent">Online</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today Panel */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Today</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-muted mb-2">Schedule</h3>
                  <div className="space-y-2">
                    {events.map((event, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className="text-muted w-20">{event.time}</span>
                        <span>{event.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Current Shift</span>
                    <span className="text-accent">Closing: 10:00a - 6:30p</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Weather</span>
                    <span>72°F • Partly Cloudy</span>
                  </div>
                </div>
              </div>
            </div>

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
                          agent.status === 'online' ? 'bg-accent' : 'bg-gray-600'
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
