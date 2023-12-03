import express from 'express';
import { deleteUser, getUserAdmin, getUsersAdmin, updateUserAdmin } from '../queries/adminQuery';
import { parseError } from '../../utils/parsingHelpers';
import { toUpdateUserEntryAdmin } from '../../utils/parseUserData';
import { blacklistUser, getBlacklistedUsers, removeUserFromBlacklist } from '../queries/blacklistQuery';

const adminRouter = express.Router();

adminRouter.get('/users', async (req, res) => {
  try {
    const currentUser = req.session.user;
    const admin = req.session.admin;
    const userDisabled = req.session.disabled;

    if (!(currentUser && admin) || userDisabled) return res.status(403).send('Not allowed');

    const allUsers = await getUsersAdmin();

    return res.status(200).json(allUsers);
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

adminRouter.get('/blacklist', async (req, res) => {
  try {
    const currentUser = req.session.user;
    const admin = req.session.admin;
    const userDisabled = req.session.disabled;

    if (!(currentUser && admin) || userDisabled) return res.status(403).send('Not allowed');

    const blacklistedUsers = await getBlacklistedUsers();

    return res.status(200).send(blacklistedUsers);
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

adminRouter.put('/user/:id', async (req, res) => {
  try {
    const currentUser = req.session.user;
    const admin = req.session.admin;
    const userDisabled = req.session.disabled;

    if (!(currentUser && admin) || userDisabled) return res.status(403).send('Not allowed');

    const findUser = await getUserAdmin(req.params.id);
    const parsedUser = toUpdateUserEntryAdmin(req.body);

    if (!findUser) return res.status(404).send('User not found');

    const updatedUser = await updateUserAdmin(parsedUser, findUser.user_id);

    // disabled users are blacklisted
    if (updatedUser?.disabled) {
      await blacklistUser(updatedUser.user_id, updatedUser.email);
    }

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
    const userDisabled = req.session.disabled;

    if (!(currentUser && admin) || userDisabled) return res.status(403).send('Not allowed');

    const findUser = await getUserAdmin(req.params.id);

    if (!findUser) return res.status(404).send('User not found');

    await deleteUser(findUser.user_id);

    return res.status(204).end();
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

adminRouter.delete('/blacklist/:id', async (req, res) => {
  try {
    const currentUser = req.session.user;
    const admin = req.session.admin;
    const userDisabled = req.session.disabled;

    if (!(currentUser && admin) || userDisabled) return res.status(403).send('Not allowed');

    const findUser = await getUserAdmin(req.params.id);

    if (!findUser) return res.status(404).send('User not found');

    await removeUserFromBlacklist(findUser.user_id);

    const activatedUser = {
      ...findUser,
      disabled: false,
    };

    await updateUserAdmin(activatedUser, findUser.user_id);

    return res.status(200).end();
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

export { adminRouter };