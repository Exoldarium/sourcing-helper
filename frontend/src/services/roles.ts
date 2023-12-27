import { NewRoleEntry, Role, UpdateRoleEntry } from '../types';
import { request } from '../utils/axiosRequest';
import { parseRoleData } from '../utils/parseRoleData';
import { parseError } from '../utils/parsingHelpers';

const getRoles = async (): Promise<Role[]> => {
  try {
    const res = await request.get('/roles');

    if (!(res && Array.isArray(res.data))) throw new Error('Invalid or missing user input');

    const parsedRoles = res.data.map(user => parseRoleData.toRoleEntry(user));

    return parsedRoles;
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

const getRole = async (id: string): Promise<Role> => {
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

    const parsedRole = parseRoleData.toNewRoleEntry(res.data);

    return parsedRole;
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

const updateRole = async (id: string, role: UpdateRoleEntry): Promise<UpdateRoleEntry> => {
  try {
    const res = await request.put(`/roles/${id}`, role);

    const parsedRole = parseRoleData.toUpdateRoleEntry(res.data);

    return parsedRole;
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

const deleteRole = async (id: string) => {
  try {
    await request.delete(`/roles/${id}`);
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

export const roleService = {
  getRoles,
  getRole,
  newRole,
  updateRole,
  deleteRole
};