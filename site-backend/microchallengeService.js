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

export async function sendMicrochallengeEmail({ adminEmail, clientEmail, subject, html }) {
  const transporter = getTransporter();

  await transporter.sendMail({ from: FROM, to: clientEmail, subject, html });

  if (adminEmail) {
    await transporter.sendMail({ from: FROM, to: adminEmail, subject: subject + ' (Admin Copy)', html });
  }
}
