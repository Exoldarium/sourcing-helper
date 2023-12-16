import { RegularUser } from '../types';
import { request } from '../utils/axiosRequest';
import { parseRegularUserData } from '../utils/parseRegularUserData';

const getUsers = async (): Promise<RegularUser[]> => {
  const res = await request.get('/users');

  if (!(res && Array.isArray(res.data))) throw new Error('Invalid or missing user input');

  const parseUsers = res.data.map(user => parseRegularUserData.toUserEntry(user));

  return parseUsers;
};

export const services = {
  getUsers
};