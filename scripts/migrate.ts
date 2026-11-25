import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2";

interface MigrationRow extends RowDataPacket { name: string }

const connectionUri = process.env.DATABASE_URL?.trim();
if (!connectionUri) {
  throw new Error("DATABASE_URL is required to run migrations.");
}

const connection = await mysql.createConnection({ uri: connectionUri, multipleStatements: true });
try {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name varchar(255) NOT NULL PRIMARY KEY,
      applied_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  const [rows] = await connection.query<MigrationRow[]>(
    "SELECT name FROM schema_migrations",
  );
  const applied = new Set(rows.map((row) => row.name));
  const migrationDirectory = path.resolve(process.cwd(), "drizzle");
  const files = (await readdir(migrationDirectory))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = await readFile(path.join(migrationDirectory, file), "utf8");
    await connection.beginTransaction();
    try {
      await connection.query(sql);
      await connection.query("INSERT INTO schema_migrations (name) VALUES (?)", [file]);
      await connection.commit();
      process.stdout.write(`Applied ${file}\n`);
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  }
} finally {
  await connection.end();
}
