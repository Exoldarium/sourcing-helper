import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { NewRoleLog } from '../types/types';

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

export { insertRoleLog };