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
  resave: false,
  name: 'myApp', // session id's will conflict if the name is not set, had problems with cookies because of that
  cookie: {
    maxAge: 3600000,
    httpOnly: false,
    sameSite: false,
    secure: false
    // TODO: add these in prod
    // secure: process.env.NODE_ENV === 'development' ? false : true,
    // httpOnly: process.env.NODE_ENV === 'development' ? false : true,
    // sameSite: process.env.NODE_ENV === 'development' ? false : 'none' as const,
  },
};

export {
  PORT,
  DB_CONFIG,
  SESSION
};