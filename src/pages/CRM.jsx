import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Users, Mail, Filter, MoreHorizontal, ExternalLink, Trash2, MessageSquare, Check } from 'lucide-react';
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

const sourceLabels = {
  lead_magnet: 'PDF Download',
  challenge: 'Challenge',
  contact_form: 'Contact Form',
  calendly: 'Calendly'
};

export default function CRM() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
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
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteLead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['leads'] })
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

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(l => l.status === filter);

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    converted: leads.filter(l => l.status === 'converted').length
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">👥 CRM - Leads</h1>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Ieșire
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total leads</p>
            <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">Leads noi</p>
            <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-500">Convertite</p>
            <p className="text-3xl font-bold text-emerald-600">{stats.converted}</p>
          </div>
        </div>

        {/* Filters & Export */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-slate-400" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
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
          </div>
          
          <Button
            variant="outline"
            onClick={() => {
              const csv = [
                ['Email', 'Sursă', 'Status', 'Limba', 'Dată', 'Note'].join(','),
                ...filteredLeads.map(l => [
                  l.email,
                  sourceLabels[l.source] || l.source,
                  l.status,
                  l.language || 'N/A',
                  new Date(l.created_date).toLocaleDateString('ro-RO'),
                  (l.notes || '').replace(/,/g, ';')
                ].join(','))
              ].join('\n');
              
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
              a.click();
            }}
            className="gap-2"
          >
            📥 Export CSV
          </Button>
        </div>

        {/* Edit Modal */}
        {editingLead && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <h2 className="text-lg font-bold mb-4">Editează lead</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <Input value={editingLead.email} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <Select
                    value={editingLead.status}
                    onValueChange={(v) => setEditingLead({ ...editingLead, status: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Nou</SelectItem>
                      <SelectItem value="contacted">Contactat</SelectItem>
                      <SelectItem value="qualified">Calificat</SelectItem>
                      <SelectItem value="converted">Convertit</SelectItem>
                      <SelectItem value="lost">Pierdut</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Note</label>
                  <Textarea
                    value={editingLead.notes || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                    rows={4}
                    placeholder="Adaugă note despre acest lead..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setEditingLead(null)}>Anulează</Button>
                <Button 
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={() => updateMutation.mutate({ id: editingLead.id, data: editingLead })}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Salvează
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Leads list */}
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
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-500">Email</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-500">Sursă</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-500">Status</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-500">Dată</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-500">Acțiuni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-900">{lead.email}</span>
                      </div>
                      {lead.notes && (
                        <p className="text-xs text-slate-400 mt-1 truncate max-w-xs">{lead.notes}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500">{sourceLabels[lead.source] || lead.source}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={statusColors[lead.status]}>
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(lead.created_date).toLocaleDateString('ro-RO')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingLead(lead)}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <a 
                          href={`mailto:${lead.email}`}
                          className="p-2 hover:bg-slate-100 rounded-lg"
                        >
                          <ExternalLink className="w-4 h-4 text-slate-400" />
                        </a>
                        <Button
                          variant="ghost"
                          size="icon"
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}