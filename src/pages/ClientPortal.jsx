import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Calendar, BookOpen, PlayCircle, FileText, Download, Clock, MapPin, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

const content = {
  ro: {
    title: 'Portal Clienți',
    welcome: 'Bine ai revenit',
    tabs: {
      resources: 'Resurse',
      sessions: 'Istoric Sesiuni',
      schedule: 'Programează'
    },
    logout: 'Deconectare',
    resources: {
      title: 'Biblioteca de Resurse',
      subtitle: 'Planuri, ghiduri și video-uri exclusive',
      categories: {
        all: 'Toate',
        running: 'Alergare',
        strength: 'Forță',
        nutrition: 'Nutriție',
        recovery: 'Recuperare',
        mindset: 'Mindset'
      },
      types: {
        workout_plan: 'Plan Antrenament',
        nutrition_guide: 'Ghid Nutriție',
        video: 'Video',
        pdf: 'PDF',
        article: 'Articol'
      }
    },
    sessions: {
      title: 'Istoric Sesiuni',
      subtitle: 'Toate sesiunile tale de coaching',
      upcoming: 'Viitoare',
      past: 'Trecute',
      status: {
        scheduled: 'Programată',
        completed: 'Completată',
        cancelled: 'Anulată',
        no_show: 'Absent'
      },
      types: {
        running: 'Alergare',
        strength: 'Forță',
        nutrition: 'Nutriție',
        assessment: 'Evaluare',
        other: 'Altele'
      },
      noSessions: 'Nu ai sesiuni înregistrate',
      duration: 'min'
    },
    schedule: {
      title: 'Programează Sesiune',
      subtitle: 'Alege tipul și ora dorită',
      sessionType: 'Tip sesiune',
      date: 'Data',
      time: 'Ora',
      location: 'Locație',
      notes: 'Note (opțional)',
      submit: 'Trimite cerere',
      success: 'Cerere trimisă! Te contactăm în curând.',
      selectType: 'Selectează tip',
      selectLocation: 'Selectează locația'
    }
  },
  en: {
    title: 'Client Portal',
    welcome: 'Welcome back',
    tabs: {
      resources: 'Resources',
      sessions: 'Session History',
      schedule: 'Schedule'
    },
    logout: 'Logout',
    resources: {
      title: 'Resource Library',
      subtitle: 'Exclusive plans, guides and videos',
      categories: {
        all: 'All',
        running: 'Running',
        strength: 'Strength',
        nutrition: 'Nutrition',
        recovery: 'Recovery',
        mindset: 'Mindset'
      },
      types: {
        workout_plan: 'Workout Plan',
        nutrition_guide: 'Nutrition Guide',
        video: 'Video',
        pdf: 'PDF',
        article: 'Article'
      }
    },
    sessions: {
      title: 'Session History',
      subtitle: 'All your coaching sessions',
      upcoming: 'Upcoming',
      past: 'Past',
      status: {
        scheduled: 'Scheduled',
        completed: 'Completed',
        cancelled: 'Cancelled',
        no_show: 'No Show'
      },
      types: {
        running: 'Running',
        strength: 'Strength',
        nutrition: 'Nutrition',
        assessment: 'Assessment',
        other: 'Other'
      },
      noSessions: 'No sessions recorded',
      duration: 'min'
    },
    schedule: {
      title: 'Schedule Session',
      subtitle: 'Choose type and time',
      sessionType: 'Session type',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      notes: 'Notes (optional)',
      submit: 'Submit request',
      success: 'Request sent! We\'ll contact you soon.',
      selectType: 'Select type',
      selectLocation: 'Select location'
    }
  },
  fr: {
    title: 'Portail Client',
    welcome: 'Bon retour',
    tabs: {
      resources: 'Ressources',
      sessions: 'Historique Séances',
      schedule: 'Planifier'
    },
    logout: 'Déconnexion',
    resources: {
      title: 'Bibliothèque de Ressources',
      subtitle: 'Plans, guides et vidéos exclusifs',
      categories: {
        all: 'Toutes',
        running: 'Course',
        strength: 'Force',
        nutrition: 'Nutrition',
        recovery: 'Récupération',
        mindset: 'État d\'esprit'
      },
      types: {
        workout_plan: 'Plan Entraînement',
        nutrition_guide: 'Guide Nutrition',
        video: 'Vidéo',
        pdf: 'PDF',
        article: 'Article'
      }
    },
    sessions: {
      title: 'Historique Séances',
      subtitle: 'Toutes vos séances de coaching',
      upcoming: 'À venir',
      past: 'Passées',
      status: {
        scheduled: 'Planifiée',
        completed: 'Complétée',
        cancelled: 'Annulée',
        no_show: 'Absent'
      },
      types: {
        running: 'Course',
        strength: 'Force',
        nutrition: 'Nutrition',
        assessment: 'Évaluation',
        other: 'Autres'
      },
      noSessions: 'Aucune séance enregistrée',
      duration: 'min'
    },
    schedule: {
      title: 'Planifier Séance',
      subtitle: 'Choisissez le type et l\'heure',
      sessionType: 'Type de séance',
      date: 'Date',
      time: 'Heure',
      location: 'Emplacement',
      notes: 'Notes (optionnel)',
      submit: 'Envoyer la demande',
      success: 'Demande envoyée! Nous vous contacterons bientôt.',
      selectType: 'Sélectionner le type',
      selectLocation: 'Sélectionner l\'emplacement'
    }
  }
};

