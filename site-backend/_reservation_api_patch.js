// Helper: read reservations.json
function readReservations() {
  const RESERVATIONS_PATH = path.join(process.cwd(), './reservations.json');
  if (!fs.existsSync(RESERVATIONS_PATH)) return [];
  const data = fs.readFileSync(RESERVATIONS_PATH, 'utf8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper: write reservations.json
function writeReservations(reservations) {
  const RESERVATIONS_PATH = path.join(process.cwd(), './reservations.json');
  fs.writeFileSync(RESERVATIONS_PATH, JSON.stringify(reservations, null, 2), 'utf8');
}

// POST /api/reservations
app.post('/api/reservations', (req, res) => {
  const reservations = readReservations();
  const newReservation = { ...req.body, id: Date.now() };
  reservations.push(newReservation);
  writeReservations(reservations);
  res.status(201).json(newReservation);
});
