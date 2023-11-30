"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSession = exports.getSession = void 0;
const parsingHelpers_1 = require("../../utils/parsingHelpers");
const db_1 = require("../db");
const getSession = async (sid) => {
    try {
        return await db_1.db.selectFrom('session')
            .where('sid', '=', sid)
            .selectAll()
            .executeTakeFirst();
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        throw Error(error);
    }
};
exports.getSession = getSession;
const deleteSession = async (sid) => {
    try {
        return await db_1.db.deleteFrom('session')
            .where('sid', '=', sid)
            .execute();
    }
    catch (err) {
        const error = (0, parsingHelpers_1.parseError)(err);
        throw Error(error);
    }
};
exports.deleteSession = deleteSession;
