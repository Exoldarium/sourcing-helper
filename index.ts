import express from 'express';
import session from 'express-session';
import { PORT, SESSION } from './utils/config';
import { userRouter } from './src/routes/userRouter';
import { loginrouter } from './src/routes/loginRouter';
import { logoutRouter } from './src/routes/logoutRouter';

const app = express();

app.use(express.json());
app.use(session(SESSION));

app.use('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/users', userRouter);
app.use('/api/login', loginrouter);
app.use('/api/logout', logoutRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});