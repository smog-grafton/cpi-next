import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getEvent } from "@/server/repositories/content-repository";
import { persistenceUnavailable, validationError } from "@/server/http/responses";
import { rateLimit } from "@/server/security/rate-limit";
import { createFormSubmission } from "@/server/services/submissions";
import { eventRegistrationSchema } from "@/server/validation/forms";

export async function POST(request: NextRequest) {
  const limit = rateLimit(request, "event-registration");
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }
  const parsed = eventRegistrationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);
  const event = await getEvent(parsed.data.eventSlug);
  if (!event?.registrationEnabled) {
    return NextResponse.json(
      { ok: false, message: "Registration is not available for this event." },
      { status: 409 },
    );
  }
  try {
    const reference = await createFormSubmission("EVENT", parsed.data);
    return NextResponse.json({ ok: true, reference }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "PERSISTENCE_UNAVAILABLE") {
      return persistenceUnavailable();
    }
    return NextResponse.json({ ok: false, message: "The registration could not be saved." }, { status: 500 });
  }
}
