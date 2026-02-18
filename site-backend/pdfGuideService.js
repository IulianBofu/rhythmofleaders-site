import { Resend } from 'resend';

export async function sendGuideEmail({ clientEmail, subject, html }) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'Rhythm of Leaders <iulian@rhythmofleaders.pro>',
    to: clientEmail,
    subject,
    html
  });
}
