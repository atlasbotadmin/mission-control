'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15l-3 7 3-2 3 2-3-7" />
      <path d="M10 7l1 2h2l1-2" />
    </svg>
  ),
  finances: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Wallet body */}
      <path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z" />
      {/* Wallet flap */}
      <path d="M2 7l7-3.5a1 1 0 0 1 .9 0L17 7" />
      {/* Card slot / clasp */}
      <path d="M17 12h3v3h-3a1.5 1.5 0 0 1 0-3z" />
    </svg>
  ),
  habits: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M12 12c-3-4-7-3-8-1s1 5 4 5" />
      <path d="M12 12c3-4 7-3 8-1s-1 5-4 5" />
      <path d="M12 12c-2-5-1-9 0-10 1 1 2 5 0 10" />
    </svg>
  ),
  calendar: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </svg>
  ),
  travel: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1l5.7 3.2-3.3 3.3-2.3-.8c-.4-.1-.8 0-1 .3l-.3.4c-.2.3-.1.7.2.9l3.1 2.1 2.1 3.1c.2.3.6.4.9.2l.4-.3c.3-.2.4-.6.3-1l-.8-2.3 3.3-3.3 3.2 5.7c.2.4.7.5 1.1.3l.5-.3c.4-.2.6-.6.5-1.1z" />
    </svg>
  ),
  settings: (color) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

const navItems = [
  { href: '/calendar', icon: 'calendar', label: 'Calendar' },
  { href: '/finances', icon: 'finances', label: 'Finances' },
  { href: '/habits', icon: 'habits', label: 'Habits' },
  { href: '/projects', icon: 'projects', label: 'Tasks' },
  { href: '/travel', icon: 'travel', label: 'Travel' },
  { href: '/certifications', icon: 'certifications', label: 'Certifications' },
];

const bottomItems = [
  { href: '/agents', icon: 'agents', label: 'Agents' },
  { href: '/stats', icon: 'stats', label: 'Stats' },
  { href: '/settings', icon: 'settings', label: 'Settings' },
];

function NavLink({ item, isActive, onClick }: { item: { href: string; icon: string; label: string }; isActive: boolean; onClick?: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`
        w-12 h-12 rounded-lg flex items-center justify-center
        transition-all duration-200 relative group
        ${isActive ? 'bg-accent/10' : 'hover:bg-[#1a1a1a]'}
      `}
      title={item.label}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r"></div>
      )}
      <span className={`transition-colors duration-200 ${isActive ? 'text-[#0080FF]' : 'text-[#bbb] group-hover:text-[#0080FF]'}`}>
        {icons[item.icon]('currentColor')}
      </span>
      <span className="absolute left-16 ml-2 px-3 py-1.5 bg-[#1a1a1a] text-text text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#252525]">
        {item.label}
      </span>
    </Link>
  );
}

function MobileNavLink({ item, isActive, onClick }: { item: { href: string; icon: string; label: string }; isActive: boolean; onClick: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`
        flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200
        ${isActive ? 'bg-accent/10' : 'hover:bg-[#1a1a1a]'}
      `}
    >
      <span className={`transition-colors duration-200 ${isActive ? 'text-[#0080FF]' : 'text-[#bbb]'}`}>
        {icons[item.icon]('currentColor')}
      </span>
      <span className={`text-sm font-medium ${isActive ? 'text-[#0080FF]' : 'text-[#ccc]'}`}>
        {item.label}
      </span>
    </Link>
  );
}

const Sidebar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-16 bg-[#080808] border-r border-[#1a1a1a] flex-col items-center py-4 z-50">
        {/* Logo */}
        <Link href="/" className="mb-6 group" title="Dashboard">
          <svg width="48" height="48" viewBox="0 0 44 44" fill="none" className="transition-transform duration-200 group-hover:scale-110">
            <defs>
              <radialGradient id="logoBg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={pathname === '/' ? '#1a9fff' : '#555'} stopOpacity="0.18"/>
                <stop offset="80%" stopColor={pathname === '/' ? '#1a9fff' : '#555'} stopOpacity="0.06"/>
                <stop offset="100%" stopColor={pathname === '/' ? '#1a9fff' : '#555'} stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect x="1" y="1" width="42" height="42" rx="10" fill="url(#logoBg)" opacity={pathname === '/' ? 1 : 0} className="transition-all duration-200"/>
            <rect x="1" y="1" width="42" height="42" rx="10" stroke="#0080FF" strokeWidth="0.8" fill="none" opacity={pathname === '/' ? 0.4 : 0} className="transition-opacity duration-200"/>
            <path d="M22 8L17 25L22 22L27 25Z" fill="#0080FF" opacity="0.45" stroke="#0080FF" strokeWidth="1"/>
            <polygon points="22,8 27,25 22,22" fill="#0080FF" opacity="0.3"/>
            <polygon points="22,8 17,25 22,22" fill="#0080FF" opacity="0.5"/>
            <line x1="22" y1="25" x2="22" y2="33" stroke="#0080FF" strokeWidth="1" opacity="0.25"/>
            <circle cx="22" cy="34" r="1" fill="#0080FF" opacity="0.25"/>
            <circle r="1.2" fill="#00CCFF" opacity="0.8">
              <animateMotion dur="4s" repeatCount="indefinite" path="M22,22 m-10,0 a10,10 0 1,1 20,0 a10,10 0 1,1 -20,0"/>
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="4s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </Link>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} isActive={isActive(item.href)} />
          ))}
        </nav>

        <div className="flex-1" />

        {/* Bottom Navigation */}
        <nav className="flex flex-col gap-2 border-t border-[#1a1a1a] pt-3 pb-6">
          {bottomItems.map((item) => (
            <NavLink key={item.href} item={item} isActive={isActive(item.href)} />
          ))}
        </nav>
      </aside>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-[#0e0e0e] border border-[#252525] flex items-center justify-center text-[#bbb] hover:text-white hover:border-[#444] transition-colors"
        aria-label="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M3 5h14" />
          <path d="M3 10h14" />
          <path d="M3 15h14" />
        </svg>
      </button>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/60 z-[60]"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="md:hidden fixed left-0 top-0 h-screen w-[260px] bg-[#0a0a0a] border-r border-[#1a1a1a] z-[70] flex flex-col py-5 px-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                  <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
                    <path d="M22 8L17 25L22 22L27 25Z" fill="#0080FF" opacity="0.45" stroke="#0080FF" strokeWidth="1"/>
                    <polygon points="22,8 27,25 22,22" fill="#0080FF" opacity="0.3"/>
                    <polygon points="22,8 17,25 22,22" fill="#0080FF" opacity="0.5"/>
                  </svg>
                  <span className="text-sm font-semibold text-[#ccc] tracking-wide">Mission Control</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#888] hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M4 4l10 10" />
                    <path d="M14 4L4 14" />
                  </svg>
                </button>
              </div>

              {/* Dashboard Link */}
              <MobileNavLink
                item={{ href: '/', icon: 'dashboard', label: 'Dashboard' }}
                isActive={pathname === '/'}
                onClick={() => setMobileOpen(false)}
              />

              {/* Main Nav */}
              <div className="mt-2 space-y-1">
                {navItems.map((item) => (
                  <MobileNavLink key={item.href} item={item} isActive={isActive(item.href)} onClick={() => setMobileOpen(false)} />
                ))}
              </div>

              <div className="flex-1" />

              {/* Bottom Nav */}
              <div className="border-t border-[#1a1a1a] pt-3 space-y-1">
                {bottomItems.map((item) => (
                  <MobileNavLink key={item.href} item={item} isActive={isActive(item.href)} onClick={() => setMobileOpen(false)} />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
