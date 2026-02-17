'use client';
import PageHeader from '../components/PageHeader';

export default function ProjectsPage() {
  const projects = [
    { name: 'EA Launch', target: 'Feb 17, 2026', progress: 85, description: 'Launch of Executive Assistant agent with core features' },
    { name: 'Wedding Planning', target: 'Sep 2026', progress: 30, description: 'Complete wedding planning and coordination' },
    { name: 'MO-210 Excel Certification', target: null, progress: 60, description: 'Microsoft Office Specialist Excel certification' },
    { name: 'AZ-900 Azure Fundamentals', target: null, progress: 40, description: 'Azure cloud fundamentals certification' },
    { name: 'DP-900 Azure Data Fundamentals', target: null, progress: 15, description: 'Azure data fundamentals certification' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Projects" subtitle="Active projects and goals" />
      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-8">

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  {project.target && (
                    <p className="text-sm text-muted mt-1">Target: {project.target}</p>
                  )}
                </div>
                <span className="text-2xl font-bold text-accent">{project.progress}%</span>
              </div>
              
              <p className="text-sm text-muted mb-4">{project.description}</p>
              
              <div className="space-y-2">
                <div className="w-full bg-background rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>Progress</span>
                  <span>{project.progress}/100</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Project Button */}
        <div className="flex justify-center pt-6">
          <button className="px-6 py-3 bg-accent text-background rounded-lg font-medium hover:bg-accent/90 transition-colors">
            + Add New Project
          </button>
        </div>
      </div>
    </div>
  );
}
