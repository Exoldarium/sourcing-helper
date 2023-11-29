"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const error = (error, res, next) => {
    console.log(error);
    if (error) {
        return res.status(400).json(error);
    }
    return next(error);
};
exports.error = error;
