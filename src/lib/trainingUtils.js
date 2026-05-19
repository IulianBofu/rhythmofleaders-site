export function formatDuration(seconds) {
  if (!seconds) return '0:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function formatPace(secondsPerKm) {
  if (!secondsPerKm) return '--';
  const m = Math.floor(secondsPerKm / 60);
  const s = Math.round(secondsPerKm % 60);
  return `${m}:${String(s).padStart(2, '0')} /km`;
}

export function formatDistance(meters) {
  if (!meters) return '0 km';
  if (meters >= 1000) return `${(meters / 1000).toFixed(2)} km`;
  return `${meters} m`;
}

export function formatTime(seconds) {
  return formatDuration(seconds);
}

export function getWeekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}

export function formatDate(date, options) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', options ?? { month: 'short', day: 'numeric', year: 'numeric' });
}

export function daysUntil(date) {
  const target = new Date(date);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getIntensityBg(intensity) {
  const map = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    moderate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    max: 'bg-red-500/20 text-red-400 border-red-500/30',
    rest: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  };
  return map[intensity?.toLowerCase()] ?? 'bg-blue-500/20 text-blue-400 border-blue-500/30';
}

export function getActivityIcon(type) {
  const map = {
    run: '🏃', bike: '🚴', swim: '🏊', walk: '🚶',
    hike: '🥾', strength: '💪', yoga: '🧘', crossfit: '🏋️', rest: '😴',
  };
  return map[type?.toLowerCase()] ?? '🏃';
}

export function readinessLabel(score) {
  if (score >= 85) return { label: 'Optimal', color: 'text-green-400' };
  if (score >= 70) return { label: 'Good', color: 'text-blue-400' };
  if (score >= 55) return { label: 'Moderate', color: 'text-yellow-400' };
  return { label: 'Low', color: 'text-red-400' };
}
