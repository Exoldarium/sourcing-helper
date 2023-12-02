import express from 'express';
import { deleteUser, getUserAdmin, getUsersAdmin, updateUserAdmin } from '../queries/adminQuery';
import { parseError } from '../../utils/parsingHelpers';
import { toUpdateUserEntryAdmin } from '../../utils/parseUserData';

const adminRouter = express.Router();

adminRouter.get('/users', async (req, res) => {
  try {
    const currentUser = req.session.user;
    const admin = req.session.admin;

    if (!(currentUser && admin)) return res.status(403).send('Not allowed');

    const allUsers = await getUsersAdmin();

    return res.status(200).json(allUsers);
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

adminRouter.put('/user/:id', async (req, res) => {
  try {
    const currentUser = req.session.user;
    const admin = req.session.admin;

    if (!(currentUser && admin)) return res.status(403).send('Not allowed');

    const findUser = await getUserAdmin(req.params.id);
    const parsedUser = toUpdateUserEntryAdmin(req.body);

    if (!findUser) return res.status(404).send('User not found');

    const updatedUser = await updateUserAdmin(parsedUser, findUser.user_id);

    return res.status(200).send(updatedUser);
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

adminRouter.delete('/user/:id', async (req, res) => {
  try {
    const currentUser = req.session.user;
    const admin = req.session.admin;

    if (!(currentUser && admin)) return res.status(403).send('Not allowed');

    const findUser = await getUserAdmin(req.params.id);

    if (!findUser) return res.status(404).send('User not found');

    await deleteUser(findUser.user_id);

    return res.status(204).end();
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

export { adminRouter };