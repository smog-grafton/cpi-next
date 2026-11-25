import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { persistenceUnavailable, validationError } from "@/server/http/responses";
import { rateLimit } from "@/server/security/rate-limit";
import { createFormSubmission } from "@/server/services/submissions";
import { contactSchema } from "@/server/validation/forms";

export async function POST(request: NextRequest) {
  const limit = rateLimit(request, "contact");
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);
  try {
    const reference = await createFormSubmission("CONTACT", parsed.data);
    return NextResponse.json({ ok: true, reference }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "PERSISTENCE_UNAVAILABLE") {
      return persistenceUnavailable();
    }
    return NextResponse.json({ ok: false, message: "The request could not be saved." }, { status: 500 });
  }
}
