import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  getContactMessages,
  getUnreadContactCount,
} from "@/lib/contacts";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [messages, unread] = await Promise.all([
    getContactMessages(),
    getUnreadContactCount(),
  ]);

  return NextResponse.json({ messages, unread });
}
