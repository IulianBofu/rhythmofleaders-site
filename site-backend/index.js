import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import basicAuth from 'express-basic-auth';
import { sendGuideEmail } from './pdfGuideService.js';
import { sendMicrochallengeEmail } from './microchallengeService.js';
import { sendReservationEmail } from './emailService.js';

const app = express();
app.use(cors({
  origin: [
    'http://rhythmofleaders.pro',
    'https://rhythmofleaders.pro',
    'http://www.rhythmofleaders.pro',
    'https://www.rhythmofleaders.pro',
    'http://localhost:5173',
    'http://localhost:4173',
  ],
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));

const PORT = process.env.PORT || 4000;
const ADMIN_PASSWORD = 'Panzer89$$$';
const POSTS_PATH = path.join(process.cwd(), 'posts.json');

// Simple admin auth (username: admin, password: ADMIN_PASSWORD)
const adminAuth = basicAuth({
  users: { 'admin': ADMIN_PASSWORD },
  challenge: true,
  unauthorizedResponse: 'Unauthorized',
});

// PDF Guide API
app.post('/api/guide', async (req, res) => {
  const { email, lang } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });
  const subject = lang === 'ro' ? 'Ghidul tău: 5 Hack-uri de Energie' : lang === 'fr' ? 'Votre guide: 5 Astuces Énergie' : 'Your Guide: 5 Energy Hacks';
  const guideUrl = 'https://rhythmofleaders.com/guide';
  const html = `
    <h2>${subject}</h2>
    <p>Salut!</p>
    <p>Poți descărca ghidul PDF de aici:</p>
    <a href="${guideUrl}" style="font-size:1.2em;color:#0d9488;">Descarcă PDF</a>
    <p>Dacă ai întrebări, răspunde direct la acest email.</p>
    <hr />
    <p>Rhythm of Leaders</p>
  `;
  try {
    await sendGuideEmail({ clientEmail: email, subject, html });
    res.json({ ok: true });
  } catch (err) {
    console.error('Guide email error:', err);
    res.status(500).json({ error: 'Failed to send guide email' });
  }
});

// POST /api/microchallenge
app.post('/api/microchallenge', async (req, res) => {
  const { email, lang, challenge } = req.body;
  if (!email || !challenge) return res.status(400).json({ error: 'Missing email or challenge' });

  const adminEmail = 'iulian@rhythmofleaders.pro';
  const clientEmail = email;
  const subject = lang === 'ro' ? 'Provocarea ta personalizată' : lang === 'fr' ? 'Votre défi personnalisé' : 'Your Personalized Challenge';
  const html = `
    <h2>${subject}</h2>
    <p><b>Challenge:</b> ${challenge.title || challenge.challenge}</p>
    <p><b>Description:</b> ${challenge.description || challenge.challenge}</p>
    <p><b>Timeframe:</b> ${challenge.timeframe || challenge.duration}</p>
    <p><b>Level:</b> ${challenge.difficulty || challenge.level}</p>
    <p><a href='https://calendly.com/iulian-cyberbuildsolutions/30min?back=1'>Book a free call</a></p>
    <hr />
    <p>This is an automated message from Rhythm of Leaders.</p>
  `;
  try {
    await sendMicrochallengeEmail({ adminEmail, clientEmail, subject, html });
    res.json({ ok: true });
  } catch (err) {
    console.error('Microchallenge email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Helper: read posts.json
function readPosts() {
  if (!fs.existsSync(POSTS_PATH)) return [];
  const data = fs.readFileSync(POSTS_PATH, 'utf8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper: write posts.json
function writePosts(posts) {
  fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2), 'utf8');
}

// GET all posts
app.get('/api/posts', (_req, res) => {
  res.json(readPosts());
});

// GET single post by id
app.get('/api/posts/:id', (req, res) => {
  const posts = readPosts();
  const post = posts.find(p => String(p.id) === String(req.params.id));
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

// CREATE post (admin)
app.post('/api/posts', adminAuth, (req, res) => {
  const posts = readPosts();
  const newId = posts.length ? Math.max(...posts.map(p => Number(p.id) || 0)) + 1 : 1;
  const post = { ...req.body, id: newId };
  posts.push(post);
  writePosts(posts);
  res.status(201).json(post);
});

// UPDATE post (admin)
app.put('/api/posts/:id', adminAuth, (req, res) => {
  const posts = readPosts();
  const idx = posts.findIndex(p => String(p.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  posts[idx] = { ...posts[idx], ...req.body };
  writePosts(posts);
  res.json(posts[idx]);
});

// DELETE post (admin)
app.delete('/api/posts/:id', adminAuth, (req, res) => {
  let posts = readPosts();
  const idx = posts.findIndex(p => String(p.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const [deleted] = posts.splice(idx, 1);
  writePosts(posts);
  res.json(deleted);
});

// Export posts.json (admin)
app.get('/api/posts-export', adminAuth, (_req, res) => {
  res.download(POSTS_PATH, 'posts.json');
});

// Import posts.json (admin, file upload)
const upload = multer({ dest: 'uploads/' });
app.post('/api/posts-import', adminAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const data = fs.readFileSync(req.file.path, 'utf8');
  try {
    const posts = JSON.parse(data);
    writePosts(posts);
    fs.unlinkSync(req.file.path);
    res.json({ success: true, count: posts.length });
  } catch {
    fs.unlinkSync(req.file.path);
    res.status(400).json({ error: 'Invalid JSON' });
  }
});


// --- Reservation API ---
const RESERVATIONS_PATH = path.join(process.cwd(), './reservations.json');

function readReservations() {
  if (!fs.existsSync(RESERVATIONS_PATH)) return [];
  const data = fs.readFileSync(RESERVATIONS_PATH, 'utf8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeReservations(reservations) {
  fs.writeFileSync(RESERVATIONS_PATH, JSON.stringify(reservations, null, 2), 'utf8');
}

// POST /api/reservations
app.post('/api/reservations', async (req, res) => {
  const reservations = readReservations();
  const newReservation = { ...req.body, id: Date.now() };
  reservations.push(newReservation);
  writeReservations(reservations);

  // Prepare email content
  const adminEmail = 'iulian@rhythmofleaders.pro';
  const clientEmail = newReservation.participant_email;
  const subject = 'New Retreat Reservation - Rhythm of Leaders';
  const html = `
    <h2>New Reservation Received</h2>
    <p><b>Name:</b> ${newReservation.participant_name}</p>
    <p><b>Email:</b> ${newReservation.participant_email}</p>
    <p><b>Phone:</b> ${newReservation.participant_phone}</p>
    <p><b>Location:</b> ${newReservation.camp_location}</p>
    <p><b>Room Type:</b> ${newReservation.room_type}</p>
    <p><b>Pricing Tier:</b> ${newReservation.pricing_tier}</p>
    <p><b>Extras:</b> ${(newReservation.extras || []).join(', ')}</p>
    <p><b>Total Estimate:</b> €${newReservation.total_estimate}</p>
    <p><b>Status:</b> ${newReservation.status}</p>
    <p><b>Payment Status:</b> ${newReservation.payment_status}</p>
    <p><b>Notes:</b> ${newReservation.notes}</p>
    <hr />
    <p>This is an automated notification from Rhythm of Leaders.</p>
  `;
  try {
    await sendReservationEmail({ adminEmail, clientEmail, subject, html });
  } catch (err) {
    console.error('Email send error:', err);
    // Don't block reservation creation if email fails
  }

  res.status(201).json(newReservation);
});

app.listen(PORT, () => {
  console.log(`Blog backend running on http://localhost:${PORT}`);
});
