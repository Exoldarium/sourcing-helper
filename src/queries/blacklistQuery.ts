import { toExistingBlacklistEntry } from '../../utils/parseBlacklistData';
import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';
import { Blacklist } from '../types/types';

const getBlacklistedUsers = async (): Promise<Blacklist[]> => {
  try {
    const blacklist = await db.selectFrom('blacklist')
      .selectAll('blacklist')
      .execute();

    return blacklist.map(toExistingBlacklistEntry);
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const blacklistUser = async (id: string, email: string): Promise<Blacklist[]> => {
  try {
    const blacklist = await db.insertInto('blacklist')
      .values({
        user_id: id,
        email,
      })
      .returningAll()
      .execute();

    return blacklist.map(toExistingBlacklistEntry);
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