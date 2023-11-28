import { CreateNewUser } from '../src/types';
import { parseToString } from './parsingHelpers';

const toNewUserentry = (entry: unknown): CreateNewUser => {
  if (!entry || typeof entry !== 'object') throw new Error('Invalid user input');

  if (
    'email' in entry &&
    'name' in entry
  ) {
    const newUser: CreateNewUser = {
      name: parseToString(entry.name),
      email: parseToString(entry.email)
    };

    return newUser;
  }

  throw new Error('Invalid user input or some fields might be missing');
};

export { toNewUserentry };