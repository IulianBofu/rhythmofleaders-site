// Simple email sender using nodemailer
import nodemailer from 'nodemailer';

function getTransport() {
  const port = Number(process.env.SMTP_PORT);
  const isSecure = port === 465;
  console.log('[SMTP DEBUG]', {
    host: process.env.SMTP_HOST,
    port,
    user: process.env.SMTP_USER,
    secure: isSecure
  });
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: isSecure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

export async function sendReservationEmail({ adminEmail, clientEmail, subject, html }) {
  const transporter = getTransport();

  // Send to admin
  await transporter.sendMail({
    from: `Rhythm of Leaders <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject,
    html
  });

  // Send copy to client
  if (clientEmail) {
    await transporter.sendMail({
      from: `Rhythm of Leaders <${process.env.SMTP_USER}>`,
      to: clientEmail,
      subject: subject + ' (Copy)',
      html
    });
  }
}
