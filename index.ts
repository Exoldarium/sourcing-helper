import 'dotenv/config';
import express from 'express';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});