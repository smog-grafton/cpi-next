import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export function validationError(error: ZodError) {
  return NextResponse.json(
    {
      ok: false,
      message: "Review the highlighted information and try again.",
      fieldErrors: error.flatten().fieldErrors,
    },
    { status: 422 },
  );
}

export function persistenceUnavailable() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "Online submission is not available yet. No information was saved. Please use a verified ministry contact channel once one is published.",
    },
    { status: 503 },
  );
}
