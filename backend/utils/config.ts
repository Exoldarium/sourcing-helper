import 'dotenv/config';
import { parseToString } from './parsingHelpers';

const PORT = process.env.PORT;

const DB_CONFIG = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT)
};

const SESSION = {
  secret: parseToString(process.env.COOKIESECRET),
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 24 * 8 },
  resave: false,
  secure: process.env.NODE_ENV === 'development' ? false : true,
  httpOnly: process.env.NODE_ENV === 'development' ? false : true,
  sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
};

export {
  PORT,
  DB_CONFIG,
  SESSION
};