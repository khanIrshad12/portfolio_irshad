import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/portfolio";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const data = await getPortfolioData();
  return NextResponse.json(data);
}
