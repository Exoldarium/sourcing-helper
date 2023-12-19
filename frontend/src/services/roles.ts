import { Role } from '../types';
import { request } from '../utils/axiosRequest';
import { parseRoleData } from '../utils/parseRoleData';
import { parseError } from '../utils/parsingHelpers';

const getRoles = async (): Promise<Role[]> => {
  try {
    const res = await request.get('/roles');

    if (!(res && Array.isArray(res.data))) throw new Error('Invalid or missing user input');

    const parseUsers = res.data.map(user => parseRoleData.toRoleEntry(user));

    return parseUsers;
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

const getRole = async (id: string) => {
  try {
    const res = await request.get(`/roles/${id}`);

    return parseRoleData.toRoleEntry(res.data);
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

export const roleService = {
  getRoles,
  getRole
};