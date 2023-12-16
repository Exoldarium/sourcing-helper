import { useState } from 'react';
import { parseToString } from '../utils/parsingHelpers';
import { UserLogin } from '../types';

export const useForm = (initialState: UserLogin) => {
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