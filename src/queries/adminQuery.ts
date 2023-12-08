import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { UpdateUserAdmin, User, UserWithRoles } from '../types/types';

// TODO: no need to parse anything, just get the data we need from the db
// use select() or return() instead of selectAll() and returningAll(), do this for all of the queries

const getUsersAdmin = async (): Promise<UserWithRoles[]> => {
  try {
    const users = await db.selectFrom('users')
      .select((eb) => [
        'user_id',
        'email',
        'name',
        'users.created_on',
        'admin',
        'disabled',
        'password_hash',
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
    throw new Error(error);
  }
};

const getUserAdmin = async (id: string): Promise<UserWithRoles> => {
  try {
    const user = await db.selectFrom('users')
      .where('user_id', '=', id)
      .select((eb) => [
        'user_id',
        'email',
        'name',
        'users.created_on',
        'admin',
        'disabled',
        'password_hash',
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

    return user[0];
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
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

    if (!user) throw new Error('User not found');

    return user;
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

const deleteUser = async (id: string) => {
  try {
    return await db.deleteFrom('users')
      .where('user_id', '=', id)
      .executeTakeFirst();
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

export {
  getUsersAdmin,
  getUserAdmin,
  updateUserAdmin,
  deleteUser
};