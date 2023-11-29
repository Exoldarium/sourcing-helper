"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDate = void 0;
const getDate = () => {
    const epoch = Date.now();
    const date = new Date(epoch).toUTCString();
    return date;
};
exports.getDate = getDate;
