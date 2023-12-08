import {
  CreateNewUser,
  UpdateUserAdmin,
  UpdateUserRegular,
  UserLogin,
} from '../src/types/types';

import { parseToBool, parseToString } from './parsingHelpers';

const toNewUserEntry = (entry: unknown): CreateNewUser => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid user input');

  if (
    'email' in entry &&
    'name' in entry &&
    'password' in entry
  ) {
    const newUser: CreateNewUser = {
      name: parseToString(entry.name),
      email: parseToString(entry.email),
      password: parseToString(entry.password)
    };

    return newUser;
  }

  throw new Error('Invalid user input or some fields might be missing');
};

const toUserLoginEntry = (entry: unknown): UserLogin => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid user input');

  if (
    'email' in entry &&
    'password' in entry
  ) {
    const newUser: UserLogin = {
      email: parseToString(entry.email),
      password: parseToString(entry.password)
    };

    return newUser;
  }

  throw new Error('Invalid login input or some fields might be missing');
};

const toUpdateUserEntry = (entry: unknown): UpdateUserRegular => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid user input');

  if (
    'email' in entry &&
    'name' in entry
  ) {
    const updatedUser: UpdateUserRegular = {
      email: parseToString(entry.email),
      name: parseToString(entry.name)
    };

    return updatedUser;
  }

  throw new Error('Invalid user input or some fields might be missing');
};

const toUpdateUserEntryAdmin = (entry: unknown): UpdateUserAdmin => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid user input');

  if (
    'email' in entry &&
    'name' in entry &&
    'admin' in entry &&
    'disabled' in entry
  ) {
    const updatedUser: UpdateUserAdmin = {
      email: parseToString(entry.email),
      name: parseToString(entry.name),
      admin: parseToBool(entry.admin),
      disabled: parseToBool(entry.disabled)
    };

    return updatedUser;
  }

  throw new Error('Invalid user input or some fields might be missing');
};

export {
  toNewUserEntry,
  toUserLoginEntry,
  toUpdateUserEntry,
  toUpdateUserEntryAdmin,
};