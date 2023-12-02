"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutRouter = void 0;
const express_1 = __importDefault(require("express"));
const parsingHelpers_1 = require("../../utils/parsingHelpers");
const logoutRouter = express_1.default.Router();
exports.logoutRouter = logoutRouter;
logoutRouter.get('/', (req, res) => {
    const user = req.session.user;
    if (!user)
        return res.status(400).send('Already logged out');
    req.session.destroy((err) => {
        if (err) {
            const error = (0, parsingHelpers_1.parseError)(err);
            throw Error(error);
        }
    });
    return res.status(200).end();
});
