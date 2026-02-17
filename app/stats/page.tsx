'use client';
import PageHeader from '../components/PageHeader';

export default function StatsPage() {
  const weeklyStats = [
    { day: 'Mon', tasks: 5, hours: 3.5 },
    { day: 'Tue', tasks: 8, hours: 5.2 },
    { day: 'Wed', tasks: 6, hours: 4.1 },
    { day: 'Thu', tasks: 4, hours: 2.8 },
    { day: 'Fri', tasks: 7, hours: 4.9 },
    { day: 'Sat', tasks: 2, hours: 1.5 },
    { day: 'Sun', tasks: 3, hours: 2.0 },
  ];

  const projectStats = [
    { name: 'EA Launch', completed: 42, total: 50 },
    { name: 'Wedding Planning', completed: 15, total: 50 },
    { name: 'MO-210 Excel', completed: 12, total: 20 },
    { name: 'AZ-900 Azure', completed: 8, total: 20 },
  ];

  const maxTasks = Math.max(...weeklyStats.map(s => s.tasks));

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Stats" />
      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-8">

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted mb-2">Tasks This Week</div>
            <div className="text-4xl font-bold text-accent">35</div>
            <div className="text-xs text-muted mt-2">↑ 12% from last week</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted mb-2">Current Streak</div>
            <div className="text-4xl font-bold text-accent">5</div>
            <div className="text-xs text-muted mt-2">days in a row</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted mb-2">Focus Time</div>
            <div className="text-4xl font-bold text-accent">24</div>
            <div className="text-xs text-muted mt-2">hours this week</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted mb-2">Projects Active</div>
            <div className="text-4xl font-bold text-accent">5</div>
            <div className="text-xs text-muted mt-2">2 near completion</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Activity Chart */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Weekly Activity</h2>
            <div className="space-y-4">
              {weeklyStats.map((stat, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted w-12">{stat.day}</span>
                    <span className="text-accent font-semibold">{stat.tasks} tasks</span>
                    <span className="text-muted">{stat.hours}h</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${(stat.tasks / maxTasks) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Progress */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Project Progress</h2>
            <div className="space-y-6">
              {projectStats.map((project, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-accent font-semibold">
                      {project.completed}/{project.total}
                    </span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${(project.completed / project.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Milestones */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Milestones</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0080FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
              <div>
                <div className="font-medium">Completed AZ-900 Module 2</div>
                <div className="text-muted text-xs">Feb 15, 2026</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-accent text-2xl">🏆</span>
              <div>
                <div className="font-medium">5-day streak achieved</div>
                <div className="text-muted text-xs">Feb 16, 2026</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-accent text-2xl">✅</span>
              <div>
                <div className="font-medium">EA Launch 85% complete</div>
                <div className="text-muted text-xs">Feb 14, 2026</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-accent text-2xl">📚</span>
              <div>
                <div className="font-medium">Last weekly review completed</div>
                <div className="text-muted text-xs">Feb 7, 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
