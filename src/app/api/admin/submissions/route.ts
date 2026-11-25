import { NextResponse } from "next/server";
import { getAdminSession, hasRole } from "@/server/auth";
import { listFormSubmissions } from "@/server/services/content-admin";

export async function GET() { const session = await getAdminSession(); if (!session?.user || !hasRole(session, "MINISTRY_ADMIN")) return NextResponse.json({ ok: false, message: "Forbidden." }, { status: 403 }); return NextResponse.json({ ok: true, submissions: await listFormSubmissions(true) }); }
