import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { NewUser, UpdateUserRegular } from '../types/types';
import { sql } from 'kysely';

const getUsers = async () => {
  try {
    const users = await db.selectFrom('users')
      .select((eb) => [
        'user_id',
        'email',
        'name',
        jsonArrayFrom(
          eb.selectFrom('roles_total')
            .groupBy([
              'roles_total.role_name',
              'roles_total.role_id'
            ])
            .innerJoin('role_log', 'role_log.role_id', 'roles_total.role_id')
            .select(({ fn }) => [
              'roles_total.role_name',
              'roles_total.role_id',
              fn.coalesce(fn.sum<number | null>('invitation'), sql<number>`0`).as('invitation'),
              fn.coalesce(fn.sum<number | null>('initial_contact'), sql<number>`0`).as('initial_contact'),
              fn.coalesce(fn.sum<number | null>('replied'), sql<number>`0`).as('replied'),
              fn.coalesce(fn.sum<number | null>('job_description'), sql<number>`0`).as('job_description'),
              fn.coalesce(fn.sum<number | null>('application_reviewed'), sql<number>`0`).as('application_reviewed'),
              fn.coalesce(fn.sum<number | null>('proposed'), sql<number>`0`).as('proposed'),
              fn.coalesce(fn.sum<number | null>('accepted'), sql<number>`0`).as('accepted'),
              fn.coalesce(fn.sum<number | null>('rejected'), sql<number>`0`).as('rejected'),
              fn.coalesce(fn.sum<number | null>('follow_up'), sql<number>`0`).as('follow_up'),
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
            .groupBy([
              'roles_total.role_name',
              'roles_total.role_id'
            ])
            .innerJoin('role_log', 'role_log.role_id', 'roles_total.role_id')
            .select(({ fn }) => [
              'roles_total.role_name',
              'roles_total.role_id',
              fn.coalesce(fn.sum<number | null>('invitation'), sql<number>`0`).as('invitation'),
              fn.coalesce(fn.sum<number | null>('initial_contact'), sql<number>`0`).as('initial_contact'),
              fn.coalesce(fn.sum<number | null>('replied'), sql<number>`0`).as('replied'),
              fn.coalesce(fn.sum<number | null>('job_description'), sql<number>`0`).as('job_description'),
              fn.coalesce(fn.sum<number | null>('application_reviewed'), sql<number>`0`).as('application_reviewed'),
              fn.coalesce(fn.sum<number | null>('proposed'), sql<number>`0`).as('proposed'),
              fn.coalesce(fn.sum<number | null>('accepted'), sql<number>`0`).as('accepted'),
              fn.coalesce(fn.sum<number | null>('rejected'), sql<number>`0`).as('rejected'),
              fn.coalesce(fn.sum<number | null>('follow_up'), sql<number>`0`).as('follow_up'),
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