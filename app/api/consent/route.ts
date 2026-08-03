import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const CONSENT_TEXT =
  "I agree to receive occasional updates from FlixBix and consent to the processing of my email address as described in the Privacy Policy.";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      null;

    const consent = await db.consent.create({
      data: {
        email,
        consentText: CONSENT_TEXT,
        ipAddress: ip,
      },
    });

    return NextResponse.json({ success: true, consentedAt: consent.consentedAt });
  } catch (error) {
    console.error("Consent record error:", error);
    return NextResponse.json({ error: "Failed to record consent" }, { status: 500 });
  }
}
