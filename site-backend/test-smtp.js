
import 'dotenv/config';
import { sendMicrochallengeEmail } from './microchallengeService.js';

(async () => {
  try {
    await sendMicrochallengeEmail({
      adminEmail: 'iulian@rhythmofleaders.pro',
      clientEmail: 'dot4line@gmail.com',
      subject: 'Test SMTP OVH',
      html: '<h2>Test SMTP OVH</h2><p>Dacă vezi acest email, trimiterea funcționează!</p>'
    });
    console.log('Email trimis cu succes!');
  } catch (err) {
    console.error('Eroare la trimitere email:', err);
  }
})();
