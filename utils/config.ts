import 'dotenv/config';
import genFunc from 'connect-pg-simple';
import session from 'express-session';
import { parseToString } from './parsingHelpers';

const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: `http://${process.env.PGHOST}:${process.env.PGPORT}`,
});

const PORT = process.env.PORT;

const DB_CONFIG = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT)
};

const SESSION = {
  store: sessionStore,
  secret: parseToString(process.env.COOKIESECRET),
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 24 * 8 },
  resave: false
};

export {
  PORT,
  DB_CONFIG,
  SESSION
};