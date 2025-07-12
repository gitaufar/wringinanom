// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // ✅ Contoh: Menyimpan adminId ke header (opsional)
    const res = NextResponse.next();
    res.headers.set("x-admin-id", String(payload.id));
    return res;
  } catch (err) {
    console.error("Token tidak valid:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"], // Proteksi semua route /admin/*
};
