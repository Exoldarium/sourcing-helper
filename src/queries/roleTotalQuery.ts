import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { CreateNewRole, NewRole, Role } from '../types/types';

const getAllRoles = async (): Promise<Role[]> => {
  try {
    return await db.selectFrom('roles_total')
      .selectAll()
      .execute();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const createRole = async (role: CreateNewRole): Promise<NewRole[]> => {
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
    return await db.insertInto('roles_total')
      .values(roleToInsert)
      .returningAll()
      .execute();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

export { getAllRoles, createRole };