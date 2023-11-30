"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION = exports.DB_CONFIG = exports.PORT = void 0;
require("dotenv/config");
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const express_session_1 = __importDefault(require("express-session"));
const parsingHelpers_1 = require("./parsingHelpers");
const PostgresqlStore = (0, connect_pg_simple_1.default)(express_session_1.default);
const sessionStore = new PostgresqlStore({
    conString: `http://${process.env.PGHOST}:${process.env.PGPORT}`,
});
const PORT = process.env.PORT;
exports.PORT = PORT;
const DB_CONFIG = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT)
};
exports.DB_CONFIG = DB_CONFIG;
const SESSION = {
    store: sessionStore,
    secret: (0, parsingHelpers_1.parseToString)(process.env.COOKIESECRET),
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 24 * 8 },
    resave: false
};
exports.SESSION = SESSION;
