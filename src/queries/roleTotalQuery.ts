import { toExistingRoleEntry } from '../../utils/parseRoleData';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { CreateNewRole, NewRole, RoleWithoutUserId } from '../types/types';

// TODO: figure out how to update the roles_total table and not create problems when we log each update 
// because we if we don't allow PUT on roles_total we won't be able to reverse a mistake if it gets submitted
// we can try having a table that will just log the updates and we PUT on the roles_total
// the update table should have role_id, user_id and the time it was updated
// when we need to find the updated dates we could just join all tables

const getAllRoles = async (): Promise<RoleWithoutUserId[]> => {
  try {
    // TODO: fix this innerJoin
    const roles = await db.selectFrom('roles_total')
      .innerJoin('users', 'users.user_id', 'roles_total.user_id')
      .selectAll('roles_total')
      .select('email')
      .execute();

    console.log(roles);

    return roles.map(toExistingRoleEntry);
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const getSpecificRole = async (id: string): Promise<RoleWithoutUserId> => {
  try {
    const role = await db.selectFrom('roles_total')
      .where('role_id', '=', id)
      .selectAll()
      .executeTakeFirst();

    return toExistingRoleEntry(role);
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const createRole = async (role: CreateNewRole): Promise<RoleWithoutUserId[]> => {
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
      .returningAll()
      .execute();

    return roles.map(toExistingRoleEntry);
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

export {
  getAllRoles,
  createRole,
  getSpecificRole
};