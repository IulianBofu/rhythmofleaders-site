import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Lock, Users, Mail, Filter, Trash2, MessageSquare, Check,
  Search, ArrowUpDown, Download, Phone, User, Calendar,
  ChevronRight, X, Bell, ArrowRight
} from 'lucide-react';
import { listLeads, updateLead, deleteLead } from '@/api/airtableClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const ADMIN_PASSWORD = 'Panzer89$$$';

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-purple-100 text-purple-700',
  converted: 'bg-emerald-100 text-emerald-700',
  lost: 'bg-slate-100 text-slate-500'
};

const statusFlow = ['new', 'contacted', 'qualified', 'converted'];

const sourceLabels = {
  lead_magnet: 'PDF Download',
  challenge: 'Challenge',
  micro_challenge: 'Micro Challenge',
  contact_form: 'Contact Form',
  calendly: 'Calendly',
  popup: 'Popup PDF',
  retreat_consultation: 'Retreat Consultation',
  retreat_booking: 'Retreat Booking',
  portal_schedule: 'Portal Schedule',
  website: 'Website'
};

export default function CRM() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('created_date');
  const [sortDir, setSortDir] = useState('desc');
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingLead, setEditingLead] = useState(null);

  const queryClient = useQueryClient();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: () => listLeads(),
    enabled: isAuthenticated,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateLead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      setEditingLead(null);
      setSelectedLead(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      setSelectedLead(null);
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Parolă incorectă');
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const quickStatusChange = (lead, newStatus) => {
    updateMutation.mutate({ id: lead.id, data: { status: newStatus } });
  };

  // Filter and sort
  const filteredLeads = useMemo(() => {
    let result = leads;

    if (statusFilter !== 'all') {
      result = result.filter(l => l.status === statusFilter);
    }
    if (sourceFilter !== 'all') {
      result = result.filter(l => l.source === sourceFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(l =>
        (l.email || '').toLowerCase().includes(q) ||
        (l.name || '').toLowerCase().includes(q) ||
        (l.notes || '').toLowerCase().includes(q) ||
        (l.phone || '').toLowerCase().includes(q)
      );
    }

    result = [...result].sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';
      if (sortField === 'created_date') {
        aVal = new Date(aVal).getTime() || 0;
        bVal = new Date(bVal).getTime() || 0;
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [leads, statusFilter, sourceFilter, searchQuery, sortField, sortDir]);

  const stats = useMemo(() => ({
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    converted: leads.filter(l => l.status === 'converted').length,
    conversionRate: leads.length > 0
      ? Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100)
      : 0,
    reminders: leads.filter(l => l.reminder_date && new Date(l.reminder_date) <= new Date()).length,
  }), [leads]);

  const uniqueSources = useMemo(() => {
    const sources = new Set(leads.map(l => l.source).filter(Boolean));
    return Array.from(sources);
  }, [leads]);

  const exportCSV = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Source', 'Status', 'Language', 'Date', 'Reminder', 'Notes'].join(','),
      ...filteredLeads.map(l => [
        `"${(l.name || '').replace(/"/g, '""')}"`,
        l.email,
        `"${(l.phone || '').replace(/"/g, '""')}"`,
        sourceLabels[l.source] || l.source,
        l.status,
        l.language || 'N/A',
        new Date(l.created_date).toLocaleDateString('ro-RO'),
        l.reminder_date ? new Date(l.reminder_date).toLocaleDateString('ro-RO') : '',
        `"${(l.notes || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-2xl mb-4">
                <Lock className="w-8 h-8 text-teal-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">CRM Admin</h1>
              <p className="text-slate-500 mt-2">Introduceți parola pentru acces</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolă"
                className="text-center text-lg"
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                Autentificare
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  const SortHeader = ({ field, children }) => (
    <th
      className="text-left px-4 py-3 text-sm font-medium text-slate-500 cursor-pointer hover:text-slate-700 select-none"
      onClick={() => handleSort(field)}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sortField === field && (
          <ArrowUpDown className="w-3 h-3" />
        )}
      </span>
    </th>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">CRM - Leads</h1>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Ieșire
          </Button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'text-slate-900' },
            { label: 'Noi', value: stats.new, color: 'text-blue-600' },
            { label: 'Contactate', value: stats.contacted, color: 'text-yellow-600' },
            { label: 'Calificate', value: stats.qualified, color: 'text-purple-600' },
            { label: 'Convertite', value: stats.converted, color: 'text-emerald-600' },
            { label: 'Conversie', value: `${stats.conversionRate}%`, color: 'text-teal-600' },
            { label: 'Remindere', value: stats.reminders, color: stats.reminders > 0 ? 'text-red-600' : 'text-slate-400' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search, Filters & Export */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Caută după nume, email, telefon, note..."
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate</SelectItem>
              <SelectItem value="new">Noi</SelectItem>
              <SelectItem value="contacted">Contactate</SelectItem>
              <SelectItem value="qualified">Calificate</SelectItem>
              <SelectItem value="converted">Convertite</SelectItem>
              <SelectItem value="lost">Pierdute</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sursă" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate sursele</SelectItem>
              {uniqueSources.map(src => (
                <SelectItem key={src} value={src}>{sourceLabels[src] || src}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={exportCSV} className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {/* Leads Table */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Niciun lead găsit</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <SortHeader field="name">Nume</SortHeader>
                  <SortHeader field="email">Email</SortHeader>
                  <th className="text-left px-4 py-3 text-sm font-medium text-slate-500">Telefon</th>
                  <SortHeader field="source">Sursă</SortHeader>
                  <SortHeader field="status">Status</SortHeader>
                  <SortHeader field="created_date">Dată</SortHeader>
                  <th className="text-left px-4 py-3 text-sm font-medium text-slate-500">Reminder</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-slate-500">Acțiuni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => {
                  const hasReminder = lead.reminder_date && new Date(lead.reminder_date) <= new Date();
                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-slate-50 cursor-pointer ${hasReminder ? 'bg-amber-50/50' : ''}`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-4 py-3">
                        <span className="font-medium text-slate-900">{lead.name || '-'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-slate-700 text-sm">{lead.email}</span>
                        {lead.notes && (
                          <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[200px]">{lead.notes}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{lead.phone || '-'}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">
                          {sourceLabels[lead.source] || lead.source}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-500">
                        {lead.created_date ? new Date(lead.created_date).toLocaleDateString('ro-RO') : '-'}
                      </td>
                      <td className="px-4 py-3">
                        {lead.reminder_date ? (
                          <span className={`text-xs flex items-center gap-1 ${hasReminder ? 'text-red-600 font-semibold' : 'text-slate-500'}`}>
                            <Bell className="w-3 h-3" />
                            {new Date(lead.reminder_date).toLocaleDateString('ro-RO')}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1">
                          {/* Quick status advance */}
                          {lead.status !== 'converted' && lead.status !== 'lost' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              title={`Avansează la ${statusFlow[statusFlow.indexOf(lead.status) + 1] || 'next'}`}
                              onClick={() => {
                                const nextIdx = statusFlow.indexOf(lead.status) + 1;
                                if (nextIdx < statusFlow.length) {
                                  quickStatusChange(lead, statusFlow[nextIdx]);
                                }
                              }}
                            >
                              <ArrowRight className="w-4 h-4 text-teal-600" />
                            </Button>
                          )}
                          <a
                            href={`mailto:${lead.email}`}
                            className="p-1.5 hover:bg-slate-100 rounded-lg"
                            title="Trimite email"
                          >
                            <Mail className="w-4 h-4 text-slate-400" />
                          </a>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              if (confirm('Sigur vrei să ștergi acest lead?')) {
                                deleteMutation.mutate(lead.id);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail Panel */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end" onClick={() => setSelectedLead(null)}>
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            className="w-full max-w-lg bg-white h-full shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Detalii Lead</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedLead(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500">Nume</p>
                    <Input
                      value={selectedLead.name || ''}
                      onChange={(e) => setSelectedLead({ ...selectedLead, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="font-medium text-slate-900">{selectedLead.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500">Telefon</p>
                    <Input
                      value={selectedLead.phone || ''}
                      onChange={(e) => setSelectedLead({ ...selectedLead, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs text-slate-500 mb-2">Status</p>
                <div className="flex flex-wrap gap-2">
                  {['new', 'contacted', 'qualified', 'converted', 'lost'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedLead({ ...selectedLead, status: s })}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedLead.status === s
                          ? statusColors[s] + ' ring-2 ring-offset-1 ring-slate-300'
                          : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Source & Language */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Sursă</p>
                  <p className="text-sm font-medium text-slate-700">{sourceLabels[selectedLead.source] || selectedLead.source}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Limbă</p>
                  <p className="text-sm font-medium text-slate-700">{selectedLead.language?.toUpperCase() || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Data creării</p>
                  <p className="text-sm text-slate-700">
                    {selectedLead.created_date ? new Date(selectedLead.created_date).toLocaleString('ro-RO') : '-'}
                  </p>
                </div>
              </div>

              {/* Reminder */}
              <div>
                <p className="text-xs text-slate-500 mb-2">Reminder</p>
                <Input
                  type="date"
                  value={selectedLead.reminder_date ? selectedLead.reminder_date.split('T')[0] : ''}
                  onChange={(e) => setSelectedLead({ ...selectedLead, reminder_date: e.target.value })}
                />
              </div>

              {/* Notes */}
              <div>
                <p className="text-xs text-slate-500 mb-2">Note</p>
                <Textarea
                  value={selectedLead.notes || ''}
                  onChange={(e) => setSelectedLead({ ...selectedLead, notes: e.target.value })}
                  rows={6}
                  placeholder="Adaugă note despre acest lead..."
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <Button
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                  onClick={() => updateMutation.mutate({
                    id: selectedLead.id,
                    data: {
                      status: selectedLead.status,
                      notes: selectedLead.notes,
                      name: selectedLead.name,
                      phone: selectedLead.phone,
                      reminder_date: selectedLead.reminder_date,
                    }
                  })}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Salvează
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    if (confirm('Sigur vrei să ștergi acest lead?')) {
                      deleteMutation.mutate(selectedLead.id);
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
