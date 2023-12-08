import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { CreateNewRole, NewRole } from '../types/types';

// TODO: figure out how to update the roles_total table and not create problems when we log each update 
// because we if we don't allow PUT on roles_total we won't be able to reverse a mistake if it gets submitted
// we can try having a table that will just log the updates and we PUT on the roles_total
// the update table should have role_id, user_id and the time it was updated
// when we need to find the updated dates we could just join all tables

const getAllRoles = async () => {
  try {
    const roles = await db.selectFrom('roles_total')
      .innerJoin('users', 'users.user_id', 'roles_total.user_id')
      .select((eb) => [
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
        jsonArrayFrom(
          eb.selectFrom('users')
            .select([
              'user_id',
              'name'
            ])
            .whereRef('roles_total.user_id', '=', 'users.user_id')
        ).as('creator')
      ])
      .execute();

    return roles;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const getSpecificRole = async (id: string) => {
  try {
    const role = await db.selectFrom('roles_total')
      .innerJoin('users', 'users.user_id', 'roles_total.user_id')
      .where('role_id', '=', id)
      .select((eb) => [
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
        jsonArrayFrom(
          eb.selectFrom('users')
            .select([
              'user_id',
              'name'
            ])
            .whereRef('roles_total.user_id', '=', 'users.user_id')
        ).as('creator')
      ])
      .executeTakeFirstOrThrow();

    return role;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const createRole = async (role: CreateNewRole) => {
  const roleToInsert: NewRole = {
    ...role,
    invitation: 0,
    initial_contact: 0,
    replied: 0,
    job_description: 0,
    application_reviewed: 0,
    proposed: 0,
    accepted: 0,
    rejected: 0,
    follow_up: 0
  };

  try {
    const roles = await db.insertInto('roles_total')
      .values(roleToInsert)
      .returning([
        'user_id',
        'created_on',
        'role_id',
        'role_name',
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
      .executeTakeFirstOrThrow();

    return roles;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const deleteRole = async (id: string) => {
  try {
    return await db.deleteFrom('roles_total')
      .where('role_id', '=', id)
      .executeTakeFirstOrThrow();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

export {
  getAllRoles,
  createRole,
  getSpecificRole,
  deleteRole
};