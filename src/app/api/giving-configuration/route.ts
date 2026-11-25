import { NextResponse } from "next/server";
import { getGivingConfiguration } from "@/server/services/submissions";

export function GET() {
  const configuration = getGivingConfiguration();
  return NextResponse.json({
    available: configuration.methods.length > 0,
    ...configuration,
  });
}
