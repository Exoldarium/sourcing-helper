"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseError = exports.parseToNumber = exports.parseDate = exports.parseToBool = exports.parseToString = exports.isDate = exports.isBool = exports.isNumber = exports.isString = void 0;
const isString = (string) => {
    return typeof string === 'string' || string instanceof String;
};
exports.isString = isString;
const isNumber = (number) => {
    return typeof number === 'number' || number instanceof Number;
};
exports.isNumber = isNumber;
const isBool = (bool) => {
    return typeof bool === 'boolean' || bool instanceof Boolean;
};
exports.isBool = isBool;
const isDate = (date) => {
    if (!(0, exports.isString)(date))
        throw new Error('Invalid date input');
    return Boolean(Date.parse(date));
};
exports.isDate = isDate;
const parseToString = (param) => {
    if (!(0, exports.isString)(param))
        throw new Error('Invalid string input');
    return param;
};
exports.parseToString = parseToString;
const parseToBool = (param) => {
    if (!(0, exports.isBool)(param))
        throw new Error('Invalid boolean input');
    return param;
};
exports.parseToBool = parseToBool;
const parseDate = (param) => {
    if (!(0, exports.isString)(param) || !(0, exports.isDate)(param))
        throw new Error('Invalid date input');
    return param;
};
exports.parseDate = parseDate;
const parseToNumber = (param) => {
    if (!(0, exports.isNumber)(param))
        throw new Error('Invalid number input');
    return param;
};
exports.parseToNumber = parseToNumber;
const parseError = (error) => {
    let errorMessage = 'There was an error.';
    if (error instanceof Error) {
        errorMessage = `${error.name}: ${error.message}`;
    }
    console.log(error);
    return errorMessage;
};
exports.parseError = parseError;
