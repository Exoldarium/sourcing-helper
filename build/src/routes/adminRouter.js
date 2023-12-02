"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const adminQuery_1 = require("../queries/adminQuery");
const parsingHelpers_1 = require("../../utils/parsingHelpers");
const parseUserData_1 = require("../../utils/parseUserData");
const adminRouter = express_1.default.Router();
exports.adminRouter = adminRouter;
adminRouter.get('/users', async (req, res) => {
    try {
        const currentUser = req.session.user;
        const admin = req.session.admin;
        if (!(currentUser && admin))
            return res.status(403).send('Not allowed');
        const allUsers = await (0, adminQuery_1.getUsersAdmin)();
        return res.status(200).json(allUsers);
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        return res.status(400).send(error);
    }
});
adminRouter.put('/users/:id', async (req, res) => {
    try {
        const findUser = await (0, adminQuery_1.getUserAdmin)(req.params.id);
        const parsedUser = (0, parseUserData_1.toUpdateUserEntryAdmin)(req.body);
        if (!findUser)
            return res.status(404).send('User not found');
        const updatedUser = await (0, adminQuery_1.updateUserAdmin)(parsedUser, findUser.user_id);
        return res.status(200).send(updatedUser);
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        return res.status(400).send(error);
    }
});
