'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: '🏠', label: 'Dashboard' },
    { href: '/projects', icon: '🚀', label: 'Projects' },
    { href: '/agents', icon: '🤖', label: 'Agents' },
    { href: '/stats', icon: '📊', label: 'Stats' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-[#080808] border-r border-[#1a1a1a] flex flex-col items-center py-6 z-50">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-background font-bold text-xl">
          A
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              w-12 h-12 rounded-lg flex items-center justify-center text-2xl
              transition-all duration-200 relative group
              ${
                isActive(item.href)
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted hover:bg-[#1a1a1a] hover:text-text'
              }
            `}
            title={item.label}
          >
            {isActive(item.href) && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r"></div>
            )}
            <span>{item.icon}</span>
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
          w-12 h-12 rounded-lg flex items-center justify-center text-2xl
          transition-all duration-200 relative group
          ${
            isActive('/settings')
              ? 'bg-accent/10 text-accent'
              : 'text-muted hover:bg-[#1a1a1a] hover:text-text'
          }
        `}
        title="Settings"
      >
        {isActive('/settings') && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r"></div>
        )}
        <span>⚙️</span>
        {/* Tooltip */}
        <span className="absolute left-16 ml-2 px-3 py-1.5 bg-[#1a1a1a] text-text text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#252525]">
          Settings
        </span>
      </Link>
    </aside>
  );
};

export default Sidebar;
