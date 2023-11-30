import express from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { getUsers, insertUser } from '../queries/userQuery';
import { NewUser } from '../types/types';
import { getDate } from '../../utils/helpers';
import { parseError } from '../../utils/parsingHelpers';
import { toNewUserEntry } from '../../utils/parseUserData';
import { getSession } from '../queries/sessionQuery';

// TODO:
// the user session should be set to active while they are logged in
// if the cookie is expired and they are still active, refuse login
// revoked users should have their sessionid blacklisted (it should be hashed)

// https://gist.github.com/productioncoder/3d2f27753b5a952f23383334a25c2ed2
// https://levelup.gitconnected.com/expressjs-postgresql-session-store-ec987146f706

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  try {
    const user = req.session.user;
    const session = await getSession(req.sessionID);
    console.log(session);

    if (!user || !session) return res.status(404).send('Must be logged in to access this');

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

export { userRouter };