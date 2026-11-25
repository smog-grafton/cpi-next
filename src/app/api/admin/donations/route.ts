import { NextResponse } from "next/server";
import { getAdminSession, hasRole } from "@/server/auth";
import { listDonationSubmissions } from "@/server/services/submissions";

export async function GET() {
  const session = await getAdminSession();
  if (!session?.user || !hasRole(session, "FINANCE_REVIEWER")) {
    return NextResponse.json({ ok: false, message: "Forbidden." }, { status: 403 });
  }
  return NextResponse.json({ ok: true, donations: await listDonationSubmissions() });
}
