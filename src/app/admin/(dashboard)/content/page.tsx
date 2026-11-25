import type { Metadata } from "next";
import ContentManager from "@/components/admin/ContentManager";
import { requireAdminRole } from "@/server/auth";
import { listContentEntries } from "@/server/services/content-admin";

export const metadata: Metadata = { title: "Content administration", robots: { index: false, follow: false } };
export default async function ContentAdminPage() { await requireAdminRole("CONTENT_EDITOR"); const entries = await listContentEntries(); const serialised = entries.map((entry) => ({ ...entry, createdAt: entry.createdAt.toISOString(), updatedAt: entry.updatedAt.toISOString(), publishedAt: entry.publishedAt?.toISOString() ?? null })); return <><header className="admin-page-header"><div><span className="content-label">Publishing</span><h1>Content entries</h1><p>Payloads are validated against the selected domain model before save or publication.</p></div></header><ContentManager initialEntries={serialised} /></>; }
