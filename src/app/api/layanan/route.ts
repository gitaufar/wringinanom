// src/app/api/layanan/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const riwayatlayanan = await prisma.riwayatlayanan.findMany({
      include: {
        penduduk: true,
      },
    });

    return NextResponse.json(riwayatlayanan);
  } catch (error) {
    console.error("Failed to fetch penduduk:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const noResi = searchParams.get("no_resi");

    if (!noResi) {
      return NextResponse.json(
        { error: "no_resi wajib disertakan" },
        { status: 400 }
      );
    }

    const existing = await prisma.riwayatlayanan.findUnique({
      where: { no_resi: noResi },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    await prisma.riwayatlayanan.delete({
      where: { no_resi: noResi },
    });

    return NextResponse.json({ message: "Riwayat layanan berhasil dihapus" });
  } catch (error) {
    console.error("Gagal hapus riwayat:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghapus data" },
      { status: 500 }
    );
  }
}
