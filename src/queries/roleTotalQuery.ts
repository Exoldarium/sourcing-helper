import { toExistingRoleEntry } from '../../utils/parseRoleData';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { CreateNewRole, NewRole, Role } from '../types/types';

const getAllRoles = async (): Promise<Role[]> => {
  try {
    const roles = await db.selectFrom('roles_total')
      .selectAll()
      .execute();

    return roles.map(toExistingRoleEntry);
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const getSpecificRole = async (id: string): Promise<Role> => {
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

const createRole = async (role: CreateNewRole): Promise<Role[]> => {
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