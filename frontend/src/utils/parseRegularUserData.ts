import { RegularUser } from '../types';
import { parseToString } from './parsingHelpers';

const toUserEntry = (entry: unknown): RegularUser => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid user input');

  if (
    'user_id' in entry &&
    'email' in entry &&
    'name' in entry
  ) {
    const regularUser: RegularUser = {
      user_id: parseToString(entry.user_id),
      email: parseToString(entry.email),
      name: parseToString(entry.name)
    };

    return regularUser;
  }

  throw new Error('Invalid user input or some fields might be missing');
};

export const parseRegularUserData = {
  toUserEntry
};