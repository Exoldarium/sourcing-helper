"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmin = exports.updateUser = exports.insertUser = exports.getUser = exports.getUsers = void 0;
const parsingHelpers_1 = require("../../utils/parsingHelpers");
const db_1 = require("../db");
const getUsers = async () => {
    try {
        return await db_1.db.selectFrom('users')
            .selectAll()
            .execute();
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        throw Error(error);
    }
};
exports.getUsers = getUsers;
const getUser = async (email) => {
    try {
        return await db_1.db.selectFrom('users')
            .where('email', '=', email)
            .selectAll()
            .executeTakeFirst();
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        throw Error(error);
    }
};
exports.getUser = getUser;
const insertUser = async (user) => {
    try {
        return await db_1.db.insertInto('users')
            .values(user)
            .returningAll()
            .execute();
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        throw Error(error);
    }
};
exports.insertUser = insertUser;
const updateUser = async (id, email, name) => {
    try {
        return await db_1.db.updateTable('users')
            .set({
            name,
            email
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
exports.updateUser = updateUser;
const getAdmin = async (id) => {
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
exports.getAdmin = getAdmin;
