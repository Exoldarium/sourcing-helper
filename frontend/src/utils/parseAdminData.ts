import { AdminUser } from '../types';
import { parseDate, parseToBool, parseToString } from './parsingHelpers';

const toUserEntry = (entry: unknown): AdminUser => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid user input');

  if (
    'user_id' in entry &&
    'email' in entry &&
    'name' in entry &&
    'admin' in entry &&
    'disabled' in entry &&
    'created_on' in entry
  ) {
    const adminUser: AdminUser = {
      user_id: parseToString(entry.user_id),
      email: parseToString(entry.email),
      name: parseToString(entry.name),
      admin: parseToBool(entry.admin),
      disabled: parseToBool(entry.disabled),
      created_on: parseDate(entry.created_on)
    };

    return adminUser;
  }

  throw new Error('Invalid user input or some fields might be missing');
};

export const parseAdminData = {
  toUserEntry
};