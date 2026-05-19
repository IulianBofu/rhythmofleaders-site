import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Activity, Target, Zap, Heart, TrendingUp, Calendar, ChevronRight, Trophy, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getDashboard } from '@/lib/trainingApi';
import { formatDistance, formatDuration, formatDate, daysUntil, readinessLabel, getIntensityBg, getActivityIcon } from '@/lib/trainingUtils';
import { Link } from 'react-router-dom';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

export default function TrainingDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['t-dashboard'],
    queryFn: getDashboard,
    refetchInterval: 60_000,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-[hsl(222,47%,7%)] border border-[hsl(222,47%,14%)] animate-pulse" />
        ))}
      </div>
    );
  }

  const readiness = data?.readiness ?? 70;
  const rl = readinessLabel(readiness);
  const load = data?.load ?? { ctl: 0, atl: 0, tsb: 0 };

  return (
    <div className="space-y-6">
      <motion.div {...fadeUp}>
        <h1 className="text-2xl font-bold text-white">
          Good {getGreeting()}, {data?.athlete?.name?.split(' ')[0] ?? 'Athlete'}
        </h1>
        <p className="text-[hsl(215,20%,55%)] text-sm mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Readiness */}
        <motion.div {...fadeUp} transition={{ delay: 0.05 }}>
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[hsl(215,20%,55%)] font-medium">Readiness Score</span>
                <Zap className="h-4 w-4 text-yellow-400" />
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-5xl font-bold text-gradient">{readiness}</span>
                <span className="text-[hsl(215,20%,55%)] mb-1">/100</span>
              </div>
              <span className={`text-xs font-semibold ${rl.color}`}>{rl.label}</span>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[['CTL', load.ctl], ['ATL', load.atl], ['TSB', load.tsb]].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-xs text-[hsl(215,20%,55%)]">{k}</p>
                    <p className={`text-sm font-semibold ${k === 'TSB' ? (v >= 0 ? 'text-green-400' : 'text-red-400') : 'text-white'}`}>{v}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Workout */}
        <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[hsl(215,20%,55%)] font-medium">Today's Workout</span>
                <Calendar className="h-4 w-4 text-blue-400" />
              </div>
              {data?.todaySession ? (
                <>
                  <p className="font-semibold text-base text-white mb-1">{data.todaySession.title}</p>
                  <div className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border mb-2 ${getIntensityBg(data.todaySession.intensity)}`}>
                    {data.todaySession.intensity}
                  </div>
                  <p className="text-xs text-[hsl(215,20%,55%)] line-clamp-2">{data.todaySession.description}</p>
                  <div className="flex gap-3 mt-3 text-xs text-[hsl(215,20%,55%)]">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{data.todaySession.duration}min</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-[hsl(215,20%,55%)]">Rest day — recovery focus</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Volume */}
        <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[hsl(215,20%,55%)] font-medium">This Week</span>
                <TrendingUp className="h-4 w-4 text-blue-400" />
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Distance', value: formatDistance(data?.weeklyVolume?.distance ?? 0), max: 70000, raw: data?.weeklyVolume?.distance ?? 0 },
                  { label: 'Duration', value: formatDuration(data?.weeklyVolume?.duration ?? 0), max: 18000, raw: data?.weeklyVolume?.duration ?? 0 },
                ].map(({ label, value, max, raw }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[hsl(215,20%,55%)]">{label}</span>
                      <span className="font-medium text-white">{value}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[hsl(222,47%,11%)]">
                      <div className="h-full rounded-full bg-[hsl(217,91%,60%)]" style={{ width: `${Math.min(100, (raw / max) * 100)}%` }} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[hsl(215,20%,55%)]">Sessions</span>
                  <span className="bg-[hsl(222,47%,11%)] text-white px-2 py-0.5 rounded-full text-xs">{data?.weeklyVolume?.count ?? 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Race */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[hsl(215,20%,55%)] font-medium">Next Race</span>
                <Trophy className="h-4 w-4 text-yellow-400" />
              </div>
              {data?.nextRace ? (
                <>
                  <p className="font-semibold text-base text-white mb-1">{data.nextRace.name}</p>
                  <p className="text-xs text-[hsl(215,20%,55%)] mb-3">{formatDate(data.nextRace.date)}</p>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-gradient">{daysUntil(data.nextRace.date)}</span>
                    <p className="text-xs text-[hsl(215,20%,55%)] mt-1">days to go</p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-[hsl(215,20%,55%)]">No upcoming races. Add one in Settings.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Goals & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div {...fadeUp} transition={{ delay: 0.25 }} className="lg:col-span-2">
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-white flex items-center gap-2">
                  <Target className="h-4 w-4 text-[hsl(217,91%,60%)]" />
                  Active Goals
                </CardTitle>
                <Link to="/training/analytics" className="text-xs text-[hsl(217,91%,60%)] hover:underline flex items-center gap-0.5">
                  View all <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {!data?.activeGoals?.length ? (
                <p className="text-sm text-[hsl(215,20%,55%)] py-4 text-center">No active goals yet.</p>
              ) : (
                <div className="space-y-3">
                  {data.activeGoals.slice(0, 4).map((goal) => {
                    const pct = goal.targetValue && goal.currentValue
                      ? Math.min(100, (goal.currentValue / goal.targetValue) * 100) : 0;
                    return (
                      <div key={goal.id}>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="font-medium text-white">{goal.title}</span>
                          <span className="text-[hsl(215,20%,55%)] text-xs">{goal.currentValue ?? 0} / {goal.targetValue} {goal.unit}</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-[hsl(222,47%,11%)]">
                          <div className="h-full rounded-full bg-[hsl(217,91%,60%)]" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
          <Card className="h-full bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-[hsl(217,91%,60%)]" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {!data?.recentInsights?.length ? (
                <p className="text-sm text-[hsl(215,20%,55%)]">No insights yet. Ask the AI Coach for a debrief.</p>
              ) : (
                data.recentInsights.map((insight) => (
                  <div key={insight.id} className="rounded-lg bg-[hsl(217,91%,60%)]/10 border border-[hsl(217,91%,60%)]/20 p-3">
                    <p className="text-xs text-[hsl(215,20%,55%)] mb-1">{formatDate(insight.createdAt ?? '')}</p>
                    <p className="text-xs text-white line-clamp-4">{insight.content.slice(0, 200)}...</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div {...fadeUp} transition={{ delay: 0.35 }}>
        <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Activity className="h-4 w-4 text-[hsl(217,91%,60%)]" />
                Recent Activities
              </CardTitle>
              <Link to="/training/progress" className="text-xs text-[hsl(217,91%,60%)] hover:underline flex items-center gap-0.5">
                View all <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {!data?.recentActivities?.length ? (
              <p className="text-sm text-[hsl(215,20%,55%)] py-4 text-center">No activities yet. Connect Strava in Settings.</p>
            ) : (
              <div className="space-y-2">
                {data.recentActivities.map((act) => (
                  <div key={act.id} className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(222,47%,11%)]/50 hover:bg-[hsl(222,47%,11%)] transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(217,91%,60%)]/10 text-lg">
                      {getActivityIcon(act.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{act.title ?? act.type}</p>
                      <p className="text-xs text-[hsl(215,20%,55%)]">{formatDate(act.date)}</p>
                    </div>
                    <div className="text-right text-xs text-[hsl(215,20%,55%)] space-y-0.5">
                      <p>{formatDistance(act.distance ?? 0)}</p>
                      <p>{formatDuration(act.duration ?? 0)}</p>
                    </div>
                    {act.avgHR && (
                      <div className="flex items-center gap-1 text-xs text-red-400">
                        <Heart className="h-3 w-3" />
                        {act.avgHR}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
