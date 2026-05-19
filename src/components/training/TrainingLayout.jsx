import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import { TrainingSidebar } from './TrainingSidebar';
import { useQuery } from '@tanstack/react-query';
import { getAthlete } from '@/lib/trainingApi';

export function TrainingLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: athlete } = useQuery({ queryKey: ['t-athlete'], queryFn: getAthlete });

  return (
    <div className="training-platform flex h-screen overflow-hidden">
      <TrainingSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between border-b border-[hsl(222,47%,14%)] px-4 lg:px-6 bg-[hsl(222,47%,4%)]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[hsl(215,20%,55%)] hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[hsl(215,20%,55%)] hover:text-white hover:bg-[hsl(222,47%,11%)] transition-colors">
              <Bell className="h-4 w-4" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(217,91%,60%)]/20 text-[hsl(217,91%,60%)] text-sm font-semibold">
              {athlete?.name?.[0]?.toUpperCase() ?? 'A'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-[hsl(222,47%,4%)]">
          <div className="min-h-full p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
