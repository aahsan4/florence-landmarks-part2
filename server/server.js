import landmarkRoutes from './routes/landmarks.js';
import landmarks from './data/landmarks.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, '..', 'client');

const app = express();
const PORT = 3000;

app.use(express.static(publicPath));
app.use('/api/landmarks', landmarkRoutes);
app.get('/landmarks/:slug', (req, res) => {
  const exists = landmarks.some(l => l.slug === req.params.slug);
  if (!exists) {
    return res.status(404).sendFile(path.join(publicPath, '404.html'));
  }
  res.sendFile(path.join(publicPath, 'landmark.html'));
});
app.use((req, res) => {
  res.status(404).sendFile(path.join(publicPath, '404.html'));
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});