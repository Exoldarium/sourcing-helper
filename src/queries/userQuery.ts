import { toExistingUserEntry } from '../../utils/parseUserData';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { NewUser, UpdateUserRegular, User, UserRegular } from '../types/types';

const getUsers = async (): Promise<UserRegular[]> => {
  try {
    return await db.selectFrom('users')
      .select(['email', 'user_id', 'name'])
      .execute();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const getUserByEmail = async (email: string): Promise<User> => {
  try {
    const user = await db.selectFrom('users')
      .where('email', '=', email)
      .selectAll()
      .executeTakeFirst();

    console.log(user?.created_on);

    const parsedUser = toExistingUserEntry(user);
    return parsedUser;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const insertUser = async (user: NewUser): Promise<User[]> => {
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

const updateUser = async (user: UpdateUserRegular, id: string): Promise<User> => {
  const { name, email } = user;

  try {
    const updatedUser = await db.updateTable('users')
      .set({
        name,
        email
      })
      .where('user_id', '=', id)
      .returningAll()
      .executeTakeFirst();

    return toExistingUserEntry(updatedUser);
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

export {
  getUsers,
  getUserByEmail,
  insertUser,
  updateUser
};