import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, ChevronRight, ChevronLeft, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateAthleteProfile, updateSettings } from '@/lib/trainingApi';

const GOALS = [
  { id: 'marathon', label: 'Marathon' },
  { id: '5k', label: '5K Speed' },
  { id: 'triathlon', label: 'Triathlon' },
  { id: 'ultramarathon', label: 'Ultra' },
  { id: 'fitness', label: 'General Fitness' },
  { id: 'weight_loss', label: 'Weight Loss' },
];

const LEVELS = [
  { id: 'beginner', label: 'Beginner', desc: 'Running < 1 year' },
  { id: 'intermediate', label: 'Intermediate', desc: '1–3 years, some races' },
  { id: 'advanced', label: 'Advanced', desc: '3–5 years, regular races' },
  { id: 'elite', label: 'Elite', desc: '5+ years, competitive' },
];

const STEPS = ['Welcome', 'Basic Info', 'Training Level', 'Goals', 'AI Setup'];

export default function TrainingOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', age: '', weight: '', height: '', maxHR: '',
    trainingLevel: '', primaryGoal: '', weeklyHoursTarget: '8',
    ollamaUrl: 'http://localhost:11434', model: 'llama3.2',
    selectedGoals: [],
  });

  const profileMutation = useMutation({ mutationFn: updateAthleteProfile });
  const settingsMutation = useMutation({ mutationFn: updateSettings });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleGoal = (id) => set('selectedGoals', form.selectedGoals.includes(id)
    ? form.selectedGoals.filter(g => g !== id)
    : [...form.selectedGoals, id]);

  const canNext = () => {
    if (step === 1) return form.name.trim() !== '';
    if (step === 2) return form.trainingLevel !== '';
    if (step === 3) return form.selectedGoals.length > 0;
    return true;
  };

  const finish = async () => {
    await profileMutation.mutateAsync({
      name: form.name,
      age: form.age ? Number(form.age) : undefined,
      weight: form.weight ? Number(form.weight) : undefined,
      height: form.height ? Number(form.height) : undefined,
      maxHR: form.maxHR ? Number(form.maxHR) : undefined,
      trainingLevel: form.trainingLevel,
      primaryGoal: form.selectedGoals[0] ?? '',
      weeklyHoursTarget: Number(form.weeklyHoursTarget),
    });
    await settingsMutation.mutateAsync({
      provider: 'ollama',
      model: form.model,
      ollamaUrl: form.ollamaUrl,
    });
    navigate('/training');
  };

  const btnBase = 'bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white';
  const inputCls = 'bg-[hsl(222,47%,11%)] border-[hsl(222,47%,14%)] text-white';
  const labelCls = 'text-xs text-[hsl(215,20%,55%)]';
  const isPending = profileMutation.isPending || settingsMutation.isPending;

  return (
    <div className="min-h-screen bg-[hsl(222,47%,4%)] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-blue glow-blue">
              <Mountain className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">Leader's Peak</p>
              <p className="text-xs text-[hsl(215,20%,55%)]">Athlete Training Platform</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-8 justify-center">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                i < step ? 'bg-[hsl(217,91%,60%)] text-white' :
                i === step ? 'bg-[hsl(217,91%,60%)]/20 border border-[hsl(217,91%,60%)] text-[hsl(217,91%,60%)]' :
                'bg-[hsl(222,47%,11%)] text-[hsl(215,20%,45%)]'
              }`}>
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && <div className={`h-px w-6 ${i < step ? 'bg-[hsl(217,91%,60%)]' : 'bg-[hsl(222,47%,14%)]'}`} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[hsl(222,47%,14%)] bg-[hsl(222,47%,7%)] p-8">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}>

              {step === 0 && (
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-white">Welcome to Leader's Peak</h2>
                  <p className="text-[hsl(215,20%,55%)] leading-relaxed">
                    Your AI-powered training companion. Let's set up your athlete profile to personalize your training plans, nutrition advice, and performance analytics.
                  </p>
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {['AI Coach', 'Smart Plans', 'Deep Analytics'].map(f => (
                      <div key={f} className="rounded-xl bg-[hsl(222,47%,11%)] p-3 text-center">
                        <p className="text-xs font-medium text-white">{f}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-white mb-1">Basic Information</h2>
                  <p className="text-sm text-[hsl(215,20%,55%)] mb-4">This helps the AI coach personalize your training load.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <Label className={labelCls}>Your Name *</Label>
                      <Input value={form.name} onChange={e => set('name', e.target.value)} className={`mt-1 ${inputCls}`} placeholder="e.g. Alex" />
                    </div>
                    {[
                      { key: 'age', label: 'Age', type: 'number', placeholder: '30' },
                      { key: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '70' },
                      { key: 'height', label: 'Height (cm)', type: 'number', placeholder: '175' },
                      { key: 'maxHR', label: 'Max HR (bpm)', type: 'number', placeholder: '190' },
                    ].map(({ key, label, ...rest }) => (
                      <div key={key}>
                        <Label className={labelCls}>{label}</Label>
                        <Input {...rest} value={form[key]} onChange={e => set(key, e.target.value)} className={`mt-1 ${inputCls}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-white mb-1">Training Level *</h2>
                  <p className="text-sm text-[hsl(215,20%,55%)] mb-4">Honest self-assessment helps calibrate your plans.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {LEVELS.map(({ id, label, desc }) => (
                      <button key={id} onClick={() => set('trainingLevel', id)}
                        className={`rounded-xl border p-4 text-left transition-colors ${
                          form.trainingLevel === id
                            ? 'border-[hsl(217,91%,60%)] bg-[hsl(217,91%,60%)]/10'
                            : 'border-[hsl(222,47%,14%)] hover:border-[hsl(222,47%,20%)]'
                        }`}>
                        <p className="font-semibold text-white text-sm">{label}</p>
                        <p className="text-xs text-[hsl(215,20%,55%)] mt-1">{desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-white mb-1">Your Goals *</h2>
                  <p className="text-sm text-[hsl(215,20%,55%)] mb-4">Select all that apply.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {GOALS.map(({ id, label }) => {
                      const selected = form.selectedGoals.includes(id);
                      return (
                        <button key={id} onClick={() => toggleGoal(id)}
                          className={`rounded-xl border p-3.5 text-sm font-medium transition-colors flex items-center justify-between ${
                            selected
                              ? 'border-[hsl(217,91%,60%)] bg-[hsl(217,91%,60%)]/10 text-white'
                              : 'border-[hsl(222,47%,14%)] text-[hsl(215,20%,55%)] hover:border-[hsl(222,47%,20%)]'
                          }`}>
                          {label}
                          {selected && <Check className="h-3.5 w-3.5 text-[hsl(217,91%,60%)]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-white mb-1">AI Setup</h2>
                  <p className="text-sm text-[hsl(215,20%,55%)] mb-4">Configure your local Ollama instance for the AI coach.</p>
                  <div>
                    <Label className={labelCls}>Ollama URL</Label>
                    <Input value={form.ollamaUrl} onChange={e => set('ollamaUrl', e.target.value)}
                      className={`mt-1 ${inputCls}`} placeholder="http://localhost:11434" />
                  </div>
                  <div>
                    <Label className={labelCls}>Model</Label>
                    <Input value={form.model} onChange={e => set('model', e.target.value)}
                      className={`mt-1 ${inputCls}`} placeholder="llama3.2" />
                    <p className="text-xs text-[hsl(215,20%,45%)] mt-1">Run <code className="bg-[hsl(222,47%,11%)] px-1 rounded">ollama pull llama3.2</code> to get the model</p>
                  </div>
                  <div className="rounded-xl bg-[hsl(222,47%,11%)] p-4">
                    <p className="text-xs text-[hsl(215,20%,55%)]">You can skip this and configure it later in Settings. The AI coach requires a running Ollama instance.</p>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="ghost" onClick={() => setStep(s => s - 1)} disabled={step === 0}
              className="text-[hsl(215,20%,55%)] hover:text-white">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button className={btnBase} onClick={() => setStep(s => s + 1)} disabled={!canNext()}>
                Continue <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button className={btnBase} onClick={finish} disabled={isPending}>
                {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                Get Started
              </Button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-[hsl(215,20%,40%)] mt-4">
          All data is stored locally on your device.
        </p>
      </div>
    </div>
  );
}
