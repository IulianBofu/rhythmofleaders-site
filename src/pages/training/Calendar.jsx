import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getTrainingPlans, completeSession } from '@/lib/trainingApi';
import { getIntensityBg, formatDate, getWeekStart } from '@/lib/trainingUtils';
import { Link } from 'react-router-dom';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getWeekDates(weekOffset) {
  const now = new Date();
  const day = now.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset + weekOffset * 7);
  return DAYS.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export default function TrainingCalendar() {
  const [weekOffset, setWeekOffset] = useState(0);
  const qc = useQueryClient();
  const weekDates = getWeekDates(weekOffset);
  const weekStart = weekDates[0].toISOString().split('T')[0];

  const { data: plans = [] } = useQuery({ queryKey: ['t-training-plans'], queryFn: getTrainingPlans });

  const completeMutation = useMutation({
    mutationFn: ({ planId, sessionIndex }) => completeSession(planId, sessionIndex),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['t-training-plans'] }),
  });

  const activePlan = plans.find(p => p.weekStart === weekStart) ?? plans.find(p => p.status === 'active');

  const getSessionForDay = (dayIndex) => {
    if (!activePlan) return null;
    const dayName = DAYS[dayIndex].toLowerCase();
    const session = activePlan.sessions?.find(s => s.day?.toLowerCase() === dayName);
    if (!session) return null;
    const sessionIndex = activePlan.sessions.indexOf(session);
    const log = activePlan.sessionLogs?.find(l => l.sessionIndex === sessionIndex);
    return { session, sessionIndex, log };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Training Calendar</h1>
          <p className="text-[hsl(215,20%,55%)] text-sm mt-1">
            Week of {formatDate(weekStart, { month: 'long', day: 'numeric' })}
            {weekOffset === 0 && ' (Current)'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setWeekOffset(o => o - 1)}
            className="border-[hsl(222,47%,14%)] bg-transparent hover:bg-[hsl(222,47%,11%)] text-white">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setWeekOffset(0)}
            className="border-[hsl(222,47%,14%)] bg-transparent hover:bg-[hsl(222,47%,11%)] text-white">Today</Button>
          <Button variant="outline" size="icon" onClick={() => setWeekOffset(o => o + 1)}
            className="border-[hsl(222,47%,14%)] bg-transparent hover:bg-[hsl(222,47%,11%)] text-white">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!activePlan && (
        <div className="rounded-xl border border-dashed border-[hsl(217,91%,60%)]/30 p-8 text-center">
          <p className="text-[hsl(215,20%,55%)] mb-3">No training plan for this week.</p>
          <Link to="/training/plans">
            <Button className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white">Generate a Plan</Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {DAYS.map((day, i) => {
          const date = weekDates[i];
          const isToday = date.toDateString() === new Date().toDateString();
          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
          const sessionData = getSessionForDay(i);

          return (
            <motion.div key={day} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className={`min-h-[160px] rounded-xl border p-3 ${isToday
                ? 'border-[hsl(217,91%,60%)]/60 bg-[hsl(217,91%,60%)]/5'
                : 'border-[hsl(222,47%,14%)] bg-[hsl(222,47%,7%)]'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className={`text-xs font-semibold ${isToday ? 'text-[hsl(217,91%,60%)]' : 'text-[hsl(215,20%,55%)]'}`}>
                      {day.slice(0, 3).toUpperCase()}
                    </p>
                    <p className={`text-lg font-bold ${isToday ? 'text-[hsl(217,91%,60%)]' : 'text-white'}`}>{date.getDate()}</p>
                  </div>
                  {isToday && (
                    <span className="text-xs bg-[hsl(217,91%,60%)]/20 text-[hsl(217,91%,60%)] border border-[hsl(217,91%,60%)]/30 px-2 py-0.5 rounded-full">Today</span>
                  )}
                </div>

                {sessionData ? (
                  <div className="space-y-2">
                    <div className={`rounded-md p-2 text-xs border ${getIntensityBg(sessionData.session.intensity)}`}>
                      <p className="font-semibold truncate">{sessionData.session.title}</p>
                      <p className="text-[hsl(215,20%,55%)] mt-0.5">{sessionData.session.duration}min</p>
                    </div>
                    {sessionData.log?.status === 'completed' ? (
                      <div className="flex items-center gap-1 text-xs text-green-400">
                        <Check className="h-3 w-3" /> Completed
                      </div>
                    ) : (
                      <button
                        className="w-full text-xs border border-[hsl(222,47%,14%)] rounded-md py-1.5 text-[hsl(215,20%,55%)] hover:text-white hover:border-[hsl(217,91%,60%)]/50 transition-colors disabled:opacity-40 flex items-center justify-center gap-1"
                        disabled={!isPast && !isToday}
                        onClick={() => activePlan && completeMutation.mutate({ planId: activePlan.id, sessionIndex: sessionData.sessionIndex })}
                      >
                        <Check className="h-3 w-3" /> Mark Done
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-xs text-[hsl(215,20%,45%)]">Rest</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {activePlan && (
        <div className="rounded-xl border border-[hsl(222,47%,14%)] bg-[hsl(222,47%,7%)] p-5">
          <h3 className="text-base font-semibold text-white mb-4">Week Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-4">
            {[
              ['Sessions', activePlan.sessions?.length ?? 0, 'text-white'],
              ['Total Min', activePlan.sessions?.reduce((s, ss) => s + (ss.duration ?? 0), 0) ?? 0, 'text-white'],
              ['Phase', activePlan.phase ?? '—', 'text-white capitalize'],
              ['Done', activePlan.sessionLogs?.filter(l => l.status === 'completed').length ?? 0, 'text-green-400'],
            ].map(([label, value, cls]) => (
              <div key={label}>
                <p className={`text-2xl font-bold ${cls}`}>{value}</p>
                <p className="text-xs text-[hsl(215,20%,55%)]">{label}</p>
              </div>
            ))}
          </div>
          {activePlan.rationale && (
            <p className="text-sm text-[hsl(215,20%,55%)] italic border-l-2 border-[hsl(217,91%,60%)]/50 pl-3">
              {activePlan.rationale}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
