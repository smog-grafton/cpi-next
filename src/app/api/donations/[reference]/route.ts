import { NextResponse } from "next/server";
import { getDonationStatus } from "@/server/services/submissions";

export async function GET(
  _request: Request,
  context: { params: Promise<{ reference: string }> },
) {
  const { reference } = await context.params;
  const donation = await getDonationStatus(reference);
  if (!donation) {
    return NextResponse.json({ ok: false, message: "Donation reference not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, donation });
}
