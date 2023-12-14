import { API } from '../constants';
import { RegularUser } from '../types';
import { parseRegularUserData } from '../utils/parseRegularUserData';

const getUsers = async (): Promise<RegularUser[]> => {
  const res = await fetch(`${API}/users`);

  if (!res.ok) throw new Error('Error! No response from the server');

  const allUsers = (await res.json()) as unknown;

  if (!(allUsers && Array.isArray(allUsers))) throw new Error('Invalid or missing user input');

  const parseUsers = allUsers.map(user => parseRegularUserData.toUserEntry(user));

  return parseUsers;
};

export const services = {
  getUsers
};