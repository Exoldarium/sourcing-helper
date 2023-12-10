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
            .innerJoin('role_log', 'role_log.role_id', 'roles_total.role_id')
            .select(({ fn }) => [
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
            .innerJoin('role_log', 'role_log.role_id', 'roles_total.role_id')
            .select(({ fn }) => [
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