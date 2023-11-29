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
  cookie: { maxAge: 60 * 60 * 24 * 30 },
  resave: false
};

export { PORT, DB_CONFIG, SESSION };