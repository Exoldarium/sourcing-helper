import { parseError } from '../../utils/parsingHelpers';
import { db } from '../db';

const getUsersAdmin = async () => {
  try {
    return await db.selectFrom('users')
      .selectAll('users')
      .execute();
  } catch (err) {
    const error = parseError(err);
    throw Error(error);
  }
};

export { getUsersAdmin };