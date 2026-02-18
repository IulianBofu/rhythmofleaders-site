const CALENDLY = 'https://calendly.com/iulian-cyberbuildsolutions/30min?back=1';
const PHONE = '+40 750 497 638';
const EMAIL = 'iulian@rhythmofleaders.pro';
const LINKEDIN = 'https://www.linkedin.com/in/iulianbofu';

const i18n = {
  guide: {
    ro: {
      subject: 'Ghidul tău: 5 Hack-uri de Energie pentru Executivi',
      greeting: 'Salut,',
      intro: 'Îți mulțumesc că ai descărcat ghidul! Găsești PDF-ul mai jos.',
      downloadBtn: 'Descarcă Ghidul PDF',
      tip: 'Sfatul meu: începe cu <b>Hack-ul #1</b> chiar mâine dimineață — durează 7 minute și îți schimbă întreaga zi.',
      callTitle: 'Vrei să mergem mai departe?',
      callText: 'Dacă vrei să aplic aceste principii personalizat pe situația ta, rezervă o consultație gratuită de 30 minute.',
      callBtn: 'Rezervă o consultație gratuită →',
      closing: 'Cu energie,',
      footerText: 'Rhythm of Leaders · Coaching de Performanță pentru Executivi',
    },
    en: {
      subject: 'Your Guide: 5 Energy Hacks for Executives',
      greeting: 'Hi,',
      intro: 'Thank you for downloading the guide! You\'ll find the PDF below.',
      downloadBtn: 'Download PDF Guide',
      tip: 'My tip: start with <b>Hack #1</b> tomorrow morning — it takes 7 minutes and changes your entire day.',
      callTitle: 'Want to go further?',
      callText: 'If you want to apply these principles to your specific situation, book a free 30-minute consultation.',
      callBtn: 'Book a free consultation →',
      closing: 'With energy,',
      footerText: 'Rhythm of Leaders · Executive Performance Coaching',
    },
    fr: {
      subject: 'Votre guide: 5 Astuces Énergie pour Dirigeants',
      greeting: 'Bonjour,',
      intro: 'Merci d\'avoir téléchargé le guide! Vous trouverez le PDF ci-dessous.',
      downloadBtn: 'Télécharger le Guide PDF',
      tip: 'Mon conseil: commencez par <b>l\'Astuce #1</b> dès demain matin — cela prend 7 minutes et change toute votre journée.',
      callTitle: 'Vous voulez aller plus loin?',
      callText: 'Si vous souhaitez appliquer ces principes à votre situation, réservez une consultation gratuite de 30 minutes.',
      callBtn: 'Réserver une consultation gratuite →',
      closing: 'Avec énergie,',
      footerText: 'Rhythm of Leaders · Coaching de Performance pour Dirigeants',
    },
  },
  challenge: {
    ro: {
      subject: 'Provocarea ta personalizată de azi',
      greeting: 'Salut,',
      intro: 'Ai primit provocarea ta personalizată pentru azi. Mic efort, impact mare.',
      challengeLabel: 'Provocarea ta:',
      durationLabel: 'Obiectiv pe termen lung:',
      levelLabel: 'Nivel:',
      motivationTitle: 'De ce funcționează asta?',
      motivationText: 'Micro-obiceiurile zilnice construiesc rezultate pe termen lung. 5 minute consistente bat o oră ocazională.',
      callTitle: 'Vrei un plan complet personalizat?',
      callText: 'Rezervă o consultație gratuită și construim împreună un program de energie adaptat stilului tău de viață.',
      callBtn: 'Rezervă consultația gratuită →',
      closing: 'Mult succes azi,',
      footerText: 'Rhythm of Leaders · Coaching de Performanță pentru Executivi',
    },
    en: {
      subject: 'Your personalized challenge for today',
      greeting: 'Hi,',
      intro: 'Here\'s your personalized challenge for today. Small effort, big impact.',
      challengeLabel: 'Your challenge:',
      durationLabel: 'Long-term goal:',
      levelLabel: 'Level:',
      motivationTitle: 'Why does this work?',
      motivationText: 'Daily micro-habits build long-term results. 5 consistent minutes beat an occasional hour.',
      callTitle: 'Want a fully personalized plan?',
      callText: 'Book a free consultation and we\'ll build an energy program tailored to your lifestyle.',
      callBtn: 'Book the free consultation →',
      closing: 'Good luck today,',
      footerText: 'Rhythm of Leaders · Executive Performance Coaching',
    },
    fr: {
      subject: 'Votre défi personnalisé d\'aujourd\'hui',
      greeting: 'Bonjour,',
      intro: 'Voici votre défi personnalisé pour aujourd\'hui. Petit effort, grand impact.',
      challengeLabel: 'Votre défi:',
      durationLabel: 'Objectif à long terme:',
      levelLabel: 'Niveau:',
      motivationTitle: 'Pourquoi ça fonctionne?',
      motivationText: 'Les micro-habitudes quotidiennes construisent des résultats à long terme. 5 minutes constantes valent mieux qu\'une heure occasionnelle.',
      callTitle: 'Vous voulez un plan entièrement personnalisé?',
      callText: 'Réservez une consultation gratuite et nous construirons ensemble un programme d\'énergie adapté à votre style de vie.',
      callBtn: 'Réserver la consultation gratuite →',
      closing: 'Bonne chance aujourd\'hui,',
      footerText: 'Rhythm of Leaders · Coaching de Performance pour Dirigeants',
    },
  },
  reservation: {
    ro: {
      subjectClient: 'Rezervarea ta la Rhythm of Leaders Retreat',
      subjectAdmin: 'Rezervare nouă - Retreat',
      greeting: 'Salut',
      intro: 'Am primit cererea ta de rezervare. Îți confirmăm locul și te contactăm în maxim 24h pentru finalizare.',
      detailsTitle: 'Detaliile rezervării:',
      nameLabel: 'Nume:',
      emailLabel: 'Email:',
      phoneLabel: 'Telefon:',
      locationLabel: 'Locație:',
      roomLabel: 'Tip cameră:',
      tierLabel: 'Pachet:',
      totalLabel: 'Total estimat:',
      depositLabel: 'Avans (30%):',
      nextTitle: 'Pași următori:',
      nextSteps: ['Te contactăm în 24h pentru confirmare', 'Plata avansului de 30% finalizează rezervarea', 'Primești detalii complete despre locație și program'],
      callTitle: 'Ai întrebări?',
      callText: 'Mă poți contacta direct sau rezerva un apel rapid.',
      callBtn: 'Rezervă un apel →',
      closing: 'Ne vedem la retreat,',
      footerText: 'Rhythm of Leaders · Coaching de Performanță pentru Executivi',
    },
    en: {
      subjectClient: 'Your Rhythm of Leaders Retreat Booking',
      subjectAdmin: 'New Booking - Retreat',
      greeting: 'Hi',
      intro: 'We received your booking request. We confirm your spot and will contact you within 24h to finalize.',
      detailsTitle: 'Booking details:',
      nameLabel: 'Name:',
      emailLabel: 'Email:',
      phoneLabel: 'Phone:',
      locationLabel: 'Location:',
      roomLabel: 'Room type:',
      tierLabel: 'Package:',
      totalLabel: 'Estimated total:',
      depositLabel: 'Deposit (30%):',
      nextTitle: 'Next steps:',
      nextSteps: ['We\'ll contact you within 24h for confirmation', '30% deposit payment finalizes your booking', 'You\'ll receive full details about location and schedule'],
      callTitle: 'Have questions?',
      callText: 'You can contact me directly or book a quick call.',
      callBtn: 'Book a call →',
      closing: 'See you at the retreat,',
      footerText: 'Rhythm of Leaders · Executive Performance Coaching',
    },
    fr: {
      subjectClient: 'Votre réservation Rhythm of Leaders Retreat',
      subjectAdmin: 'Nouvelle Réservation - Retreat',
      greeting: 'Bonjour',
      intro: 'Nous avons reçu votre demande de réservation. Nous confirmons votre place et vous contacterons sous 24h pour finaliser.',
      detailsTitle: 'Détails de la réservation:',
      nameLabel: 'Nom:',
      emailLabel: 'Email:',
      phoneLabel: 'Téléphone:',
      locationLabel: 'Lieu:',
      roomLabel: 'Type de chambre:',
      tierLabel: 'Forfait:',
      totalLabel: 'Total estimé:',
      depositLabel: 'Acompte (30%):',
      nextTitle: 'Prochaines étapes:',
      nextSteps: ['Nous vous contacterons sous 24h pour confirmation', 'Le paiement de l\'acompte de 30% finalise votre réservation', 'Vous recevrez tous les détails sur le lieu et le programme'],
      callTitle: 'Des questions?',
      callText: 'Vous pouvez me contacter directement ou réserver un appel rapide.',
      callBtn: 'Réserver un appel →',
      closing: 'À bientôt au retreat,',
      footerText: 'Rhythm of Leaders · Coaching de Performance pour Dirigeants',
    },
  },
};

