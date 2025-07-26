import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: { no_resi: string } }
) {
  const { no_resi } = context.params;
  console.log("Menerima no_resi:", no_resi);

  try {
    const riwayatlayanan = await prisma.riwayatlayanan.findUnique({
      where: { no_resi },
      include: {
        penduduk: true,
      },
    });

    if (!riwayatlayanan) {
      return NextResponse.json(
        { error: "Riwayat layanan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: riwayatlayanan });
  } catch (error) {
    console.error("Gagal mengambil data riwayat layanan:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: { params: { no_resi: string } }
) {
  const { no_resi } = context.params;
  console.log("No Resi yang diterima:", no_resi);

  try {
    await prisma.riwayatlayanan.delete({
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

export async function PUT(
  request: Request,
  context: { params: { no_resi: string } }
) {
  const { no_resi } = context.params;

  try {
    const body = await request.json();
    const { keterangan } = body;

    if (!keterangan) {
      return NextResponse.json(
        { error: "Keterangan wajib diisi" },
        { status: 400 }
      );
    }

    const updatedRiwayat = await prisma.riwayatlayanan.update({
      where: { no_resi },
      data: {
        keterangan,
      },
    });

    return NextResponse.json({
      message: "Keterangan berhasil diperbarui",
      data: updatedRiwayat,
    });
  } catch (error) {
    console.error("Gagal memperbarui keterangan:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memperbarui keterangan" },
      { status: 500 }
    );
  }
}
