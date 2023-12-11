import { sql } from 'kysely';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { NewRoleLog, RoleLog } from '../types/types';

const getAllRoleLogs = async () => {
  try {
    const roleLogs = await db.selectFrom('role_log')
      .selectAll()
      .execute();

    console.log(roleLogs);

    return roleLogs;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const getSpecificRoleLog = async (id: string) => {
  try {
    const roleLog = await db.selectFrom('role_log')
      .where('log_id', '=', id)
      .executeTakeFirstOrThrow();

    return roleLog;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const insertRoleLog = async (role: NewRoleLog) => {
  try {
    const roleLog = await db.insertInto('role_log')
      .values(role)
      .returningAll()
      .executeTakeFirstOrThrow();

    return roleLog;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const deleteLastLoggedEntry = async () => {
  try {
    await sql<RoleLog>`DELETE FROM role_log WHERE id = (SELECT MAX(id) from role_log);`
      .execute(db);
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

export {
  getAllRoleLogs,
  getSpecificRoleLog,
  insertRoleLog,
  deleteLastLoggedEntry
};