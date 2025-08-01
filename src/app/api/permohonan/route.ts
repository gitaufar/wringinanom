import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// Define types for the request body
interface PostRequestBody {
  no_wa: string;
  nik: string;
  jenis_surat: string;
  tipe: string;
  data_dinamis?: Prisma.InputJsonValue;
}

// Auto-generate no_resi seperti: RWS-1712345678901
const generateResi = (): string => {
  return `RWS-${Date.now()}`;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as PostRequestBody;
    const { no_wa, nik, jenis_surat, tipe, data_dinamis } = body;

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
    const dateIndonesia = new Date(Date.now() + 7 * 60 * 60 * 1000); // offset 7 jam dari UTC (WIB)

    // Buat entri RiwayatLayanan
    await prisma.riwayatlayanan.create({
      data: {
        no_wa: no_wa,
        no_resi: noResi,
        nik,
        date: dateIndonesia,
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
        no_wa: no_wa,
        tanggal: dateIndonesia,
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

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const noResi = searchParams.get("no_resi");
    const jenis = searchParams.get("jenis");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Jika ada no_resi, return data spesifik (tidak perlu pagination)
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

    // Validasi pagination parameters
    const currentPage = Math.max(1, page);
    const pageSize = Math.min(Math.max(1, limit), 100); // Max 100 items per page
    const skip = (currentPage - 1) * pageSize;

    // Filter berdasarkan jenis surat jika ada
    const filter = jenis ? { jenis_surat: { equals: jenis } } : undefined;

    // Hitung total data untuk pagination info
    const totalCount = await prisma.permohonansurat.count({
      where: filter,
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    // Ambil data dengan pagination
    const allPermohonan = await prisma.permohonansurat.findMany({
      where: filter,
      include: {
        penduduk: true,
        riwayatlayanan: true,
      },
      orderBy: { tanggal: "desc" },
      skip: skip,
      take: pageSize,
    });

    // Response dengan pagination info
    return NextResponse.json({
      data: allPermohonan,
      pagination: {
        currentPage,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    });
  } catch (error) {
    console.error("❌ Internal Error GET /api/permohonan:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
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
  } catch (error) {
    console.error("❌ Gagal menghapus permohonan:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
