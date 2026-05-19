import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trophy, Loader2, Target, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  getRaceEvents, createRaceEvent, deleteRaceEvent,
  getRaceResults, createRaceResult, getRacePredictor,
  getGoals, createGoal, updateGoal, deleteGoal
} from '@/lib/trainingApi';
import { formatDate, formatTime, formatDistance, daysUntil } from '@/lib/trainingUtils';

const TOOLTIP_STYLE = { backgroundColor: 'hsl(222,47%,9%)', border: '1px solid hsl(222,47%,14%)', borderRadius: 8 };
const btnBase = 'bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white';
const btnOutline = 'border-[hsl(222,47%,14%)] bg-transparent hover:bg-[hsl(222,47%,11%)] text-white';
const inputCls = 'bg-[hsl(222,47%,11%)] border-[hsl(222,47%,14%)] text-white';

function PriorityBadge({ priority }) {
  const map = { high: 'bg-red-500/20 text-red-400 border-red-500/30', medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', low: 'bg-green-500/20 text-green-400 border-green-500/30' };
  return <span className={`text-xs px-1.5 py-0.5 rounded border capitalize ${map[priority] ?? ''}`}>{priority}</span>;
}

export default function TrainingAnalytics() {
  const qc = useQueryClient();
  const [raceOpen, setRaceOpen] = useState(false);
  const [goalOpen, setGoalOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [raceForm, setRaceForm] = useState({});
  const [goalForm, setGoalForm] = useState({ priority: 'medium', status: 'active', type: 'fitness' });
  const [resultForm, setResultForm] = useState({});
  const [predictorDist, setPredictorDist] = useState(42195);

  const { data: races = [] } = useQuery({ queryKey: ['t-race-events'], queryFn: getRaceEvents });
  const { data: results = [] } = useQuery({ queryKey: ['t-race-results'], queryFn: getRaceResults });
  const { data: goals = [] } = useQuery({ queryKey: ['t-goals'], queryFn: getGoals });
  const { data: predictor } = useQuery({ queryKey: ['t-predictor', predictorDist], queryFn: () => getRacePredictor(predictorDist) });

  const createRaceMutation = useMutation({ mutationFn: createRaceEvent, onSuccess: () => { qc.invalidateQueries({ queryKey: ['t-race-events'] }); setRaceOpen(false); setRaceForm({}); } });
  const deleteRaceMutation = useMutation({ mutationFn: deleteRaceEvent, onSuccess: () => qc.invalidateQueries({ queryKey: ['t-race-events'] }) });
  const createResultMutation = useMutation({ mutationFn: createRaceResult, onSuccess: () => { qc.invalidateQueries({ queryKey: ['t-race-results'] }); setResultOpen(false); setResultForm({}); } });
  const createGoalMutation = useMutation({ mutationFn: createGoal, onSuccess: () => { qc.invalidateQueries({ queryKey: ['t-goals'] }); setGoalOpen(false); setGoalForm({ priority: 'medium', status: 'active', type: 'fitness' }); } });
  const updateGoalMutation = useMutation({ mutationFn: ({ id, data }) => updateGoal(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['t-goals'] }) });
  const deleteGoalMutation = useMutation({ mutationFn: deleteGoal, onSuccess: () => qc.invalidateQueries({ queryKey: ['t-goals'] }) });

  const resultChartData = results.map(r => ({ name: r.raceName ?? 'Race', time: r.finishTime ? Math.round(r.finishTime / 60) : null })).filter(r => r.time);
  const upcomingRaces = races.filter(r => new Date(r.date) >= new Date()).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Analytics</h1>

      <Tabs defaultValue="goals">
        <TabsList className="grid grid-cols-3 w-full max-w-md bg-[hsl(222,47%,11%)]">
          {['goals', 'races', 'predictor'].map(v => (
            <TabsTrigger key={v} value={v} className="data-[state=active]:bg-[hsl(222,47%,4%)] data-[state=active]:text-white text-[hsl(215,20%,55%)] capitalize">{v}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="goals" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button className={btnBase} onClick={() => setGoalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Goal
            </Button>
          </div>
          {goals.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[hsl(217,91%,60%)]/30 py-10 text-center">
              <Target className="h-10 w-10 text-[hsl(215,20%,55%)] mx-auto mb-3" />
              <p className="text-[hsl(215,20%,55%)] mb-4">No goals set.</p>
              <Button className={btnBase} onClick={() => setGoalOpen(true)}>Add Your First Goal</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goals.map(goal => {
                const pct = goal.targetValue && goal.currentValue ? Math.min(100, (goal.currentValue / goal.targetValue) * 100) : 0;
                return (
                  <Card key={goal.id} className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-white">{goal.title}</p>
                          <span className="text-xs border border-[hsl(222,47%,14%)] text-[hsl(215,20%,55%)] px-2 py-0.5 rounded-full mt-1 inline-block">{goal.type}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                          <PriorityBadge priority={goal.priority} />
                          <button onClick={() => deleteGoalMutation.mutate(goal.id)} className="text-[hsl(215,20%,55%)] hover:text-red-400 ml-1">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2 mt-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-[hsl(215,20%,55%)]">Progress</span>
                          <span className="text-white">{goal.currentValue ?? 0} / {goal.targetValue} {goal.unit}</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-[hsl(222,47%,11%)]">
                          <div className="h-full rounded-full bg-[hsl(217,91%,60%)]" style={{ width: `${pct}%` }} />
                        </div>
                        {goal.targetDate && (
                          <p className="text-xs text-[hsl(215,20%,55%)]">Target: {formatDate(goal.targetDate)} ({daysUntil(goal.targetDate)} days)</p>
                        )}
                      </div>
                      <div className="mt-3">
                        <Input type="number" placeholder="Update current value" className={`h-7 text-xs ${inputCls}`}
                          onBlur={e => { if (e.target.value) updateGoalMutation.mutate({ id: goal.id, data: { currentValue: parseFloat(e.target.value) } }); }} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="races" className="space-y-4 mt-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" className={btnOutline} onClick={() => setResultOpen(true)} disabled={!races.length}>
              <Plus className="h-4 w-4 mr-2" /> Log Result
            </Button>
            <Button className={btnBase} onClick={() => setRaceOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Race
            </Button>
          </div>
          {upcomingRaces.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {upcomingRaces.map(race => (
                <Card key={race.id} className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{race.name}</p>
                      <p className="text-xs text-[hsl(215,20%,55%)]">{formatDate(race.date)} · {formatDistance(race.distance ?? 0)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gradient">{daysUntil(race.date)}</p>
                      <p className="text-xs text-[hsl(215,20%,55%)]">days</p>
                      <button onClick={() => deleteRaceMutation.mutate(race.id)} className="text-[hsl(215,20%,55%)] hover:text-red-400 mt-1">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {resultChartData.length > 0 && (
            <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
              <CardHeader><CardTitle className="text-base text-white flex items-center gap-2"><Trophy className="h-4 w-4 text-yellow-400" /> Race Results</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={resultChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} unit="min" />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Bar dataKey="time" fill="hsl(217,91%,60%)" radius={[4, 4, 0, 0]} name="Finish (min)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="predictor" className="mt-4">
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardHeader><CardTitle className="text-base text-white">Race Time Predictor</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[hsl(215,20%,55%)]">Target Distance</Label>
                <Select value={String(predictorDist)} onValueChange={v => setPredictorDist(parseInt(v))}>
                  <SelectTrigger className={`mt-1.5 ${inputCls}`}><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[hsl(222,47%,9%)] border-[hsl(222,47%,14%)] text-white">
                    {[['5000', '5K'], ['10000', '10K'], ['21097', 'Half Marathon'], ['42195', 'Marathon']].map(([v, l]) => (
                      <SelectItem key={v} value={v} className="text-white focus:bg-[hsl(222,47%,11%)] focus:text-white">{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {predictor?.predicted ? (
                <div className="text-center py-6 rounded-xl bg-[hsl(217,91%,60%)]/10 border border-[hsl(217,91%,60%)]/20">
                  <p className="text-[hsl(215,20%,55%)] text-sm mb-2">Predicted finish time</p>
                  <p className="text-5xl font-bold text-gradient">{formatTime(predictor.predicted)}</p>
                  <p className="text-xs text-[hsl(215,20%,55%)] mt-2">Based on {predictor.source?.length} recent races</p>
                </div>
              ) : (
                <p className="text-[hsl(215,20%,55%)] text-sm text-center py-6">Add race results to enable predictions.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Race Dialog */}
      <Dialog open={raceOpen} onOpenChange={setRaceOpen}>
        <DialogContent className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)] text-white">
          <DialogHeader><DialogTitle className="text-white">Add Race Event</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><Label className="text-[hsl(215,20%,55%)]">Race Name</Label>
              <Input value={raceForm.name ?? ''} onChange={e => setRaceForm({ ...raceForm, name: e.target.value })} className={`mt-1.5 ${inputCls}`} placeholder="Boston Marathon" /></div>
            <div><Label className="text-[hsl(215,20%,55%)]">Date</Label>
              <Input type="date" value={raceForm.date ?? ''} onChange={e => setRaceForm({ ...raceForm, date: e.target.value })} className={`mt-1.5 ${inputCls}`} /></div>
            <div><Label className="text-[hsl(215,20%,55%)]">Distance (m)</Label>
              <Input type="number" value={raceForm.distance ?? ''} onChange={e => setRaceForm({ ...raceForm, distance: e.target.value })} className={`mt-1.5 ${inputCls}`} placeholder="42195" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" className={btnOutline} onClick={() => setRaceOpen(false)}>Cancel</Button>
            <Button className={btnBase} onClick={() => createRaceMutation.mutate(raceForm)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Goal Dialog */}
      <Dialog open={goalOpen} onOpenChange={setGoalOpen}>
        <DialogContent className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)] text-white">
          <DialogHeader><DialogTitle className="text-white">Add Goal</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><Label className="text-[hsl(215,20%,55%)]">Title</Label>
              <Input value={goalForm.title ?? ''} onChange={e => setGoalForm({ ...goalForm, title: e.target.value })} className={`mt-1.5 ${inputCls}`} /></div>
            <div><Label className="text-[hsl(215,20%,55%)]">Target Value</Label>
              <Input type="number" value={goalForm.targetValue ?? ''} onChange={e => setGoalForm({ ...goalForm, targetValue: e.target.value })} className={`mt-1.5 ${inputCls}`} /></div>
            <div><Label className="text-[hsl(215,20%,55%)]">Unit</Label>
              <Input value={goalForm.unit ?? ''} onChange={e => setGoalForm({ ...goalForm, unit: e.target.value })} className={`mt-1.5 ${inputCls}`} placeholder="km, kg, min..." /></div>
            <div><Label className="text-[hsl(215,20%,55%)]">Target Date</Label>
              <Input type="date" value={goalForm.targetDate ?? ''} onChange={e => setGoalForm({ ...goalForm, targetDate: e.target.value })} className={`mt-1.5 ${inputCls}`} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" className={btnOutline} onClick={() => setGoalOpen(false)}>Cancel</Button>
            <Button className={btnBase} onClick={() => createGoalMutation.mutate(goalForm)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
