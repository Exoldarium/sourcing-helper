"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const kysely_1 = require("kysely");
const pg_1 = require("pg");
const config_1 = require("../utils/config");
const dialect = new kysely_1.PostgresDialect({
    pool: new pg_1.Pool(config_1.DB_CONFIG)
});
exports.db = new kysely_1.Kysely({
    dialect,
});
