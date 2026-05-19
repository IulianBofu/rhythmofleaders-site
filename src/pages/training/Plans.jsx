import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Loader2, ShoppingCart, ChefHat, Dumbbell, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  getTrainingPlans, generateTrainingPlan, updatePlanStatus,
  getNutritionPlans, generateNutritionPlan, getShoppingList, getWorkoutTemplates
} from '@/lib/trainingApi';
import { getIntensityBg, formatDate, getWeekStart } from '@/lib/trainingUtils';

function StatusBadge({ status }) {
  const map = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${map[status] ?? 'bg-[hsl(222,47%,11%)]'}`}>{status}</span>;
}

export default function TrainingPlans() {
  const qc = useQueryClient();
  const [genPlanOpen, setGenPlanOpen] = useState(false);
  const [genNutrOpen, setGenNutrOpen] = useState(false);
  const [shopListOpen, setShopListOpen] = useState(false);
  const [shopItems, setShopItems] = useState([]);
  const [weekStart, setWeekStart] = useState(getWeekStart());
  const [nutrDate, setNutrDate] = useState(new Date().toISOString().split('T')[0]);

  const { data: trainingPlans = [], isLoading: loadingPlans } = useQuery({ queryKey: ['t-training-plans'], queryFn: getTrainingPlans });
  const { data: nutritionPlans = [], isLoading: loadingNutr } = useQuery({ queryKey: ['t-nutrition-plans'], queryFn: getNutritionPlans });
  const { data: templates = [] } = useQuery({ queryKey: ['t-templates'], queryFn: getWorkoutTemplates });

  const genPlanMutation = useMutation({
    mutationFn: () => generateTrainingPlan(weekStart),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['t-training-plans'] }); setGenPlanOpen(false); },
  });
  const genNutrMutation = useMutation({
    mutationFn: () => generateNutritionPlan(nutrDate),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['t-nutrition-plans'] }); setGenNutrOpen(false); },
  });
  const approveMutation = useMutation({
    mutationFn: (id) => updatePlanStatus(id, 'active'),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['t-training-plans'] }),
  });
  const shopMutation = useMutation({
    mutationFn: () => getShoppingList(nutritionPlans.map(p => p.id)),
    onSuccess: (data) => { setShopItems(data.items ?? []); setShopListOpen(true); },
  });

  const btnBase = 'bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white';
  const btnOutline = 'border-[hsl(222,47%,14%)] bg-transparent hover:bg-[hsl(222,47%,11%)] text-white';

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Plans & Library</h1>

      <Tabs defaultValue="training">
        <TabsList className="grid grid-cols-3 w-full max-w-md bg-[hsl(222,47%,11%)]">
          <TabsTrigger value="training" className="data-[state=active]:bg-[hsl(222,47%,4%)] data-[state=active]:text-white text-[hsl(215,20%,55%)]">Training Plans</TabsTrigger>
          <TabsTrigger value="nutrition" className="data-[state=active]:bg-[hsl(222,47%,4%)] data-[state=active]:text-white text-[hsl(215,20%,55%)]">Nutrition</TabsTrigger>
          <TabsTrigger value="library" className="data-[state=active]:bg-[hsl(222,47%,4%)] data-[state=active]:text-white text-[hsl(215,20%,55%)]">Library</TabsTrigger>
        </TabsList>

        <TabsContent value="training" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button className={btnBase} onClick={() => setGenPlanOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Generate Plan
            </Button>
          </div>

          {loadingPlans ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-[hsl(217,91%,60%)]" /></div>
          ) : trainingPlans.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[hsl(217,91%,60%)]/30 py-10 text-center">
              <Dumbbell className="h-10 w-10 text-[hsl(215,20%,55%)] mx-auto mb-3" />
              <p className="text-[hsl(215,20%,55%)] mb-4">No training plans yet.</p>
              <Button className={btnBase} onClick={() => setGenPlanOpen(true)}>Generate Your First Plan</Button>
            </div>
          ) : (
            trainingPlans.map(plan => (
              <motion.div key={plan.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base text-white">Week of {formatDate(plan.weekStart, { month: 'short', day: 'numeric' })}</CardTitle>
                        <p className="text-xs text-[hsl(215,20%,55%)] mt-1 capitalize">{plan.phase} phase</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={plan.status} />
                        {plan.status === 'pending' && (
                          <Button size="sm" className={btnBase} onClick={() => approveMutation.mutate(plan.id)}>
                            <Check className="h-3 w-3 mr-1" /> Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {plan.rationale && (
                      <p className="text-sm text-[hsl(215,20%,55%)] italic mb-4 border-l-2 border-[hsl(217,91%,60%)]/40 pl-3">{plan.rationale}</p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                      {plan.sessions?.map((session, idx) => (
                        <div key={idx} className={`rounded-lg p-3 border text-xs ${getIntensityBg(session.intensity)}`}>
                          <p className="font-semibold capitalize mb-0.5">{session.day}</p>
                          <p className="font-medium truncate">{session.title}</p>
                          <p className="text-[hsl(215,20%,55%)] mt-1">{session.duration}min · {session.type}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <Button variant="outline" className={btnOutline} onClick={() => shopMutation.mutate()} disabled={shopMutation.isPending || !nutritionPlans.length}>
              {shopMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <ShoppingCart className="h-4 w-4 mr-2" />}
              Shopping List
            </Button>
            <Button className={btnBase} onClick={() => setGenNutrOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Generate Nutrition Plan
            </Button>
          </div>

          {nutritionPlans.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[hsl(217,91%,60%)]/30 py-10 text-center">
              <ChefHat className="h-10 w-10 text-[hsl(215,20%,55%)] mx-auto mb-3" />
              <p className="text-[hsl(215,20%,55%)] mb-4">No nutrition plans yet.</p>
              <Button className={btnBase} onClick={() => setGenNutrOpen(true)}>Generate a Nutrition Plan</Button>
            </div>
          ) : (
            nutritionPlans.slice(0, 10).map(plan => (
              <Card key={plan.id} className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-white">{formatDate(plan.date)}</CardTitle>
                    <span className="text-sm text-[hsl(215,20%,55%)]">{plan.calories} kcal</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {plan.macros && (
                    <p className="text-xs text-[hsl(215,20%,55%)] mb-3">
                      Protein: {plan.macros.protein}g · Carbs: {plan.macros.carbs}g · Fat: {plan.macros.fat}g
                    </p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {plan.mealSuggestions?.slice(0, 4).map((meal, i) => (
                      <div key={i} className="rounded-lg bg-[hsl(222,47%,11%)]/50 p-3 text-xs">
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-white">{meal.meal}</span>
                          {meal.time && <span className="text-[hsl(215,20%,55%)]">{meal.time}</span>}
                        </div>
                        <p className="text-[hsl(215,20%,55%)]">{meal.description}</p>
                        {meal.calories && <p className="text-[hsl(217,91%,60%)] mt-1">{meal.calories} kcal</p>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="library" className="mt-4">
          {templates.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[hsl(222,47%,14%)] py-10 text-center">
              <p className="text-[hsl(215,20%,55%)]">No workout templates yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map(t => (
                <Card key={t.id} className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)]">
                  <CardContent className="p-4">
                    <p className="font-semibold text-white mb-1">{t.name}</p>
                    <p className="text-xs text-[hsl(215,20%,55%)]">{t.description}</p>
                    {t.duration && <p className="text-xs text-[hsl(215,20%,55%)] mt-2">{t.duration} min · {t.intensity}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={genPlanOpen} onOpenChange={setGenPlanOpen}>
        <DialogContent className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)] text-white">
          <DialogHeader><DialogTitle className="text-white">Generate Training Plan</DialogTitle></DialogHeader>
          <div>
            <Label className="text-[hsl(215,20%,55%)]">Week Starting</Label>
            <Input type="date" value={weekStart} onChange={e => setWeekStart(e.target.value)} className="mt-1.5 bg-[hsl(222,47%,11%)] border-[hsl(222,47%,14%)] text-white" />
          </div>
          <p className="text-sm text-[hsl(215,20%,55%)]">The AI coach will analyze your data and create a personalized plan.</p>
          <DialogFooter>
            <Button variant="outline" className={btnOutline} onClick={() => setGenPlanOpen(false)}>Cancel</Button>
            <Button className={btnBase} onClick={() => genPlanMutation.mutate()} disabled={genPlanMutation.isPending}>
              {genPlanMutation.isPending ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating...</> : 'Generate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={genNutrOpen} onOpenChange={setGenNutrOpen}>
        <DialogContent className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)] text-white">
          <DialogHeader><DialogTitle className="text-white">Generate Nutrition Plan</DialogTitle></DialogHeader>
          <div>
            <Label className="text-[hsl(215,20%,55%)]">Date</Label>
            <Input type="date" value={nutrDate} onChange={e => setNutrDate(e.target.value)} className="mt-1.5 bg-[hsl(222,47%,11%)] border-[hsl(222,47%,14%)] text-white" />
          </div>
          <DialogFooter>
            <Button variant="outline" className={btnOutline} onClick={() => setGenNutrOpen(false)}>Cancel</Button>
            <Button className={btnBase} onClick={() => genNutrMutation.mutate()} disabled={genNutrMutation.isPending}>
              {genNutrMutation.isPending ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating...</> : 'Generate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={shopListOpen} onOpenChange={setShopListOpen}>
        <DialogContent className="bg-[hsl(222,47%,7%)] border-[hsl(222,47%,14%)] text-white max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-white">Shopping List</DialogTitle></DialogHeader>
          <div className="space-y-2">
            {shopItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[hsl(222,47%,11%)]">
                <div className="h-4 w-4 rounded border border-[hsl(222,47%,14%)]" />
                <span className="text-sm text-white">{item}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
