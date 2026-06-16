import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema.js';

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

try {
  const dbUrl = new URL(process.env.DATABASE_URL || "");

  console.log("DB Host:", dbUrl.hostname);
  console.log("DB Port:", dbUrl.port);
  console.log("DB Database:", dbUrl.pathname);
} catch (err) {
  console.error("Could not parse DATABASE_URL", err);
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle SQL pool client:', err);
});

export const db = drizzle(pool, { schema });