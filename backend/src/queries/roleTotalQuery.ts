import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { CreateNewRole, NewRoleEntry } from '../types/types';

// TODO: 
// add content and link columns to role_total db

const getAllRoles = async () => {
  try {
    const roles = await db.selectFrom('roles_total')
      .selectAll('roles_total')
      .select((eb) => [
        jsonArrayFrom(
          eb.selectFrom('role_log')
            .select(({ fn }) => [
              fn.sum<number>('invitation').as('invitation'),
              fn.sum<number>('initial_contact').as('initial_contact'),
              fn.sum<number>('replied').as('replied'),
              fn.sum<number>('job_description').as('job_description'),
              fn.sum<number>('application_reviewed').as('application_reviewed'),
              fn.sum<number>('proposed').as('proposed'),
              fn.sum<number>('accepted').as('accepted'),
              fn.sum<number>('rejected').as('rejected'),
              fn.sum<number>('follow_up').as('follow_up'),
            ])
            .whereRef('roles_total.role_id', '=', 'role_log.role_id')
        ).as('role_data')
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
      .selectAll('roles_total')
      .where('roles_total.role_id', '=', id)
      .select((eb) => [
        jsonArrayFrom(
          eb.selectFrom('role_log')
            .select(({ fn }) => [
              fn.sum<number>('invitation').as('invitation'),
              fn.sum<number>('initial_contact').as('initial_contact'),
              fn.sum<number>('replied').as('replied'),
              fn.sum<number>('job_description').as('job_description'),
              fn.sum<number>('application_reviewed').as('application_reviewed'),
              fn.sum<number>('proposed').as('proposed'),
              fn.sum<number>('accepted').as('accepted'),
              fn.sum<number>('rejected').as('rejected'),
              fn.sum<number>('follow_up').as('follow_up'),
            ])
            .whereRef('roles_total.role_id', '=', 'role_log.role_id')
        ).as('role_data')
      ])
      .executeTakeFirstOrThrow();

    return role;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const createRole = async (role: CreateNewRole) => {
  try {
    const roles = await db.insertInto('roles_total')
      .values(role)
      .returningAll()
      .executeTakeFirstOrThrow();

    return roles;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const updateRole = async (id: string, role: NewRoleEntry) => {
  try {
    const updatedRole = await db.updateTable('roles_total')
      .set({
        content: role.content,
        link: role.link,
        role_name: role.role_name,
        permission: role.permission
      })
      .where('role_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return updatedRole;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const addPermission = async (roleId: string, permission: string[]) => {
  try {
    const role = await db.updateTable('roles_total')
      .set({ permission })
      .where('role_id', '=', roleId)
      .returning([
        'user_id',
        'role_name',
        'permission'
      ])
      .executeTakeFirstOrThrow();

    return role;
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
  updateRole,
  addPermission,
  deleteRole
};