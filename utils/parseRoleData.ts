import { NewRoleEntry, NewRoleLogEntry } from '../src/types/types';
import { parseToNumber, parseToString } from './parsingHelpers';

const toNewRoleEntry = (entry: unknown): NewRoleEntry => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid role input');

  if ('role_name' in entry && 'permission' in entry && Array.isArray(entry.permission)) {
    const parsePermissions = entry.permission.map(parseToString);

    const newRole: NewRoleEntry = {
      role_name: parseToString(entry.role_name),
      permission: parsePermissions
    };

    return newRole;
  }

  throw new Error('Some inputs might be missing');
};

const toNewRoleLogEntry = (entry: unknown): NewRoleLogEntry => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid role input');

  if (
    'invitation' in entry &&
    'initial_contact' in entry &&
    'replied' in entry &&
    'job_description' in entry &&
    'application_reviewed' in entry &&
    'proposed' in entry &&
    'accepted' in entry &&
    'rejected' in entry &&
    'follow_up' in entry
  ) {

    const newRole: NewRoleLogEntry = {
      invitation: parseToNumber(entry.invitation),
      initial_contact: parseToNumber(entry.initial_contact),
      replied: parseToNumber(entry.replied),
      job_description: parseToNumber(entry.job_description),
      application_reviewed: parseToNumber(entry.application_reviewed),
      proposed: parseToNumber(entry.proposed),
      accepted: parseToNumber(entry.accepted),
      rejected: parseToNumber(entry.rejected),
      follow_up: parseToNumber(entry.follow_up),
    };

    return newRole;
  }

  throw new Error('Some inputs might be missing');
};


export {
  toNewRoleEntry,
  toNewRoleLogEntry
};