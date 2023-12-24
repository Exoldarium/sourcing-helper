import { sql } from 'kysely';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { NewRoleLog, RoleLog } from '../types/types';

interface Params {
  dateFrom: string | Date | number;
  dateTo: string | Date | number;
  userId: string;
  roleId: string;
}

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

// i'm using raw query here because i wanted to see how kysely works with raw queries
const getSpecificLogsBasedOnDate = async (params: Params) => {
  try {
    if (params.dateFrom === params.dateTo) {
      const roleLogs = await sql<RoleLog>`SELECT
        COALESCE(CAST(SUM(invitation) AS INT), 0) AS invitation,
        COALESCE(CAST(SUM (initial_contact) AS INT), 0) AS initial_contact,
        COALESCE(CAST(SUM (replied) AS INT), 0) AS replied,
        COALESCE(CAST(SUM(job_description) AS INT), 0) AS job_description,
        COALESCE(CAST(SUM(application_reviewed) AS INT), 0) AS application_reviewed,
        COALESCE(CAST(SUM(proposed) AS INT), 0) AS proposed,
        COALESCE(CAST(SUM(accepted) AS INT), 0) AS accepted,
        COALESCE(CAST(SUM(rejected) AS INT), 0) AS rejected,
        COALESCE(CAST(SUM(follow_up) AS INT), 0) AS follow_up
        FROM role_log 
        WHERE user_id = ${params.userId}
        AND role_id = ${params.roleId}
        AND DATE(created_on) = ${params.dateFrom};`
        .execute(db);

      return roleLogs;
    } else {
      const roleLogs = await sql<RoleLog>`SELECT 
        COALESCE(CAST(SUM(invitation) AS INT), 0) AS invitation,
        COALESCE(CAST(SUM (initial_contact) AS INT), 0) AS initial_contact,
        COALESCE(CAST(SUM (replied) AS INT), 0) AS replied,
        COALESCE(CAST(SUM(job_description) AS INT), 0) AS job_description,
        COALESCE(CAST(SUM(application_reviewed) AS INT), 0) AS application_reviewed,
        COALESCE(CAST(SUM(proposed) AS INT), 0) AS proposed,
        COALESCE(CAST(SUM(accepted) AS INT), 0) AS accepted,
        COALESCE(CAST(SUM(rejected) AS INT), 0) AS rejected,
        COALESCE(CAST(SUM(follow_up) AS INT), 0) AS follow_up
        FROM role_log 
        WHERE user_id = ${params.userId} 
        AND role_id = ${params.roleId}
        AND created_on BETWEEN ${params.dateFrom} AND ${params.dateTo};`
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