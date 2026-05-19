import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Save, RefreshCw, Plug, Unplug, Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import {
  getAthleteProfile, updateAthleteProfile,
  getSettings, updateSettings,
  getStravaAuthUrl, getStravaStatus, disconnectStrava, syncStrava,
  syncRunalyze, getSyncLogs,
  getOllamaModels,
  getInjuries, createInjury, resolveInjury,
} from '@/lib/trainingApi';

function InjuryBadge({ status }) {
  const cls = status === 'active'
    ? 'bg-red-500/20 text-red-400 border-red-500/30'
    : 'bg-green-500/20 text-green-400 border-green-500/30';
  return <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${cls}`}>{status}</span>;
}

export default function TrainingSettings() {
  const qc = useQueryClient();
  const [injuryOpen, setInjuryOpen] = useState(false);
  const [injuryForm, setInjuryForm] = useState({ bodyPart: '', description: '', date: new Date().toISOString().split('T')[0] });
  const [profileForm, setProfileForm] = useState(null);
  const [settingsForm, setSettingsForm] = useState(null);
  const [runalyzeKey, setRunalyzeKey] = useState('');

  const { data: profile } = useQuery({
    queryKey: ['t-athlete'],
    queryFn: getAthleteProfile,
    onSuccess: (d) => { if (!profileForm) setProfileForm(d); },
  });
  const { data: settings } = useQuery({
    queryKey: ['t-settings'],
    queryFn: getSettings,
    onSuccess: (d) => { if (!settingsForm) setSettingsForm(d); },
  });
  const { data: stravaStatus } = useQuery({ queryKey: ['t-strava-status'], queryFn: getStravaStatus });
  const { data: syncLogs = [] } = useQuery({ queryKey: ['t-sync-logs'], queryFn: getSyncLogs });
  const { data: ollamaModels = [] } = useQuery({ queryKey: ['t-ollama-models'], queryFn: getOllamaModels });
  const { data: injuries = [] } = useQuery({ queryKey: ['t-injuries'], queryFn: getInjuries });

  const profileMutation = useMutation({
    mutationFn: updateAthleteProfile,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['t-athlete'] }),
  });
  const settingsMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['t-settings'] }),
  });
  const stravaAuthMutation = useMutation({
    mutationFn: getStravaAuthUrl,
    onSuccess: (data) => { if (data.url) window.open(data.url, '_blank'); },
  });
  const disconnectMutation = useMutation({
    mutationFn: disconnectStrava,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['t-strava-status'] }),
  });
  const syncStravaMutation = useMutation({
    mutationFn: syncStrava,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['t-activities'] }); qc.invalidateQueries({ queryKey: ['t-sync-logs'] }); },
  });
  const syncRunalyzeMutation = useMutation({
    mutationFn: () => syncRunalyze(runalyzeKey),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['t-activities'] }); qc.invalidateQueries({ queryKey: ['t-sync-logs'] }); },
  });
  const injuryMutation = useMutation({
    mutationFn: createInjury,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['t-injuries'] }); setInjuryOpen(false); setInjuryForm({ bodyPart: '', description: '', date: new Date().toISOString().split('T')[0] }); },
  });
  const resolveMutation = useMutation({
    mutationFn: resolveInjury,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['t-injuries'] }),
  });

  const pf = profileForm ?? profile ?? {};
  const sf = settingsForm ?? settings ?? {};

  const btnBase = 'bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white';
  const btnOutline = 'border-[hsl(222,47%,14%)] bg-transparent hover:bg-[hsl(222,47%,11%)] text-white';
  const inputCls = 'bg-[hsl(222,47%,11%)] border-[hsl(222,47%,14%)] text-white';
  const labelCls = 'text-xs text-[hsl(215,20%,55%)]';

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      <Tabs defaultValue="profile">
        <TabsList className="grid grid-cols-4 w-full max-w-lg bg-[hsl(222,47%,11%)]">
          {['profile', 'integrations', 'ai', 'injuries'].map(v => (
            <TabsTrigger key={v} value={v}
              className="data-[state=active]:bg-[hsl(222,47%,4%)] data-[state=active]:text-white text-[hsl(215,20%,55%)] capitalize">
              {v}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="mt-4">
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardHeader><CardTitle className="text-base text-white">Athlete Profile</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Name', type: 'text' },
                  { key: 'age', label: 'Age', type: 'number' },
                  { key: 'weight', label: 'Weight (kg)', type: 'number', step: '0.1' },
                  { key: 'height', label: 'Height (cm)', type: 'number' },
                  { key: 'maxHR', label: 'Max Heart Rate', type: 'number' },
                  { key: 'restingHR', label: 'Resting HR', type: 'number' },
                ].map(({ key, label, ...rest }) => (
                  <div key={key}>
                    <Label className={labelCls}>{label}</Label>
                    <Input {...rest} value={pf[key] ?? ''} onChange={e => setProfileForm({ ...pf, [key]: e.target.value })}
                      className={`mt-1 ${inputCls}`} />
                  </div>
                ))}
                <div className="col-span-2">
                  <Label className={labelCls}>Training Level</Label>
                  <Select value={pf.trainingLevel ?? ''} onValueChange={v => setProfileForm({ ...pf, trainingLevel: v })}>
                    <SelectTrigger className={`mt-1 ${inputCls}`}>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(222,47%,11%)] border-[hsl(222,47%,14%)]">
                      {['beginner', 'intermediate', 'advanced', 'elite'].map(l => (
                        <SelectItem key={l} value={l} className="text-white capitalize">{l}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label className={labelCls}>Primary Goal</Label>
                  <Input value={pf.primaryGoal ?? ''} onChange={e => setProfileForm({ ...pf, primaryGoal: e.target.value })}
                    className={`mt-1 ${inputCls}`} placeholder="e.g. Sub-3h marathon" />
                </div>
                <div className="col-span-2">
                  <Label className={labelCls}>Weekly Training Hours Target</Label>
                  <Input type="number" step="0.5" value={pf.weeklyHoursTarget ?? ''} onChange={e => setProfileForm({ ...pf, weeklyHoursTarget: e.target.value })}
                    className={`mt-1 ${inputCls}`} />
                </div>
              </div>
              <Button className={btnBase} onClick={() => profileMutation.mutate(pf)} disabled={profileMutation.isPending}>
                {profileMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                <Save className="h-4 w-4 mr-2" /> Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-4 mt-4">
          {/* Strava */}
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-white">Strava</CardTitle>
                {stravaStatus?.connected ? (
                  <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">Connected</span>
                ) : (
                  <span className="text-xs bg-[hsl(222,47%,11%)] text-[hsl(215,20%,55%)] border border-[hsl(222,47%,14%)] px-2 py-0.5 rounded-full">Not connected</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {stravaStatus?.connected ? (
                <div className="flex gap-2">
                  <Button className={btnBase} onClick={() => syncStravaMutation.mutate()} disabled={syncStravaMutation.isPending}>
                    {syncStravaMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                    Sync Activities
                  </Button>
                  <Button variant="outline" className={btnOutline} onClick={() => disconnectMutation.mutate()}>
                    <Unplug className="h-4 w-4 mr-2" /> Disconnect
                  </Button>
                </div>
              ) : (
                <Button className={btnBase} onClick={() => stravaAuthMutation.mutate()} disabled={stravaAuthMutation.isPending}>
                  <Plug className="h-4 w-4 mr-2" /> Connect Strava
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Runalyze */}
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardHeader><CardTitle className="text-base text-white">Runalyze</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className={labelCls}>Personal API Token</Label>
                <Input
                  type="password"
                  value={runalyzeKey}
                  onChange={e => setRunalyzeKey(e.target.value)}
                  placeholder="Enter your Runalyze personal token"
                  className={`mt-1 ${inputCls}`}
                />
                <p className="text-xs text-[hsl(215,20%,45%)] mt-1">Find this in Runalyze → Account → API</p>
              </div>
              <Button className={btnBase} onClick={() => syncRunalyzeMutation.mutate()} disabled={syncRunalyzeMutation.isPending || !runalyzeKey}>
                {syncRunalyzeMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                Sync from Runalyze
              </Button>
            </CardContent>
          </Card>

          {/* Sync Logs */}
          {syncLogs.length > 0 && (
            <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
              <CardHeader><CardTitle className="text-sm text-white">Sync History</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {syncLogs.slice(0, 20).map(log => (
                    <div key={log.id} className="flex items-center justify-between text-xs py-1.5 border-b border-[hsl(222,47%,11%)]">
                      <span className="text-[hsl(215,20%,55%)] capitalize">{log.source}</span>
                      <span className={log.status === 'success' ? 'text-green-400' : 'text-red-400'}>{log.status}</span>
                      <span className="text-[hsl(215,20%,45%)]">{log.activitiesSynced ?? 0} activities</span>
                      <span className="text-[hsl(215,20%,40%)]">{log.syncedAt?.slice(0, 10)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* AI */}
        <TabsContent value="ai" className="mt-4">
          <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
            <CardHeader><CardTitle className="text-base text-white">AI Model Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className={labelCls}>Provider</Label>
                <Select value={sf.provider ?? 'ollama'} onValueChange={v => setSettingsForm({ ...sf, provider: v })}>
                  <SelectTrigger className={`mt-1 ${inputCls}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(222,47%,11%)] border-[hsl(222,47%,14%)]">
                    {['ollama', 'openai', 'anthropic'].map(p => (
                      <SelectItem key={p} value={p} className="text-white capitalize">{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className={labelCls}>Model</Label>
                {sf.provider === 'ollama' && ollamaModels.length > 0 ? (
                  <Select value={sf.model ?? ''} onValueChange={v => setSettingsForm({ ...sf, model: v })}>
                    <SelectTrigger className={`mt-1 ${inputCls}`}>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(222,47%,11%)] border-[hsl(222,47%,14%)]">
                      {ollamaModels.map(m => (
                        <SelectItem key={m} value={m} className="text-white">{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input value={sf.model ?? ''} onChange={e => setSettingsForm({ ...sf, model: e.target.value })}
                    placeholder="e.g. llama3.2, gpt-4o, claude-3-5-sonnet" className={`mt-1 ${inputCls}`} />
                )}
              </div>
              {sf.provider === 'ollama' && (
                <div>
                  <Label className={labelCls}>Ollama URL</Label>
                  <Input value={sf.ollamaUrl ?? 'http://localhost:11434'} onChange={e => setSettingsForm({ ...sf, ollamaUrl: e.target.value })}
                    className={`mt-1 ${inputCls}`} />
                </div>
              )}
              {(sf.provider === 'openai' || sf.provider === 'anthropic') && (
                <div>
                  <Label className={labelCls}>API Key</Label>
                  <Input type="password" value={sf.apiKey ?? ''} onChange={e => setSettingsForm({ ...sf, apiKey: e.target.value })}
                    className={`mt-1 ${inputCls}`} placeholder="sk-..." />
                </div>
              )}
              <Button className={btnBase} onClick={() => settingsMutation.mutate(sf)} disabled={settingsMutation.isPending}>
                {settingsMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                <Save className="h-4 w-4 mr-2" /> Save AI Config
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Injuries */}
        <TabsContent value="injuries" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button className={btnBase} onClick={() => setInjuryOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Log Injury
            </Button>
          </div>

          {injuries.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[hsl(222,47%,14%)] py-10 text-center">
              <p className="text-[hsl(215,20%,55%)]">No injuries logged.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {injuries.map(inj => (
                <Card key={inj.id} className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-white capitalize">{inj.bodyPart}</p>
                          <InjuryBadge status={inj.status} />
                        </div>
                        {inj.description && <p className="text-sm text-[hsl(215,20%,55%)]">{inj.description}</p>}
                        <p className="text-xs text-[hsl(215,20%,45%)] mt-1">
                          {inj.date}
                          {inj.resolvedDate && ` → ${inj.resolvedDate}`}
                        </p>
                      </div>
                      {inj.status === 'active' && (
                        <Button size="sm" variant="outline" className={btnOutline}
                          onClick={() => resolveMutation.mutate(inj.id)}
                          disabled={resolveMutation.isPending}>
                          Resolve
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={injuryOpen} onOpenChange={setInjuryOpen}>
        <DialogContent className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)] text-white">
          <DialogHeader><DialogTitle className="text-white">Log Injury</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className={labelCls}>Body Part</Label>
              <Input value={injuryForm.bodyPart} onChange={e => setInjuryForm({ ...injuryForm, bodyPart: e.target.value })}
                className={`mt-1 ${inputCls}`} placeholder="e.g. Left knee, Achilles..." />
            </div>
            <div>
              <Label className={labelCls}>Date</Label>
              <Input type="date" value={injuryForm.date} onChange={e => setInjuryForm({ ...injuryForm, date: e.target.value })}
                className={`mt-1 ${inputCls}`} />
            </div>
            <div>
              <Label className={labelCls}>Description</Label>
              <Input value={injuryForm.description} onChange={e => setInjuryForm({ ...injuryForm, description: e.target.value })}
                className={`mt-1 ${inputCls}`} placeholder="Describe the injury..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className={btnOutline} onClick={() => setInjuryOpen(false)}>Cancel</Button>
            <Button className={btnBase} onClick={() => injuryMutation.mutate(injuryForm)} disabled={injuryMutation.isPending || !injuryForm.bodyPart}>
              {injuryMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
