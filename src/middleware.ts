// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get("admin_token")?.value;
  const isLoginPage = req.nextUrl.pathname === "/login";
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // Belum login → jika akses /admin/*, redirect ke /login
  if (!token) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next(); // Boleh akses /login dan route lain
  }

  // Token ada → verifikasi
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // ✅ Sudah login, tapi akses /login → redirect ke dashboard
    if (isLoginPage) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    // (Opsional) simpan adminId di header untuk handler/layout
    const res = NextResponse.next();
    res.headers.set("x-admin-id", String(payload.id));
    return res;
  } catch (err) {
    console.error("Token tidak valid:", err);

    // Token rusak → redirect ke /login
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next(); // tetap biarkan akses ke halaman umum
  }
}

export const config = {
  matcher: ["/admin/:path*", "/login"], // Middleware aktif di /admin/* dan /login
};
