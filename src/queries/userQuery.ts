import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { NewUser } from '../types/types';

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

const getUser = async (email: string) => {
  try {
    return await db.selectFrom('users')
      .where('email', '=', email)
      .selectAll()
      .executeTakeFirst();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const insertUser = async (user: NewUser) => {
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

const updateUser = async (id: string, email: string, name: string) => {
  try {
    return await db.updateTable('users')
      .set({
        name,
        email
      })
      .where('user_id', '=', id)
      .returningAll()
      .executeTakeFirst();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const getAdmin = async (id: string) => {
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

export {
  getUsers,
  getUser,
  insertUser,
  updateUser,
  getAdmin,
};