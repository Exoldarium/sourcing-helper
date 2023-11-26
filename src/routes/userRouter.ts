/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { getUsers, insertUser } from '../queries/userQuery';
import { v4 as uuidv4 } from 'uuid';
import { NewUser } from '../types';

const userRouter = express.Router();

const id: string = uuidv4();

userRouter.get('/', async (_req, res) => {
  try {
    const allUsers = await getUsers();

    return res.status(200).json(allUsers);
  } catch (err) {
    return res.status(400).json({ err });
  }
});

userRouter.post('/create', async (req, res) => {
  try {
    const { name, email } = req.body;

    const newUser: NewUser = {
      name,
      email,
      user_id: id,
      disabled: false,
      admin: false,
      created_on: new Date()
    };

    const newUserRes = await insertUser(newUser);

    return res.status(201).json(newUserRes);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err });
  }
});

export { userRouter };