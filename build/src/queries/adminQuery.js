"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = exports.updateUserAdmin = exports.getUserAdmin = exports.getUsersAdmin = void 0;
const parsingHelpers_1 = require("../../utils/parsingHelpers");
const db_1 = require("../db");
const checkAdmin = async (id) => {
    try {
        return await db_1.db.selectFrom('users')
            .where('user_id', '=', id)
            .where('admin', '=', true)
            .selectAll()
            .execute();
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        throw Error(error);
    }
};
exports.checkAdmin = checkAdmin;
const getUsersAdmin = async () => {
    try {
        return await db_1.db.selectFrom('users')
            .selectAll('users')
            .execute();
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        throw Error(error);
    }
};
exports.getUsersAdmin = getUsersAdmin;
const getUserAdmin = async (id) => {
    try {
        return await db_1.db.selectFrom('users')
            .where('user_id', '=', id)
            .selectAll()
            .executeTakeFirst();
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        throw Error(error);
    }
};
exports.getUserAdmin = getUserAdmin;
const updateUserAdmin = async (user, id) => {
    const { name, email, disabled, admin } = user;
    try {
        return await db_1.db.updateTable('users')
            .set({
            name,
            email,
            admin,
            disabled
        })
            .where('user_id', '=', id)
            .returningAll()
            .executeTakeFirst();
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        throw Error(error);
    }
};
exports.updateUserAdmin = updateUserAdmin;