function baseWrapper(content) {
  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0f766e 0%,#059669 100%);padding:36px 40px;text-align:center;">
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Rhythm of Leaders</p>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px;font-weight:400;">Executive Performance Coaching</p>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:40px 40px 0;">${content}</td></tr>

        <!-- Divider -->
        <tr><td style="padding:32px 40px 0;">
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:0;" />
        </td></tr>

        <!-- Contact row -->
        <tr><td style="padding:24px 40px;text-align:center;">
          <p style="margin:0 0 12px;color:#64748b;font-size:13px;">Iulian Bofu &nbsp;·&nbsp; Executive Performance Coach</p>
          <p style="margin:0;font-size:13px;">
            <a href="mailto:${EMAIL}" style="color:#0f766e;text-decoration:none;">${EMAIL}</a>
            &nbsp;·&nbsp;
            <a href="tel:${PHONE.replace(/\s/g,'')}" style="color:#0f766e;text-decoration:none;">${PHONE}</a>
            &nbsp;·&nbsp;
            <a href="${LINKEDIN}" style="color:#0f766e;text-decoration:none;">LinkedIn</a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0;color:#94a3b8;font-size:11px;">© 2026 Rhythm of Leaders · CUI: RO53532866</p>
            <p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">Ai primit acest email deoarece ai completat un formular pe rhythmofleaders.pro</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function ctaButton(url, label) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
    <tr><td align="center">
      <a href="${url}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#0f766e,#059669);color:#ffffff;text-decoration:none;border-radius:50px;font-weight:700;font-size:15px;letter-spacing:0.2px;">${label}</a>
    </td></tr>
  </table>`;
}

export function buildConsultationEmail(lang, data, forAdmin = false) {
  const t = {
    ro: {
      subjectClient: 'Cererea ta de consultație gratuită a fost primită',
      subjectAdmin: 'Cerere nouă - Consultație Gratuită Retreat',
      greetingClient: `Salut ${data.name ? data.name.split(' ')[0] : ''},`,
      greetingAdmin: 'Cerere nouă de consultație:',
      introClient: 'Am primit cererea ta de consultație gratuită! Te contactăm în maxim 24 de ore pentru a stabili un moment potrivit.',
      introAdmin: 'Un client nou a solicitat o consultație gratuită prin formularul de pe pagina Retreat.',
      detailsTitle: 'Detalii cerere:',
      nameLabel: 'Nume:', emailLabel: 'Email:', phoneLabel: 'Telefon:',
      locationLabel: 'Locație preferată:', messageLabel: 'Mesaj:',
      callTitle: 'Sau rezervă direct:',
      callText: 'Dacă preferi să alegi tu data, poți rezerva direct prin Calendly.',
      callBtn: 'Rezervă consultația →',
      closing: 'Pe curând,',
    },
    en: {
      subjectClient: 'Your free consultation request has been received',
      subjectAdmin: 'New Request - Free Retreat Consultation',
      greetingClient: `Hi ${data.name ? data.name.split(' ')[0] : ''},`,
      greetingAdmin: 'New consultation request:',
      introClient: 'We received your free consultation request! We\'ll contact you within 24 hours to schedule a convenient time.',
      introAdmin: 'A new client requested a free consultation through the Retreat page form.',
      detailsTitle: 'Request details:',
      nameLabel: 'Name:', emailLabel: 'Email:', phoneLabel: 'Phone:',
      locationLabel: 'Preferred location:', messageLabel: 'Message:',
      callTitle: 'Or book directly:',
      callText: 'If you prefer to pick the date yourself, you can book directly through Calendly.',
      callBtn: 'Book consultation →',
      closing: 'Talk soon,',
    },
    fr: {
      subjectClient: 'Votre demande de consultation gratuite a été reçue',
      subjectAdmin: 'Nouvelle demande - Consultation Gratuite Retraite',
      greetingClient: `Bonjour ${data.name ? data.name.split(' ')[0] : ''},`,
      greetingAdmin: 'Nouvelle demande de consultation:',
      introClient: 'Nous avons reçu votre demande de consultation gratuite! Nous vous contacterons dans les 24 heures pour fixer un moment.',
      introAdmin: 'Un nouveau client a demandé une consultation gratuite via le formulaire de la page Retraite.',
      detailsTitle: 'Détails de la demande:',
      nameLabel: 'Nom:', emailLabel: 'Email:', phoneLabel: 'Téléphone:',
      locationLabel: 'Lieu préféré:', messageLabel: 'Message:',
      callTitle: 'Ou réservez directement:',
      callText: 'Si vous préférez choisir la date vous-même, vous pouvez réserver directement via Calendly.',
      callBtn: 'Réserver consultation →',
      closing: 'À bientôt,',
    },
  };

  const l = t[lang] || t.en;
  const subject = forAdmin ? l.subjectAdmin : l.subjectClient;
  const rows = [
    [l.nameLabel, data.name],
    [l.emailLabel, data.email],
    [l.phoneLabel, data.phone],
    [l.locationLabel, data.location],
    data.message ? [l.messageLabel, data.message] : null,
  ].filter(Boolean);

  const body = `
    <p style="margin:0 0 8px;color:#334155;font-size:16px;font-weight:600;">${forAdmin ? l.greetingAdmin : l.greetingClient}</p>
    <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">${forAdmin ? l.introAdmin : l.introClient}</p>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin:0 0 28px;">
      <p style="margin:0 0 16px;color:#1e293b;font-size:15px;font-weight:700;">${l.detailsTitle}</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${rows.map(([label, val]) => `
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:13px;width:45%;vertical-align:top;">${label}</td>
            <td style="padding:6px 0;color:#1e293b;font-size:13px;font-weight:600;">${val || '-'}</td>
          </tr>
        `).join('')}
      </table>
    </div>

    <p style="margin:0 0 8px;color:#1e293b;font-size:17px;font-weight:700;">${l.callTitle}</p>
    <p style="margin:0 0 4px;color:#475569;font-size:15px;line-height:1.6;">${l.callText}</p>

    ${ctaButton(CALENDLY, l.callBtn)}

    <p style="margin:32px 0 4px;color:#475569;font-size:15px;">${l.closing}</p>
    <p style="margin:0;color:#1e293b;font-size:15px;font-weight:700;">Iulian Bofu</p>
  `;
  return { subject, html: baseWrapper(body) };
}

export function buildGuideEmail(lang, guideUrl) {
  const t = i18n.guide[lang] || i18n.guide.en;
  const body = `
    <p style="margin:0 0 8px;color:#334155;font-size:16px;font-weight:600;">${t.greeting}</p>
    <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">${t.intro}</p>

    ${ctaButton(guideUrl, t.downloadBtn)}

    <div style="background:#f0fdf4;border-left:4px solid #10b981;border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 32px;">
      <p style="margin:0;color:#065f46;font-size:14px;line-height:1.6;">💡 ${t.tip}</p>
    </div>

    <p style="margin:0 0 8px;color:#1e293b;font-size:17px;font-weight:700;">${t.callTitle}</p>
    <p style="margin:0 0 4px;color:#475569;font-size:15px;line-height:1.6;">${t.callText}</p>

    ${ctaButton(CALENDLY, t.callBtn)}

    <p style="margin:32px 0 4px;color:#475569;font-size:15px;">${t.closing}</p>
    <p style="margin:0 0 0;color:#1e293b;font-size:15px;font-weight:700;">Iulian Bofu</p>
  `;
  return { subject: t.subject, html: baseWrapper(body) };
}

export function buildChallengeEmail(lang, challenge) {
  const t = i18n.challenge[lang] || i18n.challenge.en;
  const body = `
    <p style="margin:0 0 8px;color:#334155;font-size:16px;font-weight:600;">${t.greeting}</p>
    <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">${t.intro}</p>

    <div style="background:#f0fdf4;border:2px solid #10b981;border-radius:12px;padding:24px;margin:0 0 28px;">
      <p style="margin:0 0 6px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">${t.challengeLabel}</p>
      <p style="margin:0 0 16px;color:#1e293b;font-size:18px;font-weight:700;line-height:1.4;">${challenge.title || challenge.challenge}</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:4px 0;color:#64748b;font-size:13px;width:40%;">${t.durationLabel}</td>
          <td style="padding:4px 0;color:#1e293b;font-size:13px;font-weight:600;">${challenge.timeframe || challenge.duration}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;color:#64748b;font-size:13px;">${t.levelLabel}</td>
          <td style="padding:4px 0;color:#1e293b;font-size:13px;font-weight:600;">${challenge.difficulty || challenge.level}</td>
        </tr>
      </table>
    </div>

    <p style="margin:0 0 6px;color:#1e293b;font-size:16px;font-weight:700;">${t.motivationTitle}</p>
    <p style="margin:0 0 28px;color:#475569;font-size:15px;line-height:1.6;">${t.motivationText}</p>

    <p style="margin:0 0 8px;color:#1e293b;font-size:17px;font-weight:700;">${t.callTitle}</p>
    <p style="margin:0 0 4px;color:#475569;font-size:15px;line-height:1.6;">${t.callText}</p>

    ${ctaButton(CALENDLY, t.callBtn)}

    <p style="margin:32px 0 4px;color:#475569;font-size:15px;">${t.closing}</p>
    <p style="margin:0;color:#1e293b;font-size:15px;font-weight:700;">Iulian Bofu</p>
  `;
  return { subject: t.subject, html: baseWrapper(body) };
}

export function buildReservationEmail(lang, data, forAdmin = false) {
  const t = i18n.reservation[lang] || i18n.reservation.en;
  const subject = forAdmin ? t.subjectAdmin : t.subjectClient;
  const name = data.participant_name || '';
  const deposit = data.total_estimate ? Math.round(data.total_estimate * 0.3) : '-';

  const body = `
    <p style="margin:0 0 8px;color:#334155;font-size:16px;font-weight:600;">${t.greeting}${name ? ' ' + name.split(' ')[0] : ''},</p>
    <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">${t.intro}</p>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin:0 0 28px;">
      <p style="margin:0 0 16px;color:#1e293b;font-size:15px;font-weight:700;">${t.detailsTitle}</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${[
          [t.nameLabel, data.participant_name],
          [t.emailLabel, data.participant_email],
          [t.phoneLabel, data.participant_phone],
          [t.locationLabel, data.camp_location],
          [t.roomLabel, data.room_type],
          [t.tierLabel, data.pricing_tier],
          [t.totalLabel, data.total_estimate ? `€${data.total_estimate}` : '-'],
          [t.depositLabel, `€${deposit}`],
        ].map(([label, val]) => `
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:13px;width:45%;vertical-align:top;">${label}</td>
            <td style="padding:6px 0;color:#1e293b;font-size:13px;font-weight:600;">${val || '-'}</td>
          </tr>
        `).join('')}
      </table>
    </div>

    ${!forAdmin ? `
    <p style="margin:0 0 12px;color:#1e293b;font-size:16px;font-weight:700;">${t.nextTitle}</p>
    <ul style="margin:0 0 28px;padding-left:20px;">
      ${t.nextSteps.map(s => `<li style="color:#475569;font-size:14px;line-height:1.8;margin-bottom:4px;">${s}</li>`).join('')}
    </ul>
    ` : ''}

    <p style="margin:0 0 8px;color:#1e293b;font-size:17px;font-weight:700;">${t.callTitle}</p>
    <p style="margin:0 0 4px;color:#475569;font-size:15px;line-height:1.6;">${t.callText}</p>

    ${ctaButton(CALENDLY, t.callBtn)}

    <p style="margin:32px 0 4px;color:#475569;font-size:15px;">${t.closing}</p>
    <p style="margin:0;color:#1e293b;font-size:15px;font-weight:700;">Iulian Bofu</p>
  `;
  return { subject, html: baseWrapper(body) };
}
