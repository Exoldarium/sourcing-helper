"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginrouter = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const parseUserData_1 = require("../../utils/parseUserData");
const userQuery_1 = require("../queries/userQuery");
const parsingHelpers_1 = require("../../utils/parsingHelpers");
const loginrouter = express_1.default.Router();
exports.loginrouter = loginrouter;
loginrouter.post('/', async (req, res) => {
    try {
        const { email, password } = (0, parseUserData_1.toUserLoginEntry)(req.body);
        console.log(email);
        if (req.session.user)
            return res.status(400).send('Already logged in');
        const user = await (0, userQuery_1.getUser)(email);
        const validatePassword = user === undefined ? false : await bcrypt_1.default.compare(password, user.password_hash);
        if (!(user && validatePassword))
            return res.status(400).send('Invalid e-mail or password');
        const loggedUser = {
            email: user.email,
            id: user.user_id,
        };
        req.session.user = loggedUser;
        req.session.admin = user.admin;
        return res.status(200).send(loggedUser);
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        return res.status(400).send(error);
    }
});
