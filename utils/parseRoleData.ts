import { NewRoleEntry } from '../src/types/types';
import { parseToString } from './parsingHelpers';

const toNewRoleEntry = (entry: unknown): NewRoleEntry => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid role input');

  if ('name' in entry && 'permission' in entry && Array.isArray(entry.permission)) {
    const parsePermissions = entry.permission.map(parseToString);

    const newRole: NewRoleEntry = {
      name: parseToString(entry.name),
      permission: parsePermissions
    };

    return newRole;
  }

  throw new Error('Some inputs might be missing');
};

export { toNewRoleEntry };