import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: {
    nik: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  const { nik } = params;

  try {
    const penduduk = await prisma.penduduk.findUnique({
      where: { nik },
    });

    if (!penduduk) {
      return NextResponse.json({ error: "Penduduk tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(penduduk);
  } catch (error) {
    console.error("Gagal mengambil data penduduk:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const { nik } = params;

  try {
    const existing = await prisma.penduduk.findUnique({
      where: { nik },
    });

    if (!existing) {
      return NextResponse.json({ error: "Penduduk tidak ditemukan" }, { status: 404 });
    }

    await prisma.penduduk.delete({
      where: { nik },
    });

    return NextResponse.json({ message: "Penduduk berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus penduduk:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
