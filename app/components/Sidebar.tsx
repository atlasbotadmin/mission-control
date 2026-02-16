'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const icons: Record<string, (color: string) => ReactNode> = {
  dashboard: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  projects: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  agents: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  ),
  stats: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
    </svg>
  ),
  settings: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
};

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: 'dashboard', label: 'Dashboard' },
    { href: '/projects', icon: 'projects', label: 'Projects' },
    { href: '/agents', icon: 'agents', label: 'Agents' },
    { href: '/stats', icon: 'stats', label: 'Stats' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-[#080808] border-r border-[#1a1a1a] flex flex-col items-center py-6 z-50">
      {/* Logo */}
      <div className="mb-8">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          {/* Stacked Bars A - glitch aesthetic */}
          {/* Top peak bar */}
          <rect x="14" y="4" width="6" height="2.5" rx="0.5" fill="#0080FF" opacity="0.7" />
          {/* Second bar - slight glitch offset */}
          <rect x="11.5" y="8" width="12" height="2.5" rx="0.5" fill="#0080FF" opacity="0.85" />
          {/* Third bar - glitch shifted right */}
          <rect x="10" y="12" width="15" height="2.5" rx="0.5" fill="#0080FF" opacity="1" />
          {/* Crossbar - full width, bright */}
          <rect x="8" y="16" width="18" height="3" rx="0.5" fill="#0080FF" opacity="1" />
          {/* Below crossbar - split into two legs */}
          <rect x="6.5" y="20.5" width="7" height="2.5" rx="0.5" fill="#0080FF" opacity="0.9" />
          <rect x="20.5" y="20.5" width="7" height="2.5" rx="0.5" fill="#0080FF" opacity="0.9" />
          {/* Bottom bars - legs wider apart, glitch offset */}
          <rect x="4.5" y="24.5" width="7.5" height="2.5" rx="0.5" fill="#0080FF" opacity="0.75" />
          <rect x="22.5" y="24.5" width="7.5" height="2.5" rx="0.5" fill="#0080FF" opacity="0.6" />
          {/* Glitch artifact - thin offset bar */}
          <rect x="13" y="14.5" width="4" height="1" rx="0.3" fill="#0080FF" opacity="0.35" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              w-12 h-12 rounded-lg flex items-center justify-center
              transition-all duration-200 relative group
              ${
                isActive(item.href)
                  ? 'bg-accent/10'
                  : 'hover:bg-[#1a1a1a]'
              }
            `}
            title={item.label}
          >
            {isActive(item.href) && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r"></div>
            )}
            {icons[item.icon](isActive(item.href) ? '#0080FF' : '#888')}
            {/* Tooltip */}
            <span className="absolute left-16 ml-2 px-3 py-1.5 bg-[#1a1a1a] text-text text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#252525]">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Settings at bottom */}
      <Link
        href="/settings"
        className={`
          w-12 h-12 rounded-lg flex items-center justify-center
          transition-all duration-200 relative group
          ${
            isActive('/settings')
              ? 'bg-accent/10'
              : 'hover:bg-[#1a1a1a]'
          }
        `}
        title="Settings"
      >
        {isActive('/settings') && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r"></div>
        )}
        {icons.settings(isActive('/settings') ? '#0080FF' : '#888')}
        {/* Tooltip */}
        <span className="absolute left-16 ml-2 px-3 py-1.5 bg-[#1a1a1a] text-text text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#252525]">
          Settings
        </span>
      </Link>
    </aside>
  );
};

export default Sidebar;
