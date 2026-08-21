import { NextRequest, NextResponse } from "next/server";
import {
  validatePassword,
  getSessionCookieConfig,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = (await request.json()) as { password?: string };

  if (!password || !validatePassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(getSessionCookieConfig());
  return response;
}
