import express from 'express';
import { getUser } from '../queries/userQuery';
import { getUsersAdmin } from '../queries/adminQuery';
import { parseError } from '../../utils/parsingHelpers';

const adminRouter = express.Router();

adminRouter.get('/users', async (req, res) => {
  try {
    const user = req.session.user;

    if (!user) return res.status(405).send('Must be logged in to access this');

    const findUser = await getUser(user.email);

    if (findUser && !findUser.admin) return res.status(403).send('Not allowed');

    const users = await getUsersAdmin();

    return res.status(200).json(users);
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

export { adminRouter };