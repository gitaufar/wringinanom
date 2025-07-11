// src/app/api/penduduk/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const riwayatLayanan = await prisma.riwayatLayanan.findMany();
    return NextResponse.json(riwayatLayanan);
  } catch (error) {
    console.error("Failed to fetch penduduk:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nik, keterangan } = body;

    if (!nik || !keterangan) {
      return NextResponse.json({ error: "NIK dan keterangan wajib diisi" }, { status: 400 });
    }

    const penduduk = await prisma.penduduk.findUnique({
      where: { nik },
    });

    if (!penduduk) {
      return NextResponse.json({ error: "NIK tidak ditemukan di database" }, { status: 404 });
    }

    const noResi = `RWS-${Date.now()}`;

    const riwayat = await prisma.riwayatLayanan.create({
      data: {
        no_resi: noResi,
        nik,
        date: new Date(),
        keterangan,
        status: "Menunggu",
      },
    });

    return NextResponse.json({ message: "Berhasil membuat pengajuan layanan", riwayat });
  } catch (error) {
    console.error("Gagal tambah riwayat:", error);
    return NextResponse.json({ error: "Terjadi kesalahan, gagal membuat pengajuan layanan silahkan coba lagi" }, { status: 500 });
  }
}

