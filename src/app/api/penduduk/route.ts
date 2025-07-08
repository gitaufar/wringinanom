// src/app/api/penduduk/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const penduduk = await prisma.penduduk.findMany();
    return NextResponse.json(penduduk);
  } catch (error) {
    console.error("Failed to fetch penduduk:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
