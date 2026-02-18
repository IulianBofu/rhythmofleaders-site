import nodemailer from 'nodemailer';

export async function sendGuideEmail({ clientEmail, subject, html }) {
  const port = Number(process.env.SMTP_PORT);
  const isSecure = port === 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: isSecure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  await transporter.sendMail({
    from: `Rhythm of Leaders <${process.env.SMTP_USER}>`,
    to: clientEmail,
    subject,
    html
  });
}