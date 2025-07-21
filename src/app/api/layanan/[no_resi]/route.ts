import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: {
    no_resi: string;
  };
};

export async function GET(_request: Request, { params }: Params) {
  const { no_resi } = params;
  console.log("Menerima no_resi:", no_resi);

  try {
    const riwayatLayanan = await prisma.riwayatLayanan.findUnique({
      where: { no_resi },
      include: {
        penduduk: true,
      },
    });

    if (!riwayatLayanan) {
      return NextResponse.json(
        { error: "Riwayat layanan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: riwayatLayanan });
  } catch (error) {
    console.error("Gagal mengambil data riwayat layanan:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { no_resi } = params;

  console.log("No Resi yang diterima:", no_resi);

  try {
    await prisma.riwayatLayanan.delete({
      where: { no_resi },
    });

    return NextResponse.json({ message: "Riwayat berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus riwayat:", error);
    return NextResponse.json(
      { error: "Gagal menghapus riwayat layanan" },
      { status: 500 }
    );
  }
}
