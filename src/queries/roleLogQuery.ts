import { sql } from 'kysely';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { NewRoleLog, RoleLog } from '../types/types';

const getAllRoleLogs = async () => {
  try {
    const roleLogs = await db.selectFrom('role_log')
      .selectAll()
      .execute();

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

const getSpecificLogsBasedOnDate = async (dateFrom: string, dateTo: string) => {
  try {
    if (dateFrom === dateTo) {
      const roleLogs = await sql<RoleLog>`SELECT * FROM role_log 
        WHERE DATE(created_on) = ${dateFrom};`
        .execute(db);

      return roleLogs;
    } else {
      const roleLogs = await sql<RoleLog>`SELECT * FROM role_log 
        WHERE created_on BETWEEN ${dateFrom} AND ${dateTo};`
        .execute(db);

      return roleLogs;
    }
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

const deleteLastLoggedEntry = async (id: string) => {
  try {
    // raw query, because i was lazy to search how to do it with kysely
    await sql<RoleLog>`DELETE FROM role_log
      WHERE user_id = ${id}
      AND id = (
        SELECT MAX(id)
        FROM role_log
        WHERE user_id = ${id}
      );`
      .execute(db);
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

export {
  getAllRoleLogs,
  getSpecificRoleLog,
  getSpecificLogsBasedOnDate,
  insertRoleLog,
  deleteLastLoggedEntry
};