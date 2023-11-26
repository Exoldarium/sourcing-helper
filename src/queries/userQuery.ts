import { db } from '../db';
import { NewUser } from '../types';

const getUsers = async () => {
  try {
    return await db.selectFrom('users')
      .selectAll()
      .execute();
  } catch (err) {
    console.log(err);
    throw new Error(`there was an error ${err}`);
  }
};

const insertUser = async (user: NewUser) => {
  console.log(user);
  try {
    return await db.insertInto('users')
      .values(user)
      .returningAll()
      .execute();
  } catch (err) {
    console.log(err);
    throw new Error(`there was an error ${err}`);
  }
};

export { getUsers, insertUser };