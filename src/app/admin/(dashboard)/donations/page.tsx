import type { Metadata } from "next";
import DonationReviewTable from "@/components/admin/DonationReviewTable";
import { requireAdminRole } from "@/server/auth";
import { listDonationSubmissions } from "@/server/services/submissions";

export const metadata: Metadata = { title: "Donation review", robots: { index: false, follow: false } };
export default async function DonationsAdminPage() { await requireAdminRole("FINANCE_REVIEWER"); const rows = (await listDonationSubmissions()).map((row) => ({ ...row, createdAt: row.createdAt.toISOString(), updatedAt: row.updatedAt.toISOString(), reviewedAt: row.reviewedAt?.toISOString() ?? null })); return <><header className="admin-page-header"><div><span className="content-label">Finance</span><h1>Donation verification</h1><p>Confirm only after checking actual settlement. Evidence files and screenshots are supporting material, never proof by themselves.</p></div></header><DonationReviewTable initialRows={rows} /></>; }
