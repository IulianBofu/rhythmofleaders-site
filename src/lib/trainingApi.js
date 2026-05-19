import axios from 'axios';

const api = axios.create({ baseURL: '/training-api' });

// Athlete
export const getAthlete = () => api.get('/athlete').then(r => r.data);
export const getAthleteProfile = getAthlete;
export const updateAthlete = (data) => api.put('/athlete', data).then(r => r.data);
export const updateAthleteProfile = updateAthlete;

// Activities
export const getActivities = (params) => api.get('/activities', { params }).then(r => r.data);
export const getActivityStats = () => api.get('/activities/stats').then(r => r.data);
export const createActivity = (data) => api.post('/activities', data).then(r => r.data);
export const deleteActivity = (id) => api.delete(`/activities/${id}`).then(r => r.data);

// Goals
export const getGoals = () => api.get('/goals').then(r => r.data);
export const createGoal = (data) => api.post('/goals', data).then(r => r.data);
export const updateGoal = (id, data) => api.put(`/goals/${id}`, data).then(r => r.data);
export const deleteGoal = (id) => api.delete(`/goals/${id}`).then(r => r.data);

// Training Plans
export const getTrainingPlans = () => api.get('/plans/training').then(r => r.data);
export const generateTrainingPlan = (weekStart) => api.post('/plans/training/generate', { weekStart }).then(r => r.data);
export const updatePlanStatus = (id, status) => api.put(`/plans/training/${id}/status`, { status }).then(r => r.data);
export const completeSession = (planId, sessionIndex, data) =>
  api.post(`/plans/training/${planId}/session/${sessionIndex}/complete`, data).then(r => r.data);

// Nutrition Plans
export const getNutritionPlans = () => api.get('/plans/nutrition').then(r => r.data);
export const generateNutritionPlan = (date) => api.post('/plans/nutrition/generate', { date }).then(r => r.data);
export const getShoppingList = (planIds) => api.post('/plans/nutrition/shopping-list', { planIds }).then(r => r.data);

// Workout Templates
export const getWorkoutTemplates = () => api.get('/plans/templates').then(r => r.data);

// Health
export const getHealthData = (limit) => api.get('/health', { params: { limit } }).then(r => r.data);
export const getReadiness = () => api.get('/health/readiness').then(r => r.data);
export const upsertHealthData = (data) => api.post('/health', data).then(r => r.data);

// Races
export const getRaceEvents = () => api.get('/races/events').then(r => r.data);
export const createRaceEvent = (data) => api.post('/races/events', data).then(r => r.data);
export const updateRaceEvent = (id, data) => api.put(`/races/events/${id}`, data).then(r => r.data);
export const deleteRaceEvent = (id) => api.delete(`/races/events/${id}`).then(r => r.data);
export const getRaceResults = () => api.get('/races/results').then(r => r.data);
export const createRaceResult = (data) => api.post('/races/results', data).then(r => r.data);
export const getRacePredictor = (distance) => api.get('/races/predictor', { params: { distance } }).then(r => r.data);

// Injuries
export const getInjuries = () => api.get('/injuries').then(r => r.data);
export const createInjury = (data) => api.post('/injuries', data).then(r => r.data);
export const updateInjury = (id, data) => api.put(`/injuries/${id}`, data).then(r => r.data);
export const resolveInjury = (id) => api.put(`/injuries/${id}`, { status: 'resolved', resolvedDate: new Date().toISOString().split('T')[0] }).then(r => r.data);

// Insights
export const getInsights = (limit) => api.get('/insights', { params: { limit } }).then(r => r.data);
export const generateDebrief = () => api.post('/insights/debrief').then(r => r.data);

// Chat
export const getChatMessages = () => api.get('/chat/messages').then(r => r.data);
export const sendChatMessage = (message, sessionId) =>
  api.post('/chat/message', { message, sessionId }).then(r => r.data);
export const quickAction = (action) => api.post('/chat/quick-action', { action }).then(r => r.data);
export const clearChat = () => api.delete('/chat/messages').then(r => r.data);

// Strava
export const getStravaStatus = () => api.get('/strava/status').then(r => r.data);
export const getStravaAuthUrl = () => api.get('/strava/auth-url').then(r => r.data);
export const syncStrava = () => api.post('/strava/sync').then(r => r.data);
export const disconnectStrava = () => api.delete('/strava/disconnect').then(r => r.data);
export const syncRunalyze = (apiKey) => api.post('/strava/runalyze/sync', apiKey ? { apiKey } : undefined).then(r => r.data);
export const getSyncLogs = () => api.get('/strava/sync-logs').then(r => r.data);

// Settings
export const getSettings = () => api.get('/settings').then(r => r.data);
export const updateSettings = (data) => api.put('/settings', data).then(r => r.data);
export const getOllamaModels = () => api.get('/settings/ollama-models').then(r => r.data);

// Dashboard
export const getDashboard = () => api.get('/dashboard').then(r => r.data);
