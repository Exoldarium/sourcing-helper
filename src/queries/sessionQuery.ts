import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';

const getSession = async (sid: string) => {
  try {
    return await db.selectFrom('session')
      .where('sid', '=', sid)
      .selectAll()
      .executeTakeFirst();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

const deleteSession = async (sid: string) => {
  try {
    return await db.deleteFrom('session')
      .where('sid', '=', sid)
      .execute();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

export { getSession, deleteSession };