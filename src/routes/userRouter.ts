import express from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { getUsers, insertUser } from '../queries/userQuery';
import { NewUser } from '../types';
import { getDate } from '../../utils/helpers';
import { parseError } from '../../utils/parsingHelpers';
import { toNewUserEntry } from '../../utils/parseUserData';

const userRouter = express.Router();

userRouter.get('/', async (_req, res) => {
  try {
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
      ...parseNewUser,
      passwordHash,
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

export { userRouter };