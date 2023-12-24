import { useState } from 'react';
import { parseToString } from '../utils/parsingHelpers';
import { NewRoleEntry, NewRoleLogEntry, RoleLogDate, UserLogin } from '../types';

type FormInput = UserLogin | NewRoleEntry | NewRoleLogEntry | RoleLogDate;

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