import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { SourcingHelperDatabase } from './types';
import { DB_CONFIG } from '../utils/config';

const dialect = new PostgresDialect({
  pool: new Pool(DB_CONFIG)
});

export const db = new Kysely<SourcingHelperDatabase>({
  dialect,
});