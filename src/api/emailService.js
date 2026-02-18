// EmailJS - trimite direct din browser, zero server necesar
// Setup: https://www.emailjs.com → Add Service (Gmail) → Create Templates → Copy Keys
// Pune cheile in .env (VITE_EMAILJS_SERVICE_ID etc.)

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const TEMPLATES = {
  guide:     import.meta.env.VITE_EMAILJS_TEMPLATE_GUIDE,     // trimite ghidul PDF
  challenge: import.meta.env.VITE_EMAILJS_TEMPLATE_CHALLENGE, // trimite challenge-ul
};

async function sendEmail(templateId, params) {
  if (!SERVICE_ID || !PUBLIC_KEY || !templateId) {
    console.warn('[emailService] Lipsesc env vars EmailJS. Setează .env');
    return { ok: false, reason: 'missing_config' };
  }

  // Import lazy ca sa nu creasca bundle-ul daca nu e folosit
  const emailjs = (await import('@emailjs/browser')).default;

  try {
    const result = await emailjs.send(SERVICE_ID, templateId, params, PUBLIC_KEY);
    return { ok: true, result };
  } catch (err) {
    console.error('[emailService] Eroare trimitere:', err);
    return { ok: false, reason: err.text || err.message };
  }
}

/**
 * Trimite ghidul "5 Energy Hacks" + notificare catre Iulian
 * Template variables: {{to_email}}, {{lang}}, {{guide_url}}
 */
export async function sendGuideEmail({ email, lang }) {
  return sendEmail(TEMPLATES.guide, {
    to_email:  email,
    lang:      lang,
    guide_url: import.meta.env.VITE_GUIDE_PDF_URL || 'https://rhythmofleaders.com/guide', // inlocuieste cu URL-ul real al PDF-ului
    reply_to:  'iulian@rhythmofleaders.pro',
  });
}

/**
 * Trimite challenge-ul personalizat
 * Template variables: {{to_email}}, {{challenge_title}}, {{challenge_desc}}, {{challenge_timeframe}}, {{calendar_link}}
 */
export async function sendChallengeEmail({ email, lang, challenge }) {
  return sendEmail(TEMPLATES.challenge, {
    to_email:          email,
    lang:              lang,
    challenge_title:   challenge.title   || challenge.challenge || '',
    challenge_desc:    challenge.description || challenge.challenge || '',
    challenge_timeframe: challenge.timeframe || challenge.duration || '',
    challenge_level:   challenge.difficulty || challenge.level || '',
    calendar_link:     'https://calendly.com/iulian-cyberbuildsolutions/30min?back=1',
    reply_to:          'iulian@rhythmofleaders.pro',
  });
}
