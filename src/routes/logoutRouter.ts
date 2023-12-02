import express from 'express';
import { parseError } from '../../utils/parsingHelpers';

const logoutRouter = express.Router();

logoutRouter.get('/', (req, res) => {
  const user = req.session.user;

  if (!user) return res.status(400).send('Already logged out');

  req.session.destroy((err) => {
    if (err) {
      const error = parseError(err);

      throw Error(error);
    }
  });

  return res.status(200).end();
});

export { logoutRouter };