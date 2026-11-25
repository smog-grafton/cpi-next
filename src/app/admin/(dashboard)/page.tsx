import type { Metadata } from "next";
import Link from "next/link";
import { getAdminSession, hasRole } from "@/server/auth";
import {
  checkDatabaseConnection,
  hasDatabaseConfiguration,
} from "@/server/db/client";
import {
  listContentEntries,
  listFormSubmissions,
} from "@/server/services/content-admin";
import { listDonationSubmissions } from "@/server/services/submissions";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  const session = await getAdminSession();
  const connected = await checkDatabaseConnection();
  const entries = connected && session && hasRole(session, "CONTENT_EDITOR")
    ? await listContentEntries()
    : [];
  const submissions = connected && session && hasRole(session, "MINISTRY_ADMIN")
    ? await listFormSubmissions(true)
    : [];
  const donations = connected && session && hasRole(session, "FINANCE_REVIEWER")
    ? await listDonationSubmissions()
    : [];

  return (
    <>
      <header className="admin-page-header">
        <div>
          <span className="content-label">Administration</span>
          <h1>Ministry operations</h1>
          <p>Content, submissions and finance remain separated by server-side roles.</p>
        </div>
        <Link href="/" className="theme-btn transparent-btn-2">View website</Link>
      </header>
      <div className={`admin-system-status ${connected ? "connected" : "offline"}`}>
        <i className={connected ? "far fa-database" : "far fa-database-exclamation"} />
        <div>
          <strong>
            {connected
              ? "MySQL connected"
              : hasDatabaseConfiguration()
                ? "MySQL configured but unreachable"
                : "Read-only demonstration mode"}
          </strong>
          <p>
            {connected
              ? "Protected mutations and dynamic content are available."
              : "Public pages use deterministic content. Mutations report that nothing was saved."}
          </p>
        </div>
      </div>
      <section className="admin-stat-grid">
        {session && hasRole(session, "CONTENT_EDITOR") && (
          <Link href="/admin/content">
            <span>Content entries</span><strong>{entries.length}</strong>
            <small>{entries.filter((item) => item.status === "PUBLISHED").length} published</small>
          </Link>
        )}
        {session && hasRole(session, "MINISTRY_ADMIN") && (
          <Link href="/admin/submissions">
            <span>Form submissions</span><strong>{submissions.length}</strong>
            <small>{submissions.filter((item) => item.status === "NEW").length} new</small>
          </Link>
        )}
        {session && hasRole(session, "FINANCE_REVIEWER") && (
          <Link href="/admin/donations">
            <span>Donation records</span><strong>{donations.length}</strong>
            <small>{donations.filter((item) => item.status === "PENDING").length} pending review</small>
          </Link>
        )}
      </section>
      <section className="admin-checklist">
        <h2>Production configuration</h2>
        <ul>
          <li className={connected ? "done" : ""}>Database migrations and connection</li>
          <li className={process.env.RADIO_PRIMARY_STREAM_URL ? "done" : ""}>Verified radio stream URL</li>
          <li className={process.env.LIVE_VIDEO_HLS_URL || process.env.LIVE_VIDEO_EMBED_URL ? "done" : ""}>Verified live video source</li>
          <li className={process.env.GIVING_METHOD_LABEL && process.env.GIVING_INSTRUCTIONS ? "done" : ""}>Approved giving instructions</li>
          <li className={process.env.MINISTRY_PUBLIC_EMAIL || process.env.MINISTRY_PUBLIC_PHONE ? "done" : ""}>Verified public contact details</li>
        </ul>
      </section>
    </>
  );
}
