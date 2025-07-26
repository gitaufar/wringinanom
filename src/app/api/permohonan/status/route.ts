// api/permohonan/status/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { no_resi, status_baru } = body;

    console.log("🟢 Input diterima:", body);

    if (!no_resi || !status_baru) {
      return NextResponse.json(
        { error: "Data tidak lengkap. no_resi dan status_baru wajib diisi." },
        { status: 400 }
      );
    }

    const token = req.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DecodedToken;
    } catch {
      return NextResponse.json({ error: "Token tidak valid" }, { status: 401 });
    }

    const admin_id = Number(decoded.id);

    const riwayat = await prisma.riwayatlayanan.findUnique({
      where: { no_resi },
    });

    if (!riwayat) {
      return NextResponse.json(
        { error: "Resi tidak ditemukan" },
        { status: 404 }
      );
    }

    const status_lama = riwayat.status;

    // ✅ Update status di riwayatlayanan
    const updateRiwayat = await prisma.riwayatlayanan.update({
      where: { no_resi },
      data: { status: status_baru },
    });

    console.log("✅ Status riwayat diperbarui:", updateRiwayat);

    const log = await prisma.logperubahanstatus.create({
      data: {
        no_resi,
        admin_id,
        status_lama,
        status_baru,
        waktu_perubahan: new Date(),
      },
    });

    console.log("📝 Log ditambahkan:", log);

    return NextResponse.json({
      message: "Status berhasil diperbarui di riwayat dan permohonan",
      status_lama,
      status_baru,
    });
  } catch (error) {
    console.error("❌ INTERNAL ERROR:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET(_: NextRequest) {
  try {
    const data = await prisma.permohonansurat.findMany({
      include: {
        penduduk: true,
      },
      orderBy: {
        tanggal: "desc",
      },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error("❌ ERROR:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Terjadi kesalahan server",
      },
      { status: 500 }
    );
  }
}
