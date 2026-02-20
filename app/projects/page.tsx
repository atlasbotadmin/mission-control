'use client';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

export default function ProjectsPage() {
  const projects = [
    { name: 'EA Launch', target: 'Feb 17, 2026', progress: 85, description: 'Launch of Executive Assistant agent with core features', color: '#0080FF' },
    { name: 'Wedding Planning', target: 'Sep 2026', progress: 30, description: 'Complete wedding planning and coordination', color: '#EC4899' },
    { name: 'MO-210 Excel Certification', target: null, progress: 60, description: 'Microsoft Office Specialist Excel certification', color: '#00d4aa' },
    { name: 'AZ-900 Azure Fundamentals', target: null, progress: 40, description: 'Azure cloud fundamentals certification', color: '#A855F7' },
    { name: 'DP-900 Azure Data Fundamentals', target: null, progress: 15, description: 'Azure data fundamentals certification', color: '#F59E0B' },
  ];

  const avgProgress = Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length);
  const completedCount = projects.filter(p => p.progress === 100).length;
  const nearestDeadline = projects.filter(p => p.target).sort()[0];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Projects" />
      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-8">

        {/* KPI Summary Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Projects', value: String(projects.length), sub: `${completedCount} completed`, color: '#0080FF' },
            { label: 'Avg Progress', value: `${avgProgress}%`, sub: 'across all projects', color: '#00d4aa' },
            { label: 'Next Deadline', value: 'Feb 17', sub: nearestDeadline?.name || '', color: '#F59E0B' },
            { label: 'In Progress', value: String(projects.filter(p => p.progress > 0 && p.progress < 100).length), sub: 'active projects', color: '#A855F7' },
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted mb-1">{kpi.label}</div>
              <div className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
              <div className="text-xs text-muted mt-1">{kpi.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  {project.target && (
                    <p className="text-sm text-muted mt-1">Target: {project.target}</p>
                  )}
                </div>
                <span className="text-2xl font-bold" style={{ color: project.color }}>{project.progress}%</span>
              </div>

              <p className="text-sm text-muted mb-4">{project.description}</p>

              <div className="space-y-2">
                <div className="w-full bg-background rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: project.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.08 }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-muted">
                  <span>Progress</span>
                  <span>{project.progress}/100</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Project Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center pt-6"
        >
          <button className="px-6 py-3 bg-accent text-background rounded-lg font-medium hover:bg-accent/90 transition-colors">
            + Add New Project
          </button>
        </motion.div>
      </div>
    </div>
  );
}
