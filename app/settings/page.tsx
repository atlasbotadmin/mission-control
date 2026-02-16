'use client';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="pb-6 border-b border-border">
          <h1 className="text-3xl font-bold">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0080FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 align-middle"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg> Settings
          </h1>
          <p className="text-muted mt-2">Configure your Mission Control preferences</p>
        </header>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">General</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium">Theme</div>
                  <div className="text-sm text-muted">Dark mode (default)</div>
                </div>
                <button className="px-4 py-2 bg-background border border-border rounded-lg text-sm hover:border-accent transition-colors">
                  Change
                </button>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium">Time Format</div>
                  <div className="text-sm text-muted">12-hour (AM/PM)</div>
                </div>
                <button className="px-4 py-2 bg-background border border-border rounded-lg text-sm hover:border-accent transition-colors">
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium">Notifications</div>
                  <div className="text-sm text-muted">Enable desktop notifications</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-background border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-muted after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Agent Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Agents</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium">Default Model</div>
                  <div className="text-sm text-muted">Claude Opus</div>
                </div>
                <button className="px-4 py-2 bg-background border border-border rounded-lg text-sm hover:border-accent transition-colors">
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium">Auto-start Agents</div>
                  <div className="text-sm text-muted">Start agents on system boot</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-background border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-muted after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Data & Privacy</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="font-medium">Export Data</div>
                  <div className="text-sm text-muted">Download all your data</div>
                </div>
                <button className="px-4 py-2 bg-background border border-border rounded-lg text-sm hover:border-accent transition-colors">
                  Export
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium">Clear Cache</div>
                  <div className="text-sm text-muted">Remove temporary data</div>
                </div>
                <button className="px-4 py-2 bg-background border border-border rounded-lg text-sm hover:border-red-500 transition-colors">
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <div className="space-y-2 text-sm text-muted">
              <div>Mission Control v1.0.0</div>
              <div>Built with Next.js and TypeScript</div>
              <div className="pt-4 border-t border-border mt-4">
                <a href="https://github.com/atlasbotadmin/mission-control" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  View on GitHub →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
