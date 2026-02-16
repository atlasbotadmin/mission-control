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
  certifications: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v7a5 5 0 0 1-10 0V4z" />
      <path d="M7 7H4a1 1 0 0 0-1 1v1a3 3 0 0 0 3 3h1" />
      <path d="M17 7h3a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3h-1" />
    </svg>
  ),
  settings: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: 'dashboard', label: 'Dashboard' },
    { href: '/agents', icon: 'agents', label: 'Agents' },
    { href: '/projects', icon: 'projects', label: 'Projects' },
    { href: '/certifications', icon: 'certifications', label: 'Certifications' },
  ];

  const bottomItems = [
    { href: '/stats', icon: 'stats', label: 'Stats' },
    { href: '/settings', icon: 'settings', label: 'Settings' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-[#080808] border-r border-[#1a1a1a] flex flex-col items-center py-4 z-50">
      {/* Logo */}
      <div className="mb-6">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          {/* Hexagon monogram */}
          <polygon
            points="17,2 29.5,9.25 29.5,24.75 17,32 4.5,24.75 4.5,9.25"
            stroke="#0080FF"
            strokeWidth="1.8"
            fill="none"
          />
          <text
            x="17"
            y="22.5"
            textAnchor="middle"
            fill="#0080FF"
            fontSize="18"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="600"
            letterSpacing="-0.5"
          >A</text>
        </svg>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-2">
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
            {icons[item.icon](isActive(item.href) ? '#0080FF' : '#bbb')}
            <span className="absolute left-16 ml-2 px-3 py-1.5 bg-[#1a1a1a] text-text text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#252525]">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Navigation */}
      <nav className="flex flex-col gap-2 border-t border-[#1a1a1a] pt-3 pb-6">
        {bottomItems.map((item) => (
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
            {icons[item.icon](isActive(item.href) ? '#0080FF' : '#bbb')}
            <span className="absolute left-16 ml-2 px-3 py-1.5 bg-[#1a1a1a] text-text text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#252525]">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
