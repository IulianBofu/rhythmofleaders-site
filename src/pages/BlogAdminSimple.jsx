import React, { useEffect, useState } from 'react';

export default function BlogAdminSimple() {
  const emptyArticle = {
    title_ro: '',
    title_en: '',
    title_fr: '',
    excerpt_ro: '',
    excerpt_en: '',
    excerpt_fr: '',
    content_ro: '',
    content_en: '',
    content_fr: '',
    slug: '',
    category: '',
    image_url: '',
    tags: '',
    read_time: 5,
    published: false,
    publish_date: '',
  };

  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyArticle);
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sortTag, setSortTag] = useState('');
  const [search, setSearch] = useState('');
  const ADMIN_PASSWORD = 'Panzer89$$$'; // Poți schimba parola aici

  useEffect(() => {
    fetch('/blog/index/posts.json')
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  // Import JSON din fișier
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(String(evt.target.result));
        if (Array.isArray(data)) setPosts(data);
        else alert('Fișierul nu conține un array JSON valid!');
      } catch {
        alert('Eroare la parsarea fișierului JSON!');
      }
    };
    reader.readAsText(file);
  };

  // Export JSON ca fișier
  const handleExportFile = () => {
    const json = JSON.stringify(posts, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'posts.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEdit = (post) => {
    setForm(post);
    setEditing(post.slug);
    setShowForm(true);
  };

  const handleDelete = (slug) => {
    if (window.confirm('Ștergi articolul?')) {
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    }
  };

  const handleAdd = () => {
    setForm(emptyArticle);
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.slug) {
      alert('Completează slug!');
      return;
    }
    if (!form.title_ro && !form.title_en && !form.title_fr) {
      alert('Completează cel puțin un titlu!');
      return;
    }
    setPosts((prev) => {
      const exists = prev.find((p) => p.slug === form.slug);
      if (exists) {
        return prev.map((p) => (p.slug === form.slug ? { ...form } : p));
      }
      return [...prev, { ...form }];
    });
    setShowForm(false);
  };

  const handleExport = () => {
    const json = JSON.stringify(posts, null, 2);
    navigator.clipboard.writeText(json);
    alert('JSON copiat în clipboard!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded shadow max-w-xs w-full">
          <h2 className="text-xl font-bold mb-4">Autentificare Admin Blog</h2>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Parolă admin"
            className="border p-2 rounded w-full mb-4"
          />
          <button
            onClick={() => {
              if (password === ADMIN_PASSWORD) setIsAuthenticated(true);
              else alert('Parolă greșită!');
            }
            }
            className="w-full bg-teal-600 text-white py-2 rounded"
          >Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 mb-4 text-sm max-w-2xl">
          <b>Atenție:</b> Pentru ca articolele noi sau importate să apară pe homepage și în blog, trebuie să descarci fișierul <code>posts.json</code> actualizat și să îl înlocuiești manual în <code>/public/blog/index/posts.json</code>.<br />
          <span className="block mt-2">După ce ai făcut modificări sau import, apasă <b>Descarcă posts.json</b> și suprascrie fișierul din proiect. Apoi dă refresh la pagină.</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900">Blog Admin</h1>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleAdd} className="bg-teal-600 text-white px-4 py-2 rounded font-semibold hover:bg-teal-700">Adaugă articol</button>
          <button onClick={handleExportFile} className="bg-slate-200 px-4 py-2 rounded font-semibold hover:bg-slate-300">Descarcă posts.json</button>
          <button onClick={handleExport} className="bg-slate-200 px-4 py-2 rounded font-semibold hover:bg-slate-300">Copiază JSON</button>
          <label className="bg-slate-200 px-4 py-2 rounded font-semibold hover:bg-slate-300 cursor-pointer">
            Importă fișier
            <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
          </label>
          <button onClick={() => setIsAuthenticated(false)} className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600">Deconectare</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Caută titlu, slug sau tag..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <input
          type="text"
          placeholder="Filtrează după tag (ex: energie)"
          value={sortTag}
          onChange={e => setSortTag(e.target.value)}
          className="border p-2 rounded w-64"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border border-slate-200">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3 text-left">Titlu</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Taguri</th>
              <th className="p-3 text-left">Publicat</th>
              <th className="p-3 text-left">Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {posts
              .filter(post => {
                const q = search.toLowerCase();
                return (
                  (!q ||
                    (post.title_ro && post.title_ro.toLowerCase().includes(q)) ||
                    (post.title_en && post.title_en.toLowerCase().includes(q)) ||
                    (post.title_fr && post.title_fr.toLowerCase().includes(q)) ||
                    (post.slug && post.slug.toLowerCase().includes(q)) ||
                    (post.tags && post.tags.toLowerCase().includes(q))) &&
                  (!sortTag || (post.tags && post.tags.toLowerCase().split(',').map(t => t.trim()).includes(sortTag.toLowerCase())))
                );
              })
              .sort((a, b) => (b.publish_date || '').localeCompare(a.publish_date || ''))
              .map(post => (
                <tr key={post.slug} className="border-t">
                  <td className="p-3 font-semibold text-slate-800 max-w-xs truncate">{post.title_ro || post.title_en || post.title_fr || <span className="italic text-slate-400">(fără titlu)</span>}</td>
                  <td className="p-3 text-slate-600 max-w-xs truncate">{post.slug}</td>
                  <td className="p-3 text-slate-600 max-w-xs truncate">{post.tags}</td>
                  <td className="p-3">
                    {post.published ? <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">DA</span> : <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">NU</span>}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(post)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">Editează</button>
                    <button onClick={() => handleDelete(post.slug)} className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200">Șterge</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="text-center text-slate-500 py-8">Nu există articole.</div>
        )}
      </div>

      {/* Editor modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl">&times;</button>
            <h2 className="text-2xl font-bold mb-4">{editing ? 'Editează articol' : 'Adaugă articol nou'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" className="border p-2 rounded" placeholder="Slug URL" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} />
              <input type="text" className="border p-2 rounded" placeholder="Categorie" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
              <input type="text" className="border p-2 rounded" placeholder="Tags (CSV)" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
              <input type="number" className="border p-2 rounded" placeholder="Timp citire (min)" value={form.read_time} onChange={e => setForm(f => ({ ...f, read_time: Number(e.target.value) }))} />
              <input type="text" className="border p-2 rounded" placeholder="URL Imagine" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} />
              <input type="date" className="border p-2 rounded" placeholder="Data publicare" value={form.publish_date} onChange={e => setForm(f => ({ ...f, publish_date: e.target.value }))} />
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
                <span className="font-semibold">Publicat</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input type="text" className="border p-2 rounded" placeholder="Titlu RO" value={form.title_ro} onChange={e => setForm(f => ({ ...f, title_ro: e.target.value }))} />
              <input type="text" className="border p-2 rounded" placeholder="Titlu EN" value={form.title_en} onChange={e => setForm(f => ({ ...f, title_en: e.target.value }))} />
              <input type="text" className="border p-2 rounded" placeholder="Titlu FR" value={form.title_fr} onChange={e => setForm(f => ({ ...f, title_fr: e.target.value }))} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <textarea className="border p-2 rounded h-24" placeholder="Excerpt RO" value={form.excerpt_ro} onChange={e => setForm(f => ({ ...f, excerpt_ro: e.target.value }))} />
              <textarea className="border p-2 rounded h-24" placeholder="Excerpt EN" value={form.excerpt_en} onChange={e => setForm(f => ({ ...f, excerpt_en: e.target.value }))} />
              <textarea className="border p-2 rounded h-24" placeholder="Excerpt FR" value={form.excerpt_fr} onChange={e => setForm(f => ({ ...f, excerpt_fr: e.target.value }))} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <textarea className="border p-2 rounded h-32" placeholder="Conținut RO (HTML)" value={form.content_ro} onChange={e => setForm(f => ({ ...f, content_ro: e.target.value }))} />
              <textarea className="border p-2 rounded h-32" placeholder="Conținut EN (HTML)" value={form.content_en} onChange={e => setForm(f => ({ ...f, content_en: e.target.value }))} />
              <textarea className="border p-2 rounded h-32" placeholder="Conținut FR (HTML)" value={form.content_fr} onChange={e => setForm(f => ({ ...f, content_fr: e.target.value }))} />
            </div>
            <div className="flex gap-4 justify-end">
              <button onClick={() => setShowForm(false)} className="bg-slate-200 px-4 py-2 rounded font-semibold hover:bg-slate-300">Anulează</button>
              <button onClick={handleSave} className="bg-teal-600 text-white px-4 py-2 rounded font-semibold hover:bg-teal-700">Salvează</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
