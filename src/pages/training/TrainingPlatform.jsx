import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { TrainingLayout } from '@/components/training/TrainingLayout';
import { getAthleteProfile } from '@/lib/trainingApi';

const Dashboard = lazy(() => import('./Dashboard'));
const Calendar = lazy(() => import('./Calendar'));
const Plans = lazy(() => import('./Plans'));
const Progress = lazy(() => import('./Progress'));
const Analytics = lazy(() => import('./Analytics'));
const Coach = lazy(() => import('./Coach'));
const Settings = lazy(() => import('./Settings'));
const Onboarding = lazy(() => import('./Onboarding'));

const Loader = () => (
  <div className="flex items-center justify-center h-64">
    <Loader2 className="h-6 w-6 animate-spin text-[hsl(217,91%,60%)]" />
  </div>
);

function TrainingRoutes() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['t-athlete'],
    queryFn: getAthleteProfile,
    retry: false,
  });

  if (isLoading) return <Loader />;

  const needsOnboarding = !profile?.trainingLevel;

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="onboarding" element={<Onboarding />} />
        {needsOnboarding ? (
          <Route path="*" element={<Navigate to="onboarding" replace />} />
        ) : (
          <Route element={<TrainingLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="plans" element={<Plans />} />
            <Route path="progress" element={<Progress />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="coach" element={<Coach />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
}

export default TrainingRoutes;
