import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';

const getBlacklistedUsers = async () => {
  try {
    return await db.selectFrom('blacklist')
      .selectAll('blacklist')
      .execute();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const blacklistUser = async (id: string, email: string) => {
  try {
    return await db.insertInto('blacklist')
      .values({
        user_id: id,
        email,
      })
      .returningAll()
      .execute();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const removeUserFromBlacklist = async (id: string) => {
  try {
    return await db.deleteFrom('blacklist')
      .where('user_id', '=', id)
      .executeTakeFirst();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

export {
  getBlacklistedUsers,
  blacklistUser,
  removeUserFromBlacklist
};