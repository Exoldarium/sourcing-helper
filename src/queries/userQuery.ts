import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { NewUser, UpdateUserRegular } from '../types/types';

// TODO: getUsers and getUser should show roles for that user

const getUsers = async () => {
  try {
    const users = await db.selectFrom('users')
      .select(['email', 'user_id', 'name'])
      .execute();

    return users;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.selectFrom('users')
      .where('email', '=', email)
      .select([
        'user_id',
        'email',
        'name',
        'password_hash',
        'admin',
        'disabled',
        'created_on',
      ])
      .executeTakeFirst();

    if (!user) throw new Error('User not found');

    return user;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const getSpecificUser = async (id: string) => {
  try {
    const user = await db.selectFrom('users')
      .where('user_id', '=', id)
      .select([
        'user_id',
        'email',
        'name'
      ])
      .executeTakeFirst();

    if (!user) throw new Error('User not found');

    return user;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const insertUser = async (user: NewUser) => {
  try {
    const newUser = await db.insertInto('users')
      .values(user)
      .returning([
        'user_id',
        'email',
        'name',
        'password_hash',
        'admin',
        'disabled',
        'created_on',
      ])
      .execute();

    if (!newUser) throw new Error('User not found');

    return newUser[0];
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const updateUser = async (user: UpdateUserRegular, id: string) => {
  const { name, email } = user;

  try {
    const updatedUser = await db.updateTable('users')
      .set({
        name,
        email
      })
      .where('user_id', '=', id)
      .returning([
        'user_id',
        'email',
        'name',
        'password_hash',
        'admin',
        'disabled',
        'created_on',
      ])
      .executeTakeFirst();

    if (!updatedUser) throw new Error('User not found');

    return updatedUser;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

export {
  getUsers,
  getUserByEmail,
  getSpecificUser,
  insertUser,
  updateUser
};