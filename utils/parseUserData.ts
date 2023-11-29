import { CreateNewUser, UserLogin } from '../src/types/types';
import { parseToString } from './parsingHelpers';

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

export { toNewUserEntry, toUserLoginEntry };