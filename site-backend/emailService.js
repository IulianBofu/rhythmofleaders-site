import nodemailer from 'nodemailer';

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const FROM = 'Rhythm of Leaders <iulian@rhythmofleaders.pro>';

export async function sendReservationEmail({ adminEmail, clientEmail, subject, html }) {
  const transporter = getTransporter();

  if (adminEmail) {
    await transporter.sendMail({ from: FROM, to: adminEmail, subject, html });
  }

  if (clientEmail) {
    await transporter.sendMail({ from: FROM, to: clientEmail, subject: subject + ' (Copy)', html });
  }
}
