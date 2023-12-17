import express from 'express';
import bcrypt from 'bcrypt';
import { toUserLoginEntry } from '../../utils/parseUserData';
import { getUserByEmail } from '../queries/userQuery';

const loginrouter = express.Router();

loginrouter.post('/', async (req, res, next) => {
  try {
    const { email, password } = toUserLoginEntry(req.body);

    if (req.session.user) return res.status(400).send('Already logged in');

    const user = await getUserByEmail(email);

    const validatePassword = await bcrypt.compare(password, user.password_hash);

    if (!validatePassword) return res.status(400).send('Invalid e-mail or password');
    if (user.disabled) return res.status(403).send('Not allowed'); // if user is blacklisted, prohibit login

    const loggedUser = {
      email: user.email,
      user_id: user.user_id,
    };

    req.session.user = loggedUser;
    req.session.admin = user.admin;
    req.session.disabled = user.disabled;

    return res.status(200).send({ ...loggedUser, name: user.name });
  } catch (err) {
    return next(err);
  }
});

export { loginrouter };