import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { NewUser, UpdateUserRegular } from '../types/types';

const getUsers = async () => {
  try {
    const users = await db.selectFrom('users')
      .select((eb) => [
        'user_id',
        'email',
        'name',
        jsonArrayFrom(
          eb.selectFrom('roles_total')
            .select([
              'role_id',
              'role_name',
              'roles_total.created_on',
              'permission',
              'invitation',
              'initial_contact',
              'replied',
              'job_description',
              'application_reviewed',
              'proposed',
              'accepted',
              'rejected',
              'follow_up',
            ])
            .whereRef('roles_total.user_id', '=', 'users.user_id')
        ).as('role')
      ])
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
      .executeTakeFirstOrThrow();

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
      .select((eb) => [
        'user_id',
        'email',
        'name',
        jsonArrayFrom(
          eb.selectFrom('roles_total')
            .select([
              'role_id',
              'role_name',
              'roles_total.created_on',
              'permission',
              'invitation',
              'initial_contact',
              'replied',
              'job_description',
              'application_reviewed',
              'proposed',
              'accepted',
              'rejected',
              'follow_up',
            ])
            .whereRef('roles_total.user_id', '=', 'users.user_id')
        ).as('role')
      ])
      .executeTakeFirstOrThrow();

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
      .executeTakeFirstOrThrow();

    return newUser;
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
      .executeTakeFirstOrThrow();

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