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
      <path d="M4.5 16.5L12 3l7.5 13.5" />
      <path d="M12 3v18" />
      <path d="M4.5 16.5c0 2.5 3.4 4.5 7.5 4.5s7.5-2 7.5-4.5" />
    </svg>
  ),
  agents: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="9" cy="10" r="1.5" />
      <circle cx="15" cy="10" r="1.5" />
      <path d="M9 15.5c0 0 1.5 1.5 3 1.5s3-1.5 3-1.5" />
      <path d="M9 1v3" />
      <path d="M15 1v3" />
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
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#00d4aa" />
          <path d="M12 28L20 10L28 28" stroke="#080808" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.5 23H25.5" stroke="#080808" strokeWidth="2.5" strokeLinecap="round" />
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
            {icons[item.icon](isActive(item.href) ? '#00d4aa' : '#888')}
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
        {icons.settings(isActive('/settings') ? '#00d4aa' : '#888')}
        {/* Tooltip */}
        <span className="absolute left-16 ml-2 px-3 py-1.5 bg-[#1a1a1a] text-text text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#252525]">
          Settings
        </span>
      </Link>
    </aside>
  );
};

export default Sidebar;
