import { randomUUID } from "node:crypto";
import mysql from "mysql2/promise";

const connectionUri = process.env.DATABASE_URL?.trim();
if (!connectionUri) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLocaleLowerCase();
const passwordHash = process.env.ADMIN_BOOTSTRAP_PASSWORD_HASH?.trim();
const role = process.env.ADMIN_BOOTSTRAP_ROLE?.trim() ?? "SUPER_ADMIN";
const allowedRoles = new Set([
  "CONTENT_EDITOR",
  "FINANCE_REVIEWER",
  "MINISTRY_ADMIN",
  "SUPER_ADMIN",
]);

if (!email || !passwordHash) {
  throw new Error(
    "ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD_HASH are required. No default credential is created.",
  );
}
if (!/^\$2[aby]\$/.test(passwordHash)) {
  throw new Error("ADMIN_BOOTSTRAP_PASSWORD_HASH must be a bcrypt hash.");
}
if (!allowedRoles.has(role)) {
  throw new Error("ADMIN_BOOTSTRAP_ROLE is not valid.");
}

const connection = await mysql.createConnection(connectionUri);
try {
  await connection.execute(
    `INSERT INTO users (id, email, name, password_hash, role, active)
     VALUES (?, ?, ?, ?, ?, true)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), role = VALUES(role), active = true`,
    [randomUUID(), email, "Configured CPMI administrator", passwordHash, role],
  );
  process.stdout.write(`Bootstrap administrator configured for ${email}.\n`);
} finally {
  await connection.end();
}
