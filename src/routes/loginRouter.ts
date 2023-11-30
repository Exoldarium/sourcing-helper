import express from 'express';
import bcrypt from 'bcrypt';
import { toUserLoginEntry } from '../../utils/parseUserData';
import { getUser } from '../queries/userQuery';
import { parseError } from '../../utils/parsingHelpers';
import { getSession } from '../queries/sessionQuery';

const loginrouter = express.Router();

loginrouter.post('/', async (req, res) => {
  try {
    const { email, password } = toUserLoginEntry(req.body);

    const session = await getSession(req.sessionID);

    // TODO: redirect the user to the home page if logged in
    if (session) return res.status(400).send('Already logged in');

    const user = await getUser(email);

    const validatePassword = user === undefined ? false : await bcrypt.compare(password, user.password_hash);

    if (!(user && validatePassword)) return res.status(400).send('Invalid e-mail or password');

    const loggedUser = {
      email: user.email,
      id: user.user_id
    };

    req.session.user = loggedUser;

    return res.status(200).send('You are logged in!');
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

export { loginrouter };