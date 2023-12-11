import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { UpdateUserAdmin } from '../types/types';

const getUsersAdmin = async () => {
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
            .groupBy([
              'roles_total.created_on',
              'roles_total.permission',
              'roles_total.role_id',
              'roles_total.role_name',
              'roles_total.user_id'
            ])
            .innerJoin('role_log', 'role_log.role_id', 'roles_total.role_id')
            .select(({ fn }) => [
              'roles_total.created_on',
              'roles_total.permission',
              'roles_total.role_id',
              'roles_total.role_name',
              'roles_total.user_id',
              fn.sum<number>('invitation').as('invitation'),
              fn.sum<number>('initial_contact').as('initial_contact'),
              fn.sum<number>('replied').as('replied'),
              fn.sum<number>('job_description').as('job_description'),
              fn.sum<number>('application_reviewed').as('application_reviewed'),
              fn.sum<number>('proposed').as('proposed'),
              fn.sum<number>('accepted').as('accepted'),
              fn.sum<number>('rejected').as('rejected'),
              fn.sum<number>('follow_up').as('follow_up')
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

const getUserAdmin = async (id: string) => {
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
            .groupBy([
              'roles_total.created_on',
              'roles_total.permission',
              'roles_total.role_id',
              'roles_total.role_name',
              'roles_total.user_id'
            ])
            .innerJoin('role_log', 'role_log.role_id', 'roles_total.role_id')
            .select(({ fn }) => [
              'roles_total.created_on',
              'roles_total.permission',
              'roles_total.role_id',
              'roles_total.role_name',
              'roles_total.user_id',
              fn.sum<number>('invitation').as('invitation'),
              fn.sum<number>('initial_contact').as('initial_contact'),
              fn.sum<number>('replied').as('replied'),
              fn.sum<number>('job_description').as('job_description'),
              fn.sum<number>('application_reviewed').as('application_reviewed'),
              fn.sum<number>('proposed').as('proposed'),
              fn.sum<number>('accepted').as('accepted'),
              fn.sum<number>('rejected').as('rejected'),
              fn.sum<number>('follow_up').as('follow_up')
            ])
            .whereRef('roles_total.user_id', '=', 'users.user_id')
        ).as('role')
      ])
      .executeTakeFirstOrThrow();

    return user;
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

const updateUserAdmin = async (user: UpdateUserAdmin, id: string) => {
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
      .executeTakeFirstOrThrow();

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
      .executeTakeFirstOrThrow();
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