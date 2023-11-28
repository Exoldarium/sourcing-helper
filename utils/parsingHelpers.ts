
const isString = (string: unknown): string is string => {
  return typeof string === 'string' || string instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

const isBool = (bool: unknown): bool is boolean => {
  return typeof bool === 'boolean' || bool instanceof Boolean;
};

const isDate = (date: unknown): boolean => {
  if (!isString(date)) throw new Error('Invalid date input');
  return Boolean(Date.parse(date));
};

const parseToString = (param: unknown): string => {
  if (!isString(param)) throw new Error('Invalid string input');

  return param;
};

const parseToBool = (param: unknown): boolean => {
  if (!isBool(param)) throw new Error('Invalid boolean input');

  return param;
};

const parseDate = (param: unknown): string => {
  if (!isString(param) || !isDate(param)) throw new Error('Invalid date input');

  return param;
};

const parseToNumber = (param: unknown): number => {
  if (!isNumber(param)) throw new Error('Invalid number input');

  return param;
};

const parseError = (error: unknown) => {
  let errorMessage = 'There was an error.';

  if (error instanceof Error) {
    errorMessage = `${error.name}: ${error.message}`;
  }

  console.log(error);
  return errorMessage;
};

export {
  isString,
  isNumber,
  isBool,
  isDate,
  parseToString,
  parseDate,
  parseToBool,
  parseToNumber,
  parseError
};