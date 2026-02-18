import { Resend } from 'resend';

export async function sendMicrochallengeEmail({ adminEmail, clientEmail, subject, html }) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Rhythm of Leaders <iulian@rhythmofleaders.pro>',
    to: clientEmail,
    subject,
    html
  });

  if (adminEmail) {
    await resend.emails.send({
      from: 'Rhythm of Leaders <iulian@rhythmofleaders.pro>',
      to: adminEmail,
      subject: subject + ' (Admin Copy)',
      html
    });
  }
}
