import { useState } from 'react';
import { parseToString } from '../utils/parsingHelpers';
import { NewRoleEntry, UserLogin } from '../types';

type FormInput = UserLogin | NewRoleEntry;

export const useForm = <T extends FormInput>(initialState: T) => {
  const [inputs, setInputs] = useState(initialState);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = parseToString(e.target.name);
    const value = parseToString(e.target.value);

    setInputs({
      ...inputs,
      [name]: value
    });
  };

  return {
    handleInputs,
    inputs
  };
};