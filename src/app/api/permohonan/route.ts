import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Auto-generate no_resi seperti: RWS-1712345678901
const generateResi = () => {
  return `RWS-${Date.now()}`;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nik, jenis_surat, tipe, data_dinamis } = body;

    if (!nik || !jenis_surat || !tipe) {
      return NextResponse.json(
        { error: "NIK, jenis_surat, dan tipe wajib diisi" },
        { status: 400 }
      );
    }

    // Validasi apakah penduduk ada
    const penduduk = await prisma.penduduk.findUnique({
      where: { nik },
    });

    if (!penduduk) {
      return NextResponse.json(
        { error: "NIK tidak ditemukan" },
        { status: 404 }
      );
    }

    const noResi = generateResi();

    // Buat entri RiwayatLayanan
    await prisma.riwayatlayanan.create({
      data: {
        no_resi: noResi,
        nik,
        date: new Date(),
        tipe: jenis_surat,
        keterangan: "Menunggu diproses",
        status: "Menunggu",
        data_dinamis: data_dinamis, // opsional
      },
    });

    // Buat entri PermohonanSurat
    const permohonan = await prisma.permohonansurat.create({
      data: {
        nik,
        jenis_surat,
        tipe,
        data_dinamis,
        no_resi: noResi,
      },
    });

    return NextResponse.json({
      message: "Permohonan surat berhasil disimpan",
      permohonan,
    });
  } catch (error) {
    console.error("Gagal membuat permohonan surat:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const noResi = searchParams.get("no_resi");
    const jenis = searchParams.get("jenis");

    if (noResi) {
      const permohonan = await prisma.permohonansurat.findUnique({
        where: { no_resi: noResi },
        include: {
          penduduk: true,
          riwayatlayanan: true,
        },
      });

      if (!permohonan) {
        return NextResponse.json(
          { error: "Data tidak ditemukan untuk resi tersebut" },
          { status: 404 }
        );
      }

      return NextResponse.json({ data: permohonan });
    }

    const filter = jenis ? { jenis_surat: { equals: jenis } } : undefined;

    const allPermohonan = await prisma.permohonansurat.findMany({
      where: filter,
      include: {
        penduduk: true,
        riwayatlayanan: true,
      },
      orderBy: { tanggal: "desc" },
    });

    return NextResponse.json({ data: allPermohonan });
  } catch (error: any) {
    console.error("❌ Internal Error GET /api/permohonan:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Tambahkan di bawah export GET(...)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const noResi = searchParams.get("no_resi");

    if (!noResi) {
      return NextResponse.json(
        { error: "no_resi wajib disertakan" },
        { status: 400 }
      );
    }

    const deletedPermohonan = await prisma.permohonansurat.delete({
      where: { no_resi: noResi },
    });

    return NextResponse.json({
      message: `Permohonan dan riwayat dengan resi ${noResi} berhasil dihapus`,
      deleted: deletedPermohonan,
    });
  } catch (error: any) {
    console.error("❌ Gagal menghapus permohonan:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
