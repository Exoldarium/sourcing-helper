import express from 'express';
import { parseError } from '../../utils/parsingHelpers';
import { deleteSession } from '../queries/sessionQuery';

const logoutRouter = express.Router();

logoutRouter.get('/', async (req, res) => {
  const user = req.session.user;

  if (!user) return res.status(400).send('Already logged out');

  await deleteSession(req.sessionID);

  req.session.destroy((err) => {
    if (err) {
      const error = parseError(err);

      throw Error(error);
    }
  });

  return res.status(200).end();
});

export { logoutRouter };