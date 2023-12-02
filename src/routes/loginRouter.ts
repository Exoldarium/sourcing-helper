import express from 'express';
import bcrypt from 'bcrypt';
import { toUserLoginEntry } from '../../utils/parseUserData';
import { getUser } from '../queries/userQuery';
import { parseError } from '../../utils/parsingHelpers';

const loginrouter = express.Router();

loginrouter.post('/', async (req, res) => {
  try {
    const { email, password } = toUserLoginEntry(req.body);
    console.log(email);

    if (req.session.user) return res.status(400).send('Already logged in');

    const user = await getUser(email);

    const validatePassword = user === undefined ? false : await bcrypt.compare(password, user.password_hash);

    if (!(user && validatePassword)) return res.status(400).send('Invalid e-mail or password');

    const loggedUser = {
      email: user.email,
      id: user.user_id,
    };

    req.session.user = loggedUser;
    req.session.admin = user.admin;

    return res.status(200).send(loggedUser);
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

export { loginrouter };