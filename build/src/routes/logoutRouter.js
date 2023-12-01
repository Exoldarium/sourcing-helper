"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutRouter = void 0;
const express_1 = __importDefault(require("express"));
const parsingHelpers_1 = require("../../utils/parsingHelpers");
const sessionQuery_1 = require("../queries/sessionQuery");
const logoutRouter = express_1.default.Router();
exports.logoutRouter = logoutRouter;
logoutRouter.get('/', async (req, res) => {
    const user = req.session.user;
    if (!user)
        return res.status(400).send('Already logged out');
    await (0, sessionQuery_1.deleteSession)(req.sessionID);
    req.session.destroy((err) => {
        if (err) {
            const error = (0, parsingHelpers_1.parseError)(err);
            throw Error(error);
        }
    });
    return res.status(200).end();
});
