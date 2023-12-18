import express from 'express';
import { getSpecificUser } from '../queries/userQuery';

const loggedUser = express.Router();

loggedUser.get('/', async (req, res, next) => {
  try {
    const currentUser = req.session.user;

    if (!currentUser) return res.status(404).send('Logged in user not found');

    const findUser = await getSpecificUser(currentUser.user_id);

    return res.status(200).send({ ...currentUser, name: findUser.name });
  } catch (err) {
    return next(err);
  }
});

export { loggedUser };