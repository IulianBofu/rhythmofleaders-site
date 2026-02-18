# Setup EmailJS — 15 minute, zero server

## 1. Cont gratuit
→ https://www.emailjs.com → Sign Up (3.000 emailuri/lună gratuit)

## 2. Conectează Gmail
→ Email Services → Add New Service → Gmail → Connect Account
→ Copiaza **Service ID** (ex: `service_abc123`) în `.env`

## 3. Template pentru Ghid (VITE_EMAILJS_TEMPLATE_GUIDE)
→ Email Templates → Create New Template
→ Name: `guide`
→ Subject: `🎯 Ghidul tău de energie — Rhythm of Leaders`
→ Content (HTML sau text):

```
Salut!

Mulțumesc că ai solicitat ghidul "5 Energy Hacks for Executives"!

📥 Descarcă-l aici: {{guide_url}}

---
Iulian | Rhythm of Leaders
```

**Template variables folosite:**
- `{{to_email}}` → emailul utilizatorului (To: field)
- `{{guide_url}}` → link-ul PDF-ului tău
- `{{lang}}` → limba (ro/en/fr)

→ To: `{{to_email}}`
→ Reply To: `{{reply_to}}`
→ Salveaza → copiaza **Template ID** în `.env`

## 4. Template pentru Challenge (VITE_EMAILJS_TEMPLATE_CHALLENGE)
→ Email Templates → Create New Template  
→ Name: `challenge`
→ Subject: `🔥 Challenge-ul tău: {{challenge_title}}`
→ Content:

```
Salut!

Challenge-ul tău de azi:

💪 {{challenge_title}}
📋 {{challenge_desc}}
⏱️ Timeframe: {{challenge_timeframe}}
📊 Nivel: {{challenge_level}}

📅 Reservă o consultație gratuită:
{{calendar_link}}

Iulian | Rhythm of Leaders
```

**Template variables:**
- `{{to_email}}`, `{{challenge_title}}`, `{{challenge_desc}}`
- `{{challenge_timeframe}}`, `{{challenge_level}}`, `{{calendar_link}}`

## 5. Public Key
→ Account → API Keys → copiaza **Public Key** în `.env`

## 6. Test
Porneste app-ul, introdu un email real în formular, verifică inbox.
Dacă nu vine în 2 min → verifică Spam sau EmailJS dashboard → Activity.

---

## Setup Airtable (5 minute)

1. https://airtable.com → Create Base → "RhythmOfLeaders"
2. Rename Sheet → "Leads"
3. Add columns:
   - Email (Single line text)
   - Source (Single line text)  
   - Status (Single line text)
   - Language (Single line text)
   - Notes (Long text)
   - CreatedAt (Single line text)
4. https://airtable.com/create/tokens → Personal access tokens
   - Scopes: `data.records:read` + `data.records:write`
   - Access: alege baza creată
   - Copiaza token-ul în `.env` ca `VITE_AIRTABLE_API_KEY`
5. Din URL-ul bazei copiaza `appXXXXXX` → `VITE_AIRTABLE_BASE_ID`
