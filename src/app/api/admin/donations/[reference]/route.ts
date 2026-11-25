import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAdminSession, hasRole } from "@/server/auth";
import { reviewDonation } from "@/server/services/submissions";
import { donationReviewSchema } from "@/server/validation/forms";
import { validationError } from "@/server/http/responses";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ reference: string }> },
) {
  const session = await getAdminSession();
  if (!session?.user || !hasRole(session, "FINANCE_REVIEWER")) {
    return NextResponse.json({ ok: false, message: "Forbidden." }, { status: 403 });
  }
  const parsed = donationReviewSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);
  const { reference } = await context.params;
  const updated = await reviewDonation(
    reference,
    parsed.data.status,
    session.user.id,
    parsed.data.reason,
  );
  if (!updated) {
    return NextResponse.json({ ok: false, message: "Donation reference not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, status: parsed.data.status });
}
