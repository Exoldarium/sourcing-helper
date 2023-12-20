import { NewRoleEntry, Role } from '../types';
import { request } from '../utils/axiosRequest';
import { parseRoleData } from '../utils/parseRoleData';
import { parseError } from '../utils/parsingHelpers';

// TODO: account for null, parse it to 0

const getRoles = async (): Promise<Role[]> => {
  try {
    const res = await request.get('/roles');

    if (!(res && Array.isArray(res.data))) throw new Error('Invalid or missing user input');
    console.log(res.data);
    const parsedRoles = res.data.map(user => parseRoleData.toRoleEntry(user));


    return parsedRoles;
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

const newRole = async (role: NewRoleEntry): Promise<NewRoleEntry> => {
  try {
    const res = await request.post('/roles', role);

    const parsedRole = parseRoleData.toRoleEntry(res.data);

    return parsedRole;
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

export const roleService = {
  getRoles,
  getRole,
  newRole
};