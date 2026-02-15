'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [activeTab, setActiveTab] = useState('next-actions');

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

  const tasks = {
    'next-actions': [
      { title: 'Review AZ-900 Module 3', list: 'Learning', due: 'Today', overdue: false },
      { title: 'Submit timesheet', list: 'Work', due: 'Feb 16', overdue: false },
      { title: 'Call venue coordinator', list: 'Wedding', due: 'Feb 14', overdue: true },
    ],
    'waiting-for': [
      { title: 'Response from wedding DJ', list: 'Wedding', due: null, overdue: false },
      { title: 'Port Houston badge renewal', list: 'Work', due: null, overdue: false },
    ],
    'someday-maybe': [
      { title: 'Learn Python automation', list: 'Learning', due: null, overdue: false },
      { title: 'Set up home lab', list: 'Tech', due: null, overdue: false },
    ],
  };

  const projects = [
    { name: 'EA Launch', target: 'Feb 17, 2026', progress: 85 },
    { name: 'Wedding Planning', target: 'Sep 2026', progress: 30 },
    { name: 'MO-210 Excel Certification', target: null, progress: 60 },
    { name: 'AZ-900 Azure Fundamentals', target: null, progress: 40 },
    { name: 'DP-900 Azure Data Fundamentals', target: null, progress: 15 },
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

            {/* Tasks & GTD */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Tasks</h2>
              <div className="flex gap-2 mb-4 border-b border-border">
                <button
                  onClick={() => setActiveTab('next-actions')}
                  className={`pb-3 px-1 text-sm font-medium transition-colors ${
                    activeTab === 'next-actions'
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-muted hover:text-text'
                  }`}
                >
                  Next Actions
                </button>
                <button
                  onClick={() => setActiveTab('waiting-for')}
                  className={`pb-3 px-1 text-sm font-medium transition-colors ${
                    activeTab === 'waiting-for'
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-muted hover:text-text'
                  }`}
                >
                  Waiting For
                </button>
                <button
                  onClick={() => setActiveTab('someday-maybe')}
                  className={`pb-3 px-1 text-sm font-medium transition-colors ${
                    activeTab === 'someday-maybe'
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-muted hover:text-text'
                  }`}
                >
                  Someday/Maybe
                </button>
              </div>
              <div className="space-y-2">
                {tasks[activeTab as keyof typeof tasks].map((task, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-background/50 transition-colors"
                  >
                    <input type="checkbox" className="mt-1 accent-accent" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={task.overdue ? 'text-red-400' : ''}>{task.title}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                        <span>{task.list}</span>
                        {task.due && (
                          <>
                            <span>•</span>
                            <span className={task.overdue ? 'text-red-400' : ''}>{task.due}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Projects</h2>
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
              <h2 className="text-xl font-semibold mb-4">Agents</h2>
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

            {/* Stats/Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Stats</h2>
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
