import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { NewUser } from '../types';

const getUsers = async () => {
  try {
    return await db.selectFrom('users')
      .selectAll()
      .execute();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
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
    const error = parseError(err);
    throw Error(error);
  }
};

export { getUsers, insertUser };