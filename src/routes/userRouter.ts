import express from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { getUsers, insertUser, updateUser } from '../queries/userQuery';
import { NewUser } from '../types/types';
import { getDate } from '../../utils/helpers';
import { parseError } from '../../utils/parsingHelpers';
import { toNewUserEntry, toUpdateUserEntry } from '../../utils/parseUserData';
import { getSession } from '../queries/sessionQuery';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  try {
    const user = req.session.user;
    const session = await getSession(req.sessionID);

    if (!user || !session) return res.status(405).send('Must be logged in to access this');

    const allUsers = await getUsers();

    return res.status(200).json(allUsers);
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

userRouter.post('/create', async (req, res) => {
  try {
    const parseNewUser = toNewUserEntry(req.body);

    if (parseNewUser.password.length < 5) {
      return res.status(400).send('Invalid input: password must be at least 5 characters long');
    }

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

    const newUserRes = await insertUser(newUser);

    return res.status(201).json(newUserRes);
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

userRouter.put('/:id', async (req, res) => {
  try {
    const currentUser = req.session.user;

    if (!currentUser) return res.status(405).send('Must be logged in to do this');

    const parseUpdatedUser = toUpdateUserEntry(req.body);

    const updatedUser = await updateUser(currentUser.id, parseUpdatedUser.email, parseUpdatedUser.name);

    return res.status(200).send(updatedUser);
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

export { userRouter };