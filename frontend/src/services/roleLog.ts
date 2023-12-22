import { NewRoleLogEntry } from '../types';
import { request } from '../utils/axiosRequest';
import { parseRoleData } from '../utils/parseRoleData';
import { parseError } from '../utils/parsingHelpers';

const addNewDataToRole = async (data: NewRoleLogEntry, id: string): Promise<NewRoleLogEntry> => {
  try {
    console.log(data, 'this is data');
    const res = await request.post(`/roleLog/${id}`, data);

    const parsedData = parseRoleData.toRoleLogEntry(res.data);

    return parsedData;
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

const removeLastDataAdded = async (id: string) => {
  try {
    await request.delete(`/roleLog/${id}`);
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

export const roleLogService = {
  addNewDataToRole,
  removeLastDataAdded
};