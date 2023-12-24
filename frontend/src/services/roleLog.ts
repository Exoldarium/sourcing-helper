import { NewRoleLogEntry } from '../types';
import { request } from '../utils/axiosRequest';
import { parseRoleData } from '../utils/parseRoleData';
import { parseError } from '../utils/parsingHelpers';

interface Params {
  dateFrom: string;
  dateTo: string;
  roleId: string;
}

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

const getSpecificDateData = async (params: Params) => {
  try {
    const res = await request.get(`/roleLog/date/${params.roleId}?dateFrom=${params.dateFrom}&dateTo=${params.dateTo}`);

    if (!(res && Array.isArray(res.data))) throw new Error('Invalid or missing user input');

    const parsedData = res.data.map(parseRoleData.toRoleLogEntry);

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
  getSpecificDateData,
  removeLastDataAdded
};