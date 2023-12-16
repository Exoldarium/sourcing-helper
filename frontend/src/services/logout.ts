import { parseError } from '../utils/parsingHelpers';
import { request } from '../utils/axiosRequest';

const logout = async () => {
  try {
    await request.post('/logout');
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

export const logoutService = { logout };