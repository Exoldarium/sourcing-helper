import { NewRoleEntry, NewRoleLogEntry, Role } from '../types';
import { parseDate, parseToNumber, parseToString } from './parsingHelpers';

const toRoleLogEntry = (entry: unknown): NewRoleLogEntry => {
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

const toRoleEntry = (entry: unknown): Role => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid user input');

  if (
    'role_id' in entry &&
    'user_id' in entry &&
    'created_on' in entry &&
    'role_name' in entry &&
    'permission' in entry &&
    'role_data' in entry &&
    'content' in entry &&
    'link' in entry &&
    Array.isArray(entry.permission) &&
    Array.isArray(entry.role_data)
  ) {
    const permission = entry.permission.map(parseToString);
    const role_data = entry.role_data.map(toRoleLogEntry);

    const regularUser: Role = {
      role_id: parseToString(entry.role_id),
      user_id: parseToString(entry.user_id),
      role_name: parseToString(entry.role_name),
      created_on: parseDate(entry.created_on),
      content: parseToString(entry.content),
      link: parseToString(entry.link),
      permission,
      role_data
    };

    return regularUser;
  }

  throw new Error('Invalid user input or some fields might be missing');
};

const toNewRoleEntry = (entry: unknown): NewRoleEntry => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid user input');

  if (
    'role_name' in entry &&
    'permission' in entry &&
    'content' in entry &&
    'link' in entry &&
    Array.isArray(entry.permission)
  ) {
    const permission = entry.permission.map(parseToString);

    const regularUser: NewRoleEntry = {
      role_name: parseToString(entry.role_name),
      content: parseToString(entry.content),
      link: parseToString(entry.link),
      permission
    };

    return regularUser;
  }

  throw new Error('Invalid user input or some fields might be missing');
};

export const parseRoleData = {
  toRoleEntry,
  toNewRoleEntry
};