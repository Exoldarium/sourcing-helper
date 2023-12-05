import { toExistingUserEntry } from '../../utils/parseUserData';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { UpdateUserAdmin, User } from '../types/types';

const getUsersAdmin = async (): Promise<User[]> => {
  try {
    const users = await db.selectFrom('users')
      .selectAll('users')
      .execute();

    return users.map(toExistingUserEntry);
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const getUserAdmin = async (id: string): Promise<User> => {
  try {
    const user = await db.selectFrom('users')
      .where('user_id', '=', id)
      .selectAll()
      .executeTakeFirst();

    return toExistingUserEntry(user);
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const updateUserAdmin = async (user: UpdateUserAdmin, id: string): Promise<User> => {
  const { name, email, disabled, admin } = user;

  try {
    const user = await db.updateTable('users')
      .set({
        name,
        email,
        admin,
        disabled
      })
      .where('user_id', '=', id)
      .returningAll()
      .executeTakeFirst();

    return toExistingUserEntry(user);
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const deleteUser = async (id: string) => {
  try {
    return await db.deleteFrom('users')
      .where('user_id', '=', id)
      .executeTakeFirst();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

export {
  getUsersAdmin,
  getUserAdmin,
  updateUserAdmin,
  deleteUser
};