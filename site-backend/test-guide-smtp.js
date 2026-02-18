import 'dotenv/config';
import { sendGuideEmail } from './pdfGuideService.js';

(async () => {
  try {
    await sendGuideEmail({
      clientEmail: 'bofu.iulian@outlook.com',
      subject: 'Test PDF Guide SMTP',
      html: '<h2>Test PDF Guide SMTP</h2><p>Acesta este un test pentru trimiterea ghidului PDF prin backend SMTP OVH.</p><a href="https://rhythmofleaders.com/guide">Descarcă PDF</a>'
    });
    console.log('Email PDF Guide trimis cu succes!');
  } catch (err) {
    console.error('Eroare la trimitere email PDF Guide:', err);
  }
})();
