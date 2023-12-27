import { useState } from 'react';
import { parseToString } from '../utils/parsingHelpers';
import { NewRoleEntry, NewRoleLogEntry, RoleLogDate, UpdateRoleEntry, UserLogin } from '../types';

type FormInput = UserLogin | UpdateRoleEntry | NewRoleEntry | NewRoleLogEntry | RoleLogDate;

export const useForm = <T extends FormInput>(initialState: T) => {
  const [inputs, setInputs] = useState(initialState);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = parseToString(e.target.name);
    let value: string | number = parseToString(e.target.value);
    const type = parseToString(e.target.type);

    if (type === 'number') {
      value = Number(value);
    }

    setInputs({
      ...inputs,
      [name]: value
    });

    return true;
  };

  return {
    handleInputs,
    inputs
  };
};