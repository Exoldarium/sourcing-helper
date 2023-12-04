import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { PORT, SESSION } from './utils/config';
import { userRouter } from './src/routes/userRouter';
import { loginrouter } from './src/routes/loginRouter';
import { logoutRouter } from './src/routes/logoutRouter';
import { adminRouter } from './src/routes/adminRouter';
import { handleError, validateAdmin, validateUser } from './utils/middleware';
import { rolesTotalRouter } from './src/routes/rolesTotalRouter';

const app = express();

app.use(express.json());
app.use(session(SESSION));

app.use('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/login', loginrouter);
app.use('/api/admin', validateAdmin, adminRouter);
app.use('/api/users', validateUser, userRouter);
app.use('/api/roles', rolesTotalRouter);
app.use('/api/logout', logoutRouter);

app.use((error: Error, _req: Request, res: Response, next: NextFunction) => {
  handleError(error, res, next);
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});