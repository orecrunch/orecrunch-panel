import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './../../database/schema'
const sqlite = Database("./database/db.db");
  
export function useDrizzle() {
return drizzle({ client: sqlite, schema: schema,  });
} 