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
  activity: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
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
    { href: '/agents', icon: 'agents', label: 'Agents' },
    { href: '/projects', icon: 'projects', label: 'Projects' },
    { href: '/certifications', icon: 'certifications', label: 'Certifications' },
    { href: '/activity', icon: 'activity', label: 'Activity' },
  ];

  const bottomItems = [
    { href: '/stats', icon: 'stats', label: 'Stats' },
    { href: '/settings', icon: 'settings', label: 'Settings' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-[#080808] border-r border-[#1a1a1a] flex flex-col items-center py-4 z-50">
      {/* Logo — Waypoint Compass */}
      <Link href="/" className="mb-6 group" title="Dashboard">
        <svg width="40" height="40" viewBox="0 0 34 34" fill="none" className="transition-transform duration-200 group-hover:scale-110">
          {/* Main compass needle / arrow up */}
          <path
            d="M17 3L12 20L17 17L22 20Z"
            fill={pathname === '/' ? '#0080FF' : '#555'}
            opacity="0.25"
            stroke={pathname === '/' ? '#0080FF' : '#555'}
            strokeWidth="1"
            className="transition-colors duration-200"
          />
          {/* Light refraction faces */}
          <polygon
            points="17,3 22,20 17,17"
            fill={pathname === '/' ? '#0080FF' : '#555'}
            opacity="0.15"
            className="transition-colors duration-200"
          />
          <polygon
            points="17,3 12,20 17,17"
            fill={pathname === '/' ? '#0080FF' : '#555'}
            opacity="0.3"
            className="transition-colors duration-200"
          />
          {/* South indicator */}
          <line x1="17" y1="20" x2="17" y2="28" stroke={pathname === '/' ? '#0080FF' : '#555'} strokeWidth="1" opacity="0.2" className="transition-colors duration-200"/>
          <circle cx="17" cy="29" r="1" fill={pathname === '/' ? '#0080FF' : '#555'} opacity="0.2" className="transition-colors duration-200"/>
          {/* Orbiting dot */}
          <circle r="1.2" fill="#00CCFF" opacity="0.8">
            <animateMotion dur="4s" repeatCount="indefinite" path="M17,17 m-10,0 a10,10 0 1,1 20,0 a10,10 0 1,1 -20,0"/>
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="4s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </Link>

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
