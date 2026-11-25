import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { persistenceUnavailable, validationError } from "@/server/http/responses";
import { rateLimit } from "@/server/security/rate-limit";
import { createFormSubmission } from "@/server/services/submissions";
import { prayerSchema } from "@/server/validation/forms";

export async function POST(request: NextRequest) {
  const limit = rateLimit(request, "prayer", 5);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }
  const parsed = prayerSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);
  try {
    const reference = await createFormSubmission("PRAYER", parsed.data, true);
    return NextResponse.json({ ok: true, reference }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "PERSISTENCE_UNAVAILABLE") {
      return persistenceUnavailable();
    }
    return NextResponse.json({ ok: false, message: "The prayer request could not be saved." }, { status: 500 });
  }
}
