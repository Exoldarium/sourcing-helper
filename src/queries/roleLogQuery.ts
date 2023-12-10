import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { NewRoleLog } from '../types/types';

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

// TODO: delete last log added

export {
  getAllRoleLogs,
  getSpecificRoleLog,
  insertRoleLog,
};