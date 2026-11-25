import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/server/auth";
import { hasDatabaseConfiguration } from "@/server/db/client";

export const metadata: Metadata = {
  title: "Administration sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await getAdminSession()) redirect("/admin");
  return (
    <main className="admin-login-page">
      <div className="admin-login-intro">
        <span className="cpmi-monogram">CPMI</span>
        <span className="content-label">Protected administration</span>
        <h1>Manage ministry content and sensitive workflows.</h1>
        <p>Authentication uses configured database accounts. There are no public seed credentials.</p>
      </div>
      <div className="admin-login-card">
        <h2>Sign in</h2>
        {!hasDatabaseConfiguration() && (
          <div className="admin-alert">
            Database authentication is not configured. No sign-in can succeed in demonstration mode.
          </div>
        )}
        <AdminLoginForm />
        <Link href="/">Return to public website</Link>
      </div>
    </main>
  );
}
