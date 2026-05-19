import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Loader2, Activity, TrendingUp, Moon, Scale, Heart } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getActivityStats, getHealthData, upsertHealthData, getReadiness } from '@/lib/trainingApi';
import { formatDistance, formatDuration } from '@/lib/trainingUtils';

const TOOLTIP_STYLE = { backgroundColor: 'hsl(222,47%,9%)', border: '1px solid hsl(222,47%,14%)', borderRadius: 8 };

export default function TrainingProgress() {
  const qc = useQueryClient();
  const [healthOpen, setHealthOpen] = useState(false);
  const [healthForm, setHealthForm] = useState({ date: new Date().toISOString().split('T')[0] });

  const { data: stats } = useQuery({ queryKey: ['t-activity-stats'], queryFn: getActivityStats });
  const { data: healthData = [] } = useQuery({ queryKey: ['t-health-data'], queryFn: () => getHealthData(30) });
  const { data: readiness } = useQuery({ queryKey: ['t-readiness'], queryFn: getReadiness });

  const healthMutation = useMutation({
    mutationFn: upsertHealthData,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['t-health-data'] }); setHealthOpen(false); setHealthForm({ date: new Date().toISOString().split('T')[0] }); },
  });

  const weeklyVolume = (stats?.weeklyVolume ?? []).slice(0, 12).reverse().map(w => ({
    week: w.week?.split('-W')[1] ? `W${w.week.split('-W')[1]}` : w.week,
    distance: Math.round((w.total_distance ?? 0) / 1000 * 10) / 10,
    duration: Math.round((w.total_duration ?? 0) / 60),
  }));

  const healthChart = [...healthData].reverse().map(h => ({
    date: h.date?.slice(5),
    hrv: h.hrv,
    rhr: h.resting_hr ?? h.restingHR,
    sleep: h.sleep_hours ?? h.sleepHours,
    weight: h.body_weight ?? h.bodyWeight,
  }));

  const btnBase = 'bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white';
  const btnOutline = 'border-[hsl(222,47%,14%)] bg-transparent hover:bg-[hsl(222,47%,11%)] text-white';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Progress & Training Load</h1>
        <Button className={btnBase} onClick={() => setHealthOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Log Health Data
        </Button>
      </div>

      {readiness && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Readiness', value: `${readiness.score}/100`, icon: TrendingUp, color: 'text-blue-400' },
            { label: 'CTL (Fitness)', value: readiness.ctl, icon: Activity, color: 'text-green-400' },
            { label: 'ATL (Fatigue)', value: readiness.atl, icon: Activity, color: 'text-orange-400' },
            { label: 'TSB (Form)', value: readiness.tsb, icon: TrendingUp, color: readiness.tsb >= 0 ? 'text-green-400' : 'text-red-400' },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className={`h-5 w-5 ${color}`} />
                <div>
                  <p className="text-xs text-[hsl(215,20%,55%)]">{label}</p>
                  <p className="text-xl font-bold text-white">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Tabs defaultValue="volume">
        <TabsList className="grid grid-cols-4 w-full max-w-xl bg-[hsl(222,47%,11%)]">
          {['volume', 'health', 'hrv', 'weight'].map(v => (
            <TabsTrigger key={v} value={v} className="data-[state=active]:bg-[hsl(222,47%,4%)] data-[state=active]:text-white text-[hsl(215,20%,55%)] capitalize">{v}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="volume" className="space-y-4 mt-4">
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardHeader><CardTitle className="text-base text-white">Weekly Distance (km)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={weeklyVolume}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar dataKey="distance" fill="hsl(217,91%,60%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardHeader><CardTitle className="text-base text-white">Weekly Duration (min)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={weeklyVolume}>
                  <defs>
                    <linearGradient id="durGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(217,91%,60%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(217,91%,60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Area type="monotone" dataKey="duration" stroke="hsl(217,91%,60%)" fill="url(#durGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="mt-4">
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardHeader><CardTitle className="text-base text-white">Health Metrics (30 days)</CardTitle></CardHeader>
            <CardContent>
              {healthChart.length === 0 ? (
                <div className="py-10 text-center text-[hsl(215,20%,55%)]">
                  <p>No health data recorded yet.</p>
                  <Button className={`${btnBase} mt-4`} onClick={() => setHealthOpen(true)}>Log Today's Data</Button>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={healthChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="l" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Legend />
                    <Line yAxisId="l" type="monotone" dataKey="hrv" stroke="#4ade80" strokeWidth={2} dot={false} name="HRV (ms)" />
                    <Line yAxisId="l" type="monotone" dataKey="rhr" stroke="#f87171" strokeWidth={2} dot={false} name="Resting HR" />
                    <Line yAxisId="r" type="monotone" dataKey="sleep" stroke="#60a5fa" strokeWidth={2} dot={false} name="Sleep (h)" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hrv" className="mt-4 space-y-4">
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardHeader><CardTitle className="text-base text-white flex items-center gap-2"><Heart className="h-4 w-4 text-red-400" /> HRV Trend</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={healthChart}>
                  <defs>
                    <linearGradient id="hrvGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Area type="monotone" dataKey="hrv" stroke="#4ade80" fill="url(#hrvGrad)" strokeWidth={2} name="HRV (ms)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardHeader><CardTitle className="text-base text-white flex items-center gap-2"><Moon className="h-4 w-4 text-blue-400" /> Sleep Hours</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={healthChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 12]} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar dataKey="sleep" fill="#60a5fa" radius={[4, 4, 0, 0]} name="Sleep (h)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weight" className="mt-4">
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardHeader><CardTitle className="text-base text-white flex items-center gap-2"><Scale className="h-4 w-4 text-purple-400" /> Body Weight (kg)</CardTitle></CardHeader>
            <CardContent>
              {healthChart.filter(d => d.weight).length === 0 ? (
                <div className="py-10 text-center text-[hsl(215,20%,55%)]">Log weight in health data to track.</div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={healthChart.filter(d => d.weight)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Line type="monotone" dataKey="weight" stroke="#c084fc" strokeWidth={2} dot={{ r: 3 }} name="Weight (kg)" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={healthOpen} onOpenChange={setHealthOpen}>
        <DialogContent className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)] text-white">
          <DialogHeader><DialogTitle className="text-white">Log Health Data</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label className="text-[hsl(215,20%,55%)]">Date</Label>
              <Input type="date" value={healthForm.date} onChange={e => setHealthForm({ ...healthForm, date: e.target.value })} className="mt-1.5 bg-[hsl(222,47%,11%)] border-[hsl(222,47%,14%)] text-white" />
            </div>
            {[
              { key: 'hrv', label: 'HRV (ms)', type: 'number' },
              { key: 'restingHR', label: 'Resting HR (bpm)', type: 'number' },
              { key: 'sleepHours', label: 'Sleep (hours)', type: 'number', step: '0.5' },
              { key: 'sleepQuality', label: 'Sleep Quality (1-10)', type: 'number', min: '1', max: '10' },
              { key: 'bodyWeight', label: 'Weight (kg)', type: 'number', step: '0.1' },
              { key: 'steps', label: 'Steps', type: 'number' },
            ].map(({ key, label, ...rest }) => (
              <div key={key}>
                <Label className="text-xs text-[hsl(215,20%,55%)]">{label}</Label>
                <Input {...rest} value={healthForm[key] ?? ''} onChange={e => setHealthForm({ ...healthForm, [key]: e.target.value })} className="mt-1 bg-[hsl(222,47%,11%)] border-[hsl(222,47%,14%)] text-white" />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" className={btnOutline} onClick={() => setHealthOpen(false)}>Cancel</Button>
            <Button className={btnBase} onClick={() => healthMutation.mutate(healthForm)} disabled={healthMutation.isPending}>
              {healthMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