export default function ClientPortal() {
  const [lang, setLang] = useState('ro');
  const [activeTab, setActiveTab] = useState('resources');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleForm, setScheduleForm] = useState({
    session_type: '',
    date: '',
    time: '',
    location: '',
    notes: ''
  });
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  const t = content[lang];

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (err) {
        base44.auth.redirectToLogin(window.location.href);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const { data: resources = [] } = useQuery({
    queryKey: ['resources', categoryFilter],
    queryFn: async () => {
      const filter = categoryFilter === 'all' ? { published: true } : { category: categoryFilter, published: true };
      return await base44.entities.Resource.filter(filter);
    },
    enabled: !!user
  });

  const { data: sessions = [] } = useQuery({
    queryKey: ['sessions', user?.email],
    queryFn: async () => {
      return await base44.entities.CoachingSession.filter({ client_email: user.email }, '-date');
    },
    enabled: !!user
  });

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    await base44.entities.Lead.create({
      email: user.email,
      name: user.full_name,
      source: 'portal_schedule',
      source_detail: `${scheduleForm.session_type} - ${scheduleForm.date} ${scheduleForm.time}`,
      message: `Locație: ${scheduleForm.location}\n${scheduleForm.notes}`,
      status: 'new',
      language: lang
    });
    setScheduleSuccess(true);
    setScheduleForm({ session_type: '', date: '', time: '', location: '', notes: '' });
  };

  const getLocalizedField = (item, field) => {
    if (lang === 'fr' && item[`${field}_fr`]) return item[`${field}_fr`];
    if (lang === 'en' && item[`${field}_en`]) return item[`${field}_en`];
    return item[`${field}_ro`];
  };

  const upcomingSessions = sessions.filter(s => new Date(s.date) > new Date());
  const pastSessions = sessions.filter(s => new Date(s.date) <= new Date());

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white mb-2">{t.title}</h1>
            <p className="text-white/80">{t.welcome}, {user?.full_name || user?.email}!</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg border border-white/30 outline-none"
            >
              <option value="ro">RO</option>
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>
            <button
              onClick={() => base44.auth.logout()}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t.logout}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            {Object.entries(t.tabs).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                  activeTab === key
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'resources' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.resources.title}</h2>
              <p className="text-slate-500 mb-6">{t.resources.subtitle}</p>
              
              <div className="flex flex-wrap gap-2">
                {Object.entries(t.resources.categories).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setCategoryFilter(key)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      categoryFilter === key
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  {resource.thumbnail_url && (
                    <img src={resource.thumbnail_url} alt={getLocalizedField(resource, 'title')} className="w-full aspect-video object-cover" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
                        {t.resources.types[resource.resource_type]}
                      </span>
                      {resource.duration && (
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {resource.duration} min
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{getLocalizedField(resource, 'title')}</h3>
                    <p className="text-slate-500 text-sm mb-4">{getLocalizedField(resource, 'description')}</p>
                    <a
                      href={resource.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.sessions.title}</h2>
              <p className="text-slate-500">{t.sessions.subtitle}</p>
            </div>

            {upcomingSessions.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">{t.sessions.upcoming}</h3>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="bg-white rounded-xl p-6 border-l-4 border-teal-500 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full mb-2">
                            {t.sessions.types[session.session_type]}
                          </span>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(session.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'ro' ? 'ro-RO' : 'en-US')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {session.duration} {t.sessions.duration}
                            </span>
                            {session.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {session.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                          {t.sessions.status[session.status]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pastSessions.length > 0 ? (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">{t.sessions.past}</h3>
                <div className="space-y-4">
                  {pastSessions.map((session) => (
                    <div key={session.id} className="bg-white rounded-xl p-6 border-l-4 border-slate-300 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full mb-2">
                            {t.sessions.types[session.session_type]}
                          </span>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(session.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'ro' ? 'ro-RO' : 'en-US')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {session.duration} {t.sessions.duration}
                            </span>
                          </div>
                          {session.notes && (
                            <p className="mt-2 text-sm text-slate-500">{session.notes}</p>
                          )}
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          session.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                          session.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {t.sessions.status[session.status]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : upcomingSessions.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">{t.sessions.noSessions}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.schedule.title}</h2>
              <p className="text-slate-500">{t.schedule.subtitle}</p>
            </div>

            {scheduleSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-emerald-800 font-semibold">{t.schedule.success}</p>
                <button
                  onClick={() => setScheduleSuccess(false)}
                  className="mt-4 text-emerald-600 hover:underline"
                >
                  {t.schedule.title}
                </button>
              </div>
            ) : (
              <form onSubmit={handleScheduleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t.schedule.sessionType}</label>
                  <select
                    value={scheduleForm.session_type}
                    onChange={(e) => setScheduleForm({...scheduleForm, session_type: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="">{t.schedule.selectType}</option>
                    {Object.entries(t.sessions.types).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{t.schedule.date}</label>
                    <input
                      type="date"
                      value={scheduleForm.date}
                      onChange={(e) => setScheduleForm({...scheduleForm, date: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{t.schedule.time}</label>
                    <input
                      type="time"
                      value={scheduleForm.time}
                      onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t.schedule.location}</label>
                  <select
                    value={scheduleForm.location}
                    onChange={(e) => setScheduleForm({...scheduleForm, location: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="">{t.schedule.selectLocation}</option>
                    <option value="Herăstrău">Herăstrău</option>
                    <option value="Băneasa / Pipera">Băneasa / Pipera</option>
                    <option value="Centru">Centru</option>
                    <option value="Online">Online</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t.schedule.notes}</label>
                  <textarea
                    value={scheduleForm.notes}
                    onChange={(e) => setScheduleForm({...scheduleForm, notes: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  {t.schedule.submit}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}