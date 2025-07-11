import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: {
    no_resi: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  const { no_resi } = params;

  try {
    const riwayatLayanan = await prisma.riwayatLayanan.findUnique({
      where: { no_resi },
    });

    if (!riwayatLayanan) {
      return NextResponse.json({ error: "Riwayat layanan tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(riwayatLayanan);
  } catch (error) {
    console.error("Gagal mengambil data riwayat layanan:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}