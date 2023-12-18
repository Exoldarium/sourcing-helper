import { RegularUser, UserLogin } from '../types';
import { parseError } from '../utils/parsingHelpers';
import { parseRegularUserData } from '../utils/parseRegularUserData';
import { request } from '../utils/axiosRequest';

const login = async (credentials: UserLogin): Promise<RegularUser> => {
  try {
    const res = await request.post('login', credentials);
    return parseRegularUserData.toUserEntry(res.data);
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

export const loginService = { login };