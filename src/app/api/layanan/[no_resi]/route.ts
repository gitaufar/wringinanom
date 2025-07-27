import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Interface untuk request body PUT
interface UpdateKeteranganRequest {
  keterangan: string;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const no_resi: string | undefined = request.nextUrl.pathname.split("/").pop(); // Ambil dari URL

  if (!no_resi) {
    return NextResponse.json(
      { error: "No Resi tidak ditemukan di URL" },
      { status: 400 }
    );
  }

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

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const no_resi: string | undefined = request.nextUrl.pathname.split("/").pop();

  if (!no_resi) {
    return NextResponse.json(
      { error: "No Resi tidak ditemukan di URL" },
      { status: 400 }
    );
  }

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

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const no_resi: string | undefined = request.nextUrl.pathname.split("/").pop();

  if (!no_resi) {
    return NextResponse.json(
      { error: "No Resi tidak ditemukan di URL" },
      { status: 400 }
    );
  }

  try {
    // Type assertion untuk request body
    const body = (await request.json()) as UpdateKeteranganRequest;
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
