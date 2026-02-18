import { Resend } from 'resend';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendReservationEmail({ adminEmail, clientEmail, subject, html }) {
  const resend = getResend();

  await resend.emails.send({
    from: 'Rhythm of Leaders <iulian@rhythmofleaders.pro>',
    to: adminEmail,
    subject,
    html
  });

  if (clientEmail) {
    await resend.emails.send({
      from: 'Rhythm of Leaders <iulian@rhythmofleaders.pro>',
      to: clientEmail,
      subject: subject + ' (Copy)',
      html
    });
  }
}
