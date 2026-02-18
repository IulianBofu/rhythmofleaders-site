import nodemailer from 'nodemailer';

function getTransport() {
  const port = Number(process.env.SMTP_PORT);
  const isSecure = port === 465;
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

export async function sendMicrochallengeEmail({ adminEmail, clientEmail, subject, html }) {
  const transporter = getTransport();

  // Send to client
  await transporter.sendMail({
    from: `Rhythm of Leaders <${process.env.SMTP_USER}>`,
    to: clientEmail,
    subject,
    html
  });

  // Send copy to admin (optional)
  if (adminEmail) {
    await transporter.sendMail({
      from: `Rhythm of Leaders <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: subject + ' (Admin Copy)',
      html
    });
  }
}
