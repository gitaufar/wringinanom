import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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

  // ✅ Buat token JWT
  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  const res = NextResponse.json({
    message: "Login berhasil",
    admin: {
      id: admin.id,
      nama: admin.nama,
      email: admin.email,
    },
  });

  // ✅ Simpan token ke cookies
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "strict",
  });

  return res;
}
