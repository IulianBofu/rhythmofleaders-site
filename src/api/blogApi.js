/// <reference types="vite/client" />
// Simple API client for backend blog CRUD
const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api`;

function authHeaders() {
  // Basic Auth: admin:Panzer89$$$
  return {
    'Authorization': 'Basic ' + btoa('admin:Panzer89$$$'),
    'Content-Type': 'application/json',
  };
}

export const blogApi = {
  async getAll() {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  },
  async get(id) {
    const res = await fetch(`${API_URL}/posts/${id}`);
    if (!res.ok) throw new Error('Not found');
    return res.json();
  },
  async create(post) {
    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error('Create failed');
    return res.json();
  },
  async update(id, post) {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error('Update failed');
    return res.json();
  },
  async remove(id) {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Delete failed');
    return res.json();
  },
  async exportJson() {
    const res = await fetch(`${API_URL}/posts-export`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Export failed');
    return res.blob();
  },
  async importJson(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_URL}/posts-import`, {
      method: 'POST',
      headers: { 'Authorization': authHeaders().Authorization },
      body: formData,
    });
    if (!res.ok) throw new Error('Import failed');
    return res.json();
  },
};
