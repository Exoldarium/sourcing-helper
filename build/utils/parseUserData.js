"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUpdateUserEntryAdmin = exports.toUpdateUserEntry = exports.toUserLoginEntry = exports.toNewUserEntry = void 0;
const parsingHelpers_1 = require("./parsingHelpers");
const toNewUserEntry = (entry) => {
    if (!entry || typeof entry !== 'object')
        throw new Error('Invalid user input');
    if ('email' in entry &&
        'name' in entry &&
        'password' in entry) {
        const newUser = {
            name: (0, parsingHelpers_1.parseToString)(entry.name),
            email: (0, parsingHelpers_1.parseToString)(entry.email),
            password: (0, parsingHelpers_1.parseToString)(entry.password)
        };
        return newUser;
    }
    throw new Error('Invalid user input or some fields might be missing');
};
exports.toNewUserEntry = toNewUserEntry;
const toUserLoginEntry = (entry) => {
    if (!entry || typeof entry !== 'object')
        throw new Error('Invalid user input');
    if ('email' in entry &&
        'password' in entry) {
        const newUser = {
            email: (0, parsingHelpers_1.parseToString)(entry.email),
            password: (0, parsingHelpers_1.parseToString)(entry.password)
        };
        return newUser;
    }
    throw new Error('Invalid login input or some fields might be missing');
};
exports.toUserLoginEntry = toUserLoginEntry;
const toUpdateUserEntry = (entry) => {
    if (!entry || typeof entry !== 'object')
        throw new Error('Invalid user input');
    if ('email' in entry &&
        'name' in entry) {
        const updatedUser = {
            email: (0, parsingHelpers_1.parseToString)(entry.email),
            name: (0, parsingHelpers_1.parseToString)(entry.name)
        };
        return updatedUser;
    }
    throw new Error('Invalid login input or some fields might be missing');
};
exports.toUpdateUserEntry = toUpdateUserEntry;
const toUpdateUserEntryAdmin = (entry) => {
    if (!entry || typeof entry !== 'object')
        throw new Error('Invalid user input');
    if ('email' in entry &&
        'name' in entry &&
        'admin' in entry &&
        'disabled' in entry) {
        const updatedUser = {
            email: (0, parsingHelpers_1.parseToString)(entry.email),
            name: (0, parsingHelpers_1.parseToString)(entry.name),
            admin: (0, parsingHelpers_1.parseToBool)(entry.admin),
            disabled: (0, parsingHelpers_1.parseToBool)(entry.disabled)
        };
        return updatedUser;
    }
    throw new Error('Invalid login input or some fields might be missing');
};
exports.toUpdateUserEntryAdmin = toUpdateUserEntryAdmin;
