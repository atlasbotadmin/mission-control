'use client';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

export default function SettingsPage() {
  const sections = [
    {
      title: 'General',
      delay: 0,
      items: [
        {
          label: 'Theme',
          description: 'Dark mode (default)',
          action: 'button' as const,
          actionLabel: 'Change',
          border: true,
        },
        {
          label: 'Time Format',
          description: '12-hour (AM/PM)',
          action: 'button' as const,
          actionLabel: 'Change',
          border: true,
        },
        {
          label: 'Notifications',
          description: 'Enable desktop notifications',
          action: 'toggle' as const,
          defaultChecked: true,
          border: false,
        },
      ],
    },
    {
      title: 'Agents',
      delay: 0.1,
      items: [
        {
          label: 'Default Model',
          description: 'Claude Opus',
          action: 'button' as const,
          actionLabel: 'Change',
          border: true,
        },
        {
          label: 'Auto-start Agents',
          description: 'Start agents on system boot',
          action: 'toggle' as const,
          defaultChecked: false,
          border: false,
        },
      ],
    },
    {
      title: 'Data & Privacy',
      delay: 0.2,
      items: [
        {
          label: 'Export Data',
          description: 'Download all your data',
          action: 'button' as const,
          actionLabel: 'Export',
          border: true,
        },
        {
          label: 'Clear Cache',
          description: 'Remove temporary data',
          action: 'button' as const,
          actionLabel: 'Clear',
          border: false,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Settings" />
      <div className="max-w-4xl mx-auto space-y-6 p-4 md:p-8">

        {/* Settings Sections */}
        <div className="space-y-6">
          {sections.map((section, sIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sIdx * 0.1 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item, iIdx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: sIdx * 0.1 + 0.1 + iIdx * 0.05 }}
                    className={`flex items-center justify-between py-3 ${item.border ? 'border-b border-border' : ''}`}
                  >
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted">{item.description}</div>
                    </div>
                    {item.action === 'button' ? (
                      <button className={`px-4 py-2 bg-background border border-border rounded-lg text-sm transition-colors ${
                        item.actionLabel === 'Clear' ? 'hover:border-red-500' : 'hover:border-accent'
                      }`}>
                        {item.actionLabel}
                      </button>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultChecked} />
                        <div className="w-11 h-6 bg-background border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-muted after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <div className="space-y-2 text-sm text-muted">
              <div>Mission Control v1.0.0</div>
              <div>Built with Next.js and TypeScript</div>
              <div className="pt-4 border-t border-border mt-4">
                <a href="https://github.com/atlasbotadmin/mission-control" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  View on GitHub →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
