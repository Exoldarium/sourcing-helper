import express from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { getUsers, insertUser, updateUser } from '../queries/userQuery';
import { NewUser } from '../types/types';
import { getDate } from '../../utils/helpers';
import { toNewUserEntry, toUpdateUserEntry } from '../../utils/parseUserData';

// TODO: get specific user for normal users

const userRouter = express.Router();

userRouter.get('/', async (req, res, next) => {
  try {
    const currentUser = req.session.user;

    if (!currentUser) return res.status(405).send('Must be logged in to access this');

    const allUsers = await getUsers();

    return res.status(200).json(allUsers);
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

    const newUser: NewUser = {
      name: parseNewUser.name,
      email: parseNewUser.email,
      password_hash: passwordHash,
      user_id: uuidv4(),
      disabled: false,
      admin: false,
      created_on: getDate()
    };

    await insertUser(newUser);

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

    // user can only update his own info
    if (!(currentUser && currentUser.id === req.params.id)) return res.status(403).send('Not allowed');

    const parsedUserToUpdate = toUpdateUserEntry(req.body);

    const updatedUser = await updateUser(parsedUserToUpdate, currentUser.id);

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