import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { no_resi, admin_id, status_baru } = body;

    console.log("🟢 Input diterima:", body);

    if (!no_resi || !admin_id || !status_baru) {
      return NextResponse.json(
        { error: "Data tidak lengkap. no_resi, admin_id, status_baru wajib diisi." },
        { status: 400 }
      );
    }

    const riwayat = await prisma.riwayatLayanan.findUnique({
      where: { no_resi },
    });

    if (!riwayat) {
      return NextResponse.json({ error: "Resi tidak ditemukan" }, { status: 404 });
    }

    const status_lama = riwayat.status;

    const update = await prisma.riwayatLayanan.update({
      where: { no_resi },
      data: { status: status_baru },
    });

    console.log("✅ Status diperbarui:", update);

    const log = await prisma.logPerubahanStatus.create({
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
      message: "Status berhasil diperbarui",
      status_lama,
      status_baru,
    });
  } catch (error: any) {
    console.error("❌ INTERNAL ERROR:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
