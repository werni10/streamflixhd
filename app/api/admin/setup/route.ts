import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const existingAdmin = await db.admin.findFirst();
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin user already exists. Setup already completed." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    if (username.length < 3 || password.length < 6) {
      return NextResponse.json(
        { error: "Username must be 3+ chars, password 6+ chars" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await db.admin.create({
      data: { username, password: hashedPassword },
    });

    return NextResponse.json({ message: "Admin created successfully", username: admin.username });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}
