import express from 'express';
import { getUsers, insertUser } from '../queries/userQuery';
import { v4 as uuidv4 } from 'uuid';
import { NewUser } from '../types';
import { getDate } from '../../utils/helpers';
import { parseError } from '../../utils/parsingHelpers';
import { toNewUserentry } from '../../utils/parseUserData';

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
    const parseNewUser = toNewUserentry(req.body);

    const newUser: NewUser = {
      ...parseNewUser,
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