import "server-only";

import { randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import { checkDatabaseConnection, getDatabase } from "@/server/db/client";
import { contentEntries, formSubmissions } from "@/server/db/schema";
import type { ContentKind } from "@/server/validation/admin-content";

export async function listContentEntries() {
  if (!(await checkDatabaseConnection())) return [];
  return getDatabase().select().from(contentEntries).orderBy(desc(contentEntries.updatedAt)).limit(500);
}

export async function createContentEntry(input: { kind: ContentKind; slug: string; title: string; status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED"; payload: unknown }, userId: string) {
  if (!(await checkDatabaseConnection())) throw new Error("PERSISTENCE_UNAVAILABLE");
  const id = randomUUID();
  await getDatabase().insert(contentEntries).values({ id, ...input, createdBy: userId, publishedAt: input.status === "PUBLISHED" ? new Date() : null });
  return id;
}

export async function updateContentEntry(id: string, input: { kind: ContentKind; slug: string; title: string; status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED"; payload: unknown }) {
  if (!(await checkDatabaseConnection())) throw new Error("PERSISTENCE_UNAVAILABLE");
  const result = await getDatabase().update(contentEntries).set({ ...input, publishedAt: input.status === "PUBLISHED" ? new Date() : null, updatedAt: new Date() }).where(eq(contentEntries.id, id));
  return result[0].affectedRows > 0;
}

export async function archiveContentEntry(id: string) {
  if (!(await checkDatabaseConnection())) throw new Error("PERSISTENCE_UNAVAILABLE");
  const result = await getDatabase().update(contentEntries).set({ status: "ARCHIVED", updatedAt: new Date() }).where(eq(contentEntries.id, id));
  return result[0].affectedRows > 0;
}

export async function listFormSubmissions(includePrivatePastoral: boolean) {
  if (!(await checkDatabaseConnection())) return [];
  const rows = await getDatabase().select().from(formSubmissions).orderBy(desc(formSubmissions.createdAt)).limit(300);
  return includePrivatePastoral ? rows : rows.filter((row) => !row.privatePastoral);
}
