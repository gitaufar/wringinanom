// src/app/api/login/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email dan password wajib diisi" },
      { status: 400 }
    );
  }

  const admin = await prisma.admin.findFirst({
    where: {
      email,
      password,
    },
  });

  if (!admin) {
    return NextResponse.json(
      { error: "Email atau password salah" },
      { status: 401 }
    );
  }

  const token = `${admin.id}-${admin.email}`;

  const res = NextResponse.json({
    message: "Login berhasil",
    admin: {
      id: admin.id,
      nama: admin.nama,
      email: admin.email,
    },
  });

  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "strict",
  });

  return res;
}
