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

    // TODO: create blacklist table that holds user ids and block login

    const validatePassword = user === undefined ? false : await bcrypt.compare(password, user.password_hash);

    if (!(user && validatePassword)) return res.status(400).send('Invalid e-mail or password');
    if (user.disabled) return res.status(403).send('Not allowed');

    const loggedUser = {
      email: user.email,
      id: user.user_id,
    };

    req.session.user = loggedUser;
    req.session.admin = user.admin;
    req.session.disabled = user.disabled;

    return res.status(200).send(loggedUser);
  } catch (err) {
    const error = parseError(err);

    return res.status(400).send(error);
  }
});

export { loginrouter };