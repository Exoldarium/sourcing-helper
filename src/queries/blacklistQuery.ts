import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';

const getBlacklistedUsers = async () => {
  try {
    const blacklist = await db.selectFrom('blacklist')
      .select(['user_id', 'email'])
      .execute();

    return blacklist;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const getSpecificBlacklistedUser = async (id: string) => {
  try {
    const blacklistedUser = await db.selectFrom('blacklist')
      .where('user_id', '=', id)
      .select(['user_id', 'email'])
      .executeTakeFirstOrThrow();

    return blacklistedUser;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const blacklistUser = async (id: string, email: string) => {
  try {
    const blacklist = await db.insertInto('blacklist')
      .values({
        user_id: id,
        email,
      })
      .returning(['user_id', 'email'])
      .executeTakeFirstOrThrow();

    return blacklist;
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const removeUserFromBlacklist = async (id: string) => {
  try {
    return await db.deleteFrom('blacklist')
      .where('user_id', '=', id)
      .executeTakeFirstOrThrow();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

export {
  getBlacklistedUsers,
  getSpecificBlacklistedUser,
  blacklistUser,
  removeUserFromBlacklist
};