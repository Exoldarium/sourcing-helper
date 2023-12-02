import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { UpdateUserAdmin } from '../types/types';

const checkAdmin = async (id: string) => {
  try {
    return await db.selectFrom('users')
      .where('user_id', '=', id)
      .where('admin', '=', true)
      .selectAll()
      .execute();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const getUsersAdmin = async () => {
  try {
    return await db.selectFrom('users')
      .selectAll('users')
      .execute();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const getUserAdmin = async (id: string) => {
  try {
    return await db.selectFrom('users')
      .where('user_id', '=', id)
      .selectAll()
      .executeTakeFirst();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const updateUserAdmin = async (user: UpdateUserAdmin, id: string) => {
  const { name, email, disabled, admin } = user;

  try {
    return await db.updateTable('users')
      .set({
        name,
        email,
        admin,
        disabled
      })
      .where('user_id', '=', id)
      .returningAll()
      .executeTakeFirst();
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
  checkAdmin,
  deleteUser
};