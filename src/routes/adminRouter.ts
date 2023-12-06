import express from 'express';
import { deleteUser, getUserAdmin, getUsersAdmin, updateUserAdmin } from '../queries/adminQuery';
import { toUpdateUserEntryAdmin } from '../../utils/parseUserData';
import { blacklistUser, getBlacklistedUsers, getSpecificBlacklistedUser, removeUserFromBlacklist } from '../queries/blacklistQuery';
import { User } from '../types/types';

const adminRouter = express.Router();

adminRouter.get('/users', async (_req, res, next) => {
  try {
    const allUsers = await getUsersAdmin();

    return res.status(200).send(allUsers);
  } catch (err) {
    return next(err);
  }
});

adminRouter.get('/users/:id', async (req, res, next) => {
  try {
    const user = await getUserAdmin(req.params.id);

    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
});

adminRouter.get('/blacklist', async (_req, res, next) => {
  try {
    const blacklistedUsers = await getBlacklistedUsers();

    return res.status(200).send(blacklistedUsers);
  } catch (err) {
    return next(err);
  }
});

adminRouter.get('/blacklist/:id', async (req, res, next) => {
  try {
    const blacklistedUser = await getSpecificBlacklistedUser(req.params.id);

    return res.status(200).send(blacklistedUser);
  } catch (err) {
    return next(err);
  }
});

adminRouter.put('/users/:id', async (req, res, next) => {
  try {
    const findUser = await getUserAdmin(req.params.id);
    const parsedUser = toUpdateUserEntryAdmin(req.body);

    const updatedUser = await updateUserAdmin(parsedUser, findUser.user_id);

    // disabled users are blacklisted
    if (updatedUser.disabled) {
      await blacklistUser(updatedUser.user_id, updatedUser.email);
    }

    return res.status(200).send(updatedUser);
  } catch (err) {
    return next(err);
  }
});

adminRouter.delete('/users/:id', async (req, res, next) => {
  try {
    const findUser = await getUserAdmin(req.params.id);

    await deleteUser(findUser.user_id);

    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

adminRouter.delete('/blacklist/:id', async (req, res, next) => {
  try {
    const findUser = await getUserAdmin(req.params.id);

    await removeUserFromBlacklist(findUser.user_id);

    const activatedUser: User = {
      ...findUser,
      disabled: false
    };

    await updateUserAdmin(activatedUser, findUser.user_id);

    return res.status(200).end();
  } catch (err) {
    return next(err);
  }
});

export { adminRouter };