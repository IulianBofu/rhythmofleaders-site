import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Calendar, ClipboardList, TrendingUp,
  BarChart3, MessageSquare, Settings, Mountain, X, ArrowLeft
} from 'lucide-react';

const navItems = [
  { to: '/training', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/training/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/training/plans', icon: ClipboardList, label: 'Plans' },
  { to: '/training/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/training/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/training/coach', icon: MessageSquare, label: 'AI Coach' },
  { to: '/training/settings', icon: Settings, label: 'Settings' },
];

export function TrainingSidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}

      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-[hsl(222,47%,14%)] bg-[hsl(222,47%,7%)] lg:translate-x-0 lg:static lg:z-auto"
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[hsl(222,47%,14%)]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-blue">
              <Mountain className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">Leader's Peak</p>
              <p className="text-xs text-[hsl(215,20%,55%)] leading-none mt-0.5">Training Platform</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-[hsl(215,20%,55%)] hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Back to site */}
        <div className="px-3 pt-3">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-[hsl(215,20%,55%)] hover:text-white rounded-lg hover:bg-[hsl(222,47%,11%)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Website
          </NavLink>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <p className="px-3 text-[10px] uppercase tracking-widest text-[hsl(215,20%,45%)] mb-2 font-semibold">Training</p>
          <ul className="space-y-0.5">
            {navItems.map(({ to, icon: Icon, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[hsl(217,91%,60%)]/15 text-[hsl(217,91%,60%)]'
                        : 'text-[hsl(215,20%,55%)] hover:bg-[hsl(222,47%,11%)] hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`h-4 w-4 ${isActive ? 'text-[hsl(217,91%,60%)]' : ''}`} />
                      {label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 py-3 border-t border-[hsl(222,47%,14%)]">
          <p className="text-xs text-[hsl(215,20%,45%)] text-center">Leader's Peak v1.0</p>
        </div>
      </motion.aside>
    </>
  );
}
