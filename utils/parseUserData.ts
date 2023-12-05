import { CreateNewUser, UpdateUserAdmin, UpdateUserRegular, User, UserLogin, UserRegular } from '../src/types/types';
import { parseDate, parseToBool, parseToString } from './parsingHelpers';

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

// existing user is the user with all available properties
const toExistingUserEntry = (entry: unknown): User => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid user input');

  if (
    'user_id' in entry &&
    'email' in entry &&
    'name' in entry &&
    'password_hash' in entry &&
    'admin' in entry &&
    'disabled' in entry &&
    'created_on' in entry
  ) {
    const updatedUser: User = {
      user_id: parseToString(entry.user_id),
      email: parseToString(entry.email),
      name: parseToString(entry.name),
      password_hash: parseToString(entry.password_hash),
      admin: parseToBool(entry.admin),
      disabled: parseToBool(entry.disabled),
      created_on: parseDate(entry.created_on),
    };

    return updatedUser;
  }

  throw new Error('Invalid user input or some fields might be missing');
};

// regular user values are visible for non-admin users
const toRegularUserentry = (entry: unknown): UserRegular => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid user input');

  if (
    'user_id' in entry &&
    'email' in entry &&
    'name' in entry
  ) {
    const updatedUser: UserRegular = {
      user_id: parseToString(entry.user_id),
      email: parseToString(entry.email),
      name: parseToString(entry.name),
    };

    return updatedUser;
  }

  throw new Error('Invalid user input or some fields might be missing');
};

export {
  toNewUserEntry,
  toExistingUserEntry,
  toUserLoginEntry,
  toUpdateUserEntry,
  toUpdateUserEntryAdmin,
  toRegularUserentry
};