import { LoggedUser, UserLogin } from '../types';
import { parseError } from '../utils/parsingHelpers';
import { parseRegularUserData } from '../utils/parseRegularUserData';
import { request } from '../utils/axiosRequest';

const login = async (credentials: UserLogin): Promise<LoggedUser> => {
  try {
    const res = await request.post('login', credentials);

    if (!res) throw new Error('User not found');

    console.log(res.data);

    return parseRegularUserData.toLoginEntry(res.data);
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

export const loginService = { login };