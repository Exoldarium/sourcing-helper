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
      .executeTakeFirst();

    if (!blacklistedUser) throw new Error('Blacklisted user not found');

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
      .execute();

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
      .executeTakeFirst();
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