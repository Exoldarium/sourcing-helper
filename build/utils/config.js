"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION = exports.DB_CONFIG = exports.PORT = void 0;
require("dotenv/config");
const parsingHelpers_1 = require("./parsingHelpers");
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
    secret: (0, parsingHelpers_1.parseToString)(process.env.COOKIESECRET),
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 24 * 30 },
    resave: false
};
exports.SESSION = SESSION;
