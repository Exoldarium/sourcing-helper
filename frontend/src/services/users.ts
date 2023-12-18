import { RegularUser } from '../types';
import { request } from '../utils/axiosRequest';
import { parseRegularUserData } from '../utils/parseRegularUserData';
import { parseError } from '../utils/parsingHelpers';

const getUsers = async (): Promise<RegularUser[]> => {
  try {
    const res = await request.get('/users');

    if (!(res && Array.isArray(res.data))) throw new Error('Invalid or missing user input');

    const parseUsers = res.data.map(user => parseRegularUserData.toUserEntry(user));

    return parseUsers;
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

const getLoggedInUser = async (): Promise<RegularUser> => {
  try {
    const res = await request.get('/loggedUser');

    const parseUsers = parseRegularUserData.toUserEntry(res.data);

    return parseUsers;
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

export const userService = {
  getUsers,
  getLoggedInUser
};