import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { persistenceUnavailable, validationError } from "@/server/http/responses";
import { rateLimit } from "@/server/security/rate-limit";
import { createDonationSubmission } from "@/server/services/submissions";
import { donationSchema } from "@/server/validation/forms";

export async function POST(request: NextRequest) {
  const limit = rateLimit(request, "donation", 5, 30 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const form = await request.formData();
  const parsed = donationSchema.safeParse({
    purposeId: form.get("purposeId"),
    campaignSlug: form.get("campaignSlug") || undefined,
    amount: form.get("amount"),
    currency: form.get("currency"),
    paymentMethod: form.get("paymentMethod"),
    transactionReference: form.get("transactionReference"),
    donorName: form.get("donorName"),
    donorEmail: form.get("donorEmail") || undefined,
    donorPhone: form.get("donorPhone") || undefined,
    consent: form.get("consent") === "true",
    website: form.get("website") || "",
  });
  if (!parsed.success) return validationError(parsed.error);
  const candidate = form.get("evidence");
  const evidence = candidate instanceof File ? candidate : undefined;

  try {
    const reference = await createDonationSubmission(parsed.data, evidence);
    return NextResponse.json(
      { ok: true, reference, status: "PENDING", confirmationPath: `/give/confirmation/${reference}` },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "PERSISTENCE_UNAVAILABLE") return persistenceUnavailable();
      if (error.message === "PAYMENT_METHOD_UNAVAILABLE") {
        return NextResponse.json(
          { ok: false, message: "The selected payment method is no longer available." },
          { status: 409 },
        );
      }
      if (error.message === "EVIDENCE_TOO_LARGE") {
        return NextResponse.json(
          { ok: false, message: "Evidence files must be 4 MB or smaller." },
          { status: 413 },
        );
      }
      if (error.message === "EVIDENCE_TYPE_UNSUPPORTED") {
        return NextResponse.json(
          { ok: false, message: "Upload a JPG, PNG or PDF file." },
          { status: 415 },
        );
      }
    }
    return NextResponse.json({ ok: false, message: "The donation record could not be saved." }, { status: 500 });
  }
}
