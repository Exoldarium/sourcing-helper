import express from 'express';
import { PORT } from './utils/config';
import { userRouter } from './src/routes/userRouter';

const app = express();
app.use(express.json());

app.use('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});