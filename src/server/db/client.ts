import "server-only";

import { sql } from "drizzle-orm";
import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import mysql, { type Pool } from "mysql2/promise";
import * as schema from "./schema";

let pool: Pool | undefined;
let database: MySql2Database<typeof schema> | undefined;

export function hasDatabaseConfiguration(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getDatabase(): MySql2Database<typeof schema> {
  const connectionUri = process.env.DATABASE_URL?.trim();
  if (!connectionUri) {
    throw new Error("Database persistence is not configured.");
  }

  if (!pool) {
    pool = mysql.createPool({
      uri: connectionUri,
      connectionLimit: 10,
      enableKeepAlive: true,
      maxIdle: 4,
      idleTimeout: 60_000,
    });
  }
  database ??= drizzle(pool, { schema, mode: "default" });
  return database;
}

export async function checkDatabaseConnection(): Promise<boolean> {
  if (!hasDatabaseConfiguration()) return false;
  try {
    await getDatabase().execute(sql`SELECT 1`);
    return true;
  } catch {
    return false;
  }
}
