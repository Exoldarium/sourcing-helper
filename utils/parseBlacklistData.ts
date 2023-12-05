import { Blacklist } from '../src/types/types';
import { parseToString } from './parsingHelpers';

const toExistingBlacklistEntry = (entry: unknown): Blacklist => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid blacklist input');

  if ('user_id' in entry && 'email' in entry) {
    const newRole: Blacklist = {
      user_id: parseToString(entry.user_id),
      email: parseToString(entry.email)
    };

    return newRole;
  }

  throw new Error('Some inputs might be missing');
};

export { toExistingBlacklistEntry };