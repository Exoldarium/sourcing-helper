import express from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { getSpecificUser, getUsers, insertUser, updateUser } from '../queries/userQuery';
import { NewUser } from '../types/types';
import { toNewUserEntry, toUpdateUserEntry } from '../../utils/parseUserData';
import { validateUser } from '../../utils/middleware';

const userRouter = express.Router();

userRouter.get('/', validateUser, async (_req, res, next) => {
  try {
    const allUsers = await getUsers();

    return res.status(200).json(allUsers);
  } catch (err) {
    return next(err);
  }
});

userRouter.get('/:id', validateUser, async (req, res, next) => {
  try {
    const user = await getSpecificUser(req.params.id);

    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
});

userRouter.post('/', async (req, res, next) => {
  try {
    const parseNewUser = toNewUserEntry(req.body);

    if (parseNewUser.password.length < 5)
      return res.status(400).send('Invalid input: password must be at least 5 characters long');

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(parseNewUser.password, saltRounds);

    const userToAdd: NewUser = {
      name: parseNewUser.name,
      email: parseNewUser.email,
      password_hash: passwordHash,
      user_id: uuidv4(),
      disabled: false,
      admin: false
    };

    const newUser = await insertUser(userToAdd);

    const createdUserToReturn = {
      id: newUser.user_id,
      email: newUser.email,
      name: newUser.name,
    };

    return res.status(201).json(createdUserToReturn);
  } catch (err) {
    return next(err);
  }
});

userRouter.put('/:id', async (req, res, next) => {
  try {
    const currentUser = req.session.user;
    const findUser = await getSpecificUser(req.params.id);

    if (!currentUser) return res.status(403).send('Must be logged in');
    // logged in user can only update his own info, admin can update everyone
    if (currentUser.user_id !== req.params.id && !req.session.admin) return res.status(403).send('Not allowed');

    const parsedUserToUpdate = toUpdateUserEntry(req.body);

    const updatedUser = await updateUser(parsedUserToUpdate, findUser.user_id);

    const updatedUserToReturn = {
      id: updatedUser.user_id,
      email: updatedUser.email,
      name: updatedUser.name,
    };

    return res.status(200).send(updatedUserToReturn);
  } catch (err) {
    return next(err);
  }
});

export { userRouter };