// Airtable - stocare leads, gratuit pana la 1.200 records/baza
// Setup: airtable.com → Create Base "RhythmOfLeaders" → Table "Leads"
// Coloane: Email, Source, Status, Language, Notes, CreatedAt
// Pune cheile in .env (VITE_AIRTABLE_API_KEY, VITE_AIRTABLE_BASE_ID)

const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE   = 'Leads';

const url = () => `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`;

const headers = () => ({
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type':  'application/json',
});

/**
 * Salveaza un lead nou
 * @param {{ email, source, status, language, notes }} lead
 */
export async function saveLead({ email, source = 'website', status = 'new', language = 'en', notes = '' }) {
  if (!API_KEY || !BASE_ID) {
    console.warn('[airtable] Lipsesc env vars. Setează VITE_AIRTABLE_API_KEY si VITE_AIRTABLE_BASE_ID');
    return { ok: false };
  }

  try {
    const res = await fetch(url(), {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        fields: {
          Email:     email,
          Source:    source,
          Status:    status,
          Language:  language,
          Notes:     notes,
          CreatedAt: new Date().toISOString(),
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('[airtable] Eroare save:', err);
      return { ok: false, error: err };
    }

    const data = await res.json();
    return { ok: true, id: data.id };
  } catch (err) {
    console.error('[airtable] Eroare retea:', err);
    return { ok: false, error: err.message };
  }
}

/**
 * Lista toate lead-urile (pentru CRM)
 */
export async function listLeads() {
  if (!API_KEY || !BASE_ID) return [];

  try {
    const res = await fetch(
      `${url()}?sort[0][field]=CreatedAt&sort[0][direction]=desc`,
      { headers: headers() }
    );
    if (!res.ok) return [];
    const data = await res.json();
    // Normalizeaza structura ca sa semene cu base44
    return (data.records || []).map(r => ({
      id:         r.id,
      email:      r.fields.Email,
      source:     r.fields.Source,
      status:     r.fields.Status     || 'new',
      language:   r.fields.Language   || 'en',
      notes:      r.fields.Notes      || '',
      created_date: r.fields.CreatedAt,
    }));
  } catch (err) {
    console.error('[airtable] Eroare list:', err);
    return [];
  }
}

/**
 * Actualizeaza un lead (status, notes)
 */
export async function updateLead(id, fields) {
  if (!API_KEY || !BASE_ID) return { ok: false };

  // Mapeaza field names la Airtable column names
  const mapped = {};
  if (fields.status) mapped.Status = fields.status;
  if (fields.notes  !== undefined) mapped.Notes  = fields.notes;

  try {
    const res = await fetch(`${url()}/${id}`, {
      method:  'PATCH',
      headers: headers(),
      body:    JSON.stringify({ fields: mapped }),
    });
    return { ok: res.ok };
  } catch (err) {
    return { ok: false };
  }
}

/**
 * Sterge un lead
 */
export async function deleteLead(id) {
  if (!API_KEY || !BASE_ID) return { ok: false };

  try {
    const res = await fetch(`${url()}/${id}`, {
      method:  'DELETE',
      headers: headers(),
    });
    return { ok: res.ok };
  } catch (err) {
    return { ok: false };
  }
}
