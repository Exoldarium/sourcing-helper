"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const userQuery_1 = require("../queries/userQuery");
const helpers_1 = require("../../utils/helpers");
const parsingHelpers_1 = require("../../utils/parsingHelpers");
const parseUserData_1 = require("../../utils/parseUserData");
// TODO:
// add passwordHash column to postgres
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get('/', async (req, res) => {
    try {
        const user = req.session.user;
        if (!user)
            return res.status(404).send('Must be logged in to access this');
        const allUsers = await (0, userQuery_1.getUsers)();
        return res.status(200).json(allUsers);
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        return res.status(400).send(error);
    }
});
userRouter.post('/create', async (req, res) => {
    try {
        const parseNewUser = (0, parseUserData_1.toNewUserEntry)(req.body);
        if (parseNewUser.password.length < 5) {
            return res.status(400).send('Invalid input: password must be at least 5 characters long');
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt_1.default.hash(parseNewUser.password, saltRounds);
        const newUser = {
            name: parseNewUser.name,
            email: parseNewUser.email,
            password_hash: passwordHash,
            user_id: (0, uuid_1.v4)(),
            disabled: false,
            admin: false,
            created_on: (0, helpers_1.getDate)()
        };
        const newUserRes = await (0, userQuery_1.insertUser)(newUser);
        return res.status(201).json(newUserRes);
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        return res.status(400).send(error);
    }
});
