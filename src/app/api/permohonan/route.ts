import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Auto-generate no_resi seperti: RWS-1712345678901
const generateResi = () => {
  return `RWS-${Date.now()}`;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nik, jenis_surat, tipe, keterangan, data_dinamis } = body;

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
    await prisma.riwayatLayanan.create({
      data: {
        no_resi: noResi,
        nik,
        date: new Date(),
        keterangan: keterangan || `Pengajuan surat ${jenis_surat}`,
        status: "Menunggu",
      },
    });

    // Buat entri PermohonanSurat
    const permohonan = await prisma.permohonanSurat.create({
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
    const jenis = searchParams.get("jenis");

    const filter = jenis
      ? {
          jenis_surat: {
            equals: jenis,
          },
        }
      : undefined;

    const permohonan = await prisma.permohonanSurat.findMany({
      where: filter,
      include: {
        penduduk: true,
        riwayat: true,
      },
      orderBy: {
        tanggal: "desc",
      },
    });

    return NextResponse.json({ data: permohonan });
  } catch (error: any) {
    console.error("❌ Internal Error GET /api/permohonan:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* contouh penggunaan post permohonan
const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nik,
          jenis_surat: jenisSurat,
          keterangan,
          data_dinamis: {
            nama_dipakai: namaDipakai,
            nama_alias: namaAlias,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat permohonan");
      }

      setResponse(`✅ Berhasil: Resi = ${data.permohonan.no_resi}`);
    } catch (err: any) {
      setError(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  */

/** contoh pemakaian get
   * const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const res = await fetch(`/api/permohonan?jenis=${encodeURIComponent(jenisSurat)}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Gagal mengambil data permohonan");
      }

      setData(result.data);
    } catch (err: any) {
      setError(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
   */
