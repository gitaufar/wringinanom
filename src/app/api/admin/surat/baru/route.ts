// src/app/api/admin/surat/baru/route.ts

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { prisma } from "@/lib/prisma";

// --- HELPER FUNCTIONS ---

/**
 * Fungsi untuk memformat tanggal menjadi format lokal Indonesia (e.g., 28 Juli 2025)
 * @param date - Objek Date atau string tanggal
 * @returns Tanggal yang sudah diformat atau string kosong jika input tidak valid
 */
function formatTanggal(date: Date | string | null | undefined): string {
    if (!date) return "-";
    try {
        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    } catch (error) {
        console.error("Invalid date for formatting:", date);
        return "-";
    }
}

// --- API ROUTE HANDLER (GET) ---

export async function GET(req: NextRequest): Promise<NextResponse> {
  // 1. Ambil NIK dan Jenis Surat dari Query Parameters URL
  const searchParams = req.nextUrl.searchParams;
  const nik = searchParams.get("nik");
  const tipe = searchParams.get("jenis"); // 'jenis' dari URL kita sebut 'tipe' di sini

  // Validasi input
  if (!nik || !tipe) {
    return NextResponse.json(
      { error: "Query parameter 'nik' dan 'jenis' wajib diisi." },
      { status: 400 }
    );
  }

  // Daftar file template berdasarkan tipe surat
  const templateFiles: { [key: string]: string } = {
    "SK Anak Kandung": "A.01.01_Surat_Keterangan_Anak_Kandung_(FINAL).docx",
    "Beda Identitas": "A.01.03_Surat_Keterangan_Beda_Identitas_Formal_(FINAL).docx",
    "belum-nikah": "A.01.04_Surat_Keterangan_Belum_Nikah_(FINAL).docx",
    "biodata-penduduk": "A.01.05_Surat_Keterangan_Biodata_Penduduk_(FINAL).docx",
    "cerai-mati": "A.01.06_Surat_Keterangan_Cerai_Mati_(FINAL).docx",
    "ditinggal-pasangan": "A.01.07_Surat_Keterangan_Ditinggal_Suami_Atau_Istri_(FINAL).docx",
    "duda-janda": "A.01.08_Surat_Keterangan_Duda_Janda_{FINAL}.docx",
    "identitas": "A.01.09_Surat_Keterangan_Identitas_(FINAL).docx",
    "kematian": "A.01.11_Surat_Keterangan_Kematian_(FINAL).docx",
    "pindah-tempat": "A.01.12_Surat_Keterangan_Pindah_Tempat_(FINAL).docx",
    "status": "A.01.13_Surat_Keterangan_Status_(FINAL).docx",
    "tidak-diketahui": "A.01.14_Surat_Keterangan_Tidak_Diketahui_Keberadaannya_(FINAL).docx",
    "penambahan-anggota": "A.01.15_Surat_Penambahan_Anggota_Keluarga_(FINAL).docx",
    "pernyataan-kelahiran": "A.01.16_Surat_Pernyataan_Kelahiran_(FINAL).docx",
    "panggilan": "A.03.01_Surat_Keterangan_Panggilan_(FINAL).docx",
    "tidak-keberatan": "A.03.02_Surat_Keterangan_Tidak_Keberatan_(FINAL).docx",
    "catatan-kepolisian": "A.04.01_Surat_Keterangan_Catatan_Kepolisian_(FINAL).docx",
    "kehilangan-kepolisian": "A.04.02_Surat_Keterangan_Kehilangan_Kepolisian_(FINAL).docx",
    "pengantar": "A.04.03_Surat_Pengantar_(FINAL).docx",
    "tidak-mampu": "B.01.01_Surat_Keterangan_Tidak_Mampu_(A4)_(FINAL).docx",
    "wali-nikah": "B.02.01_Surat_Keterangan_Wali_Nikah_(A4)_(FINAL).docx",
    "wali-murid": "B.03.03_Surat_Keterangan_Wali_Murid_(A4)_(FINAL).docx",
    "domisili": "C.01.01_Surat_Keterangan_Domisili.docx",
    "kuasa": "C.01.02_Surat_Keterangan_Kuasa.docx",
    "objek": "C.01.03_Surat_Keterangan_Objek.docx",
    "penghasilan": "Surat_Keterangan_Penghasilan_Admin.docx",
    "usaha": "C.01.05_Surat_Keterangan_Usaha.docx",
  };

  const pathFile = templateFiles[tipe];

  if (!pathFile) {
    return NextResponse.json(
      { error: `Jenis surat tidak dikenali: ${tipe}` },
      { status: 400 }
    );
  }

  try {
    // 2. Ambil data penduduk dari database
    const penduduk = await prisma.penduduk.findUnique({
      where: { nik },
    });

    if (!penduduk) {
      return NextResponse.json(
        { error: `Penduduk dengan NIK ${nik} tidak ditemukan` },
        { status: 404 }
      );
    }

    // 3. Siapkan semua data yang dibutuhkan dari database
    const dataToRender = {
      Nama: penduduk.nama_lengkap,
      NIK: penduduk.nik,
      No_KK: penduduk.no_kk,
      Nama_Ibu: penduduk.nama_ibu,
      Nama_Ayah: penduduk.nama_ayah,
      Nama_Orangtua: penduduk.nama_ayah,
      Jenis_Kelamin: penduduk.jenis_kelamin,
      Kota: penduduk.tempat_lahir,
      Tanggal_Lahir: formatTanggal(penduduk.tanggal_lahir),
      Alamat: penduduk.alamat,
      RT: penduduk.rt,
      RW: penduduk.rw,
      Pekerjaan: penduduk.pekerjaan,
      Agama: penduduk.agama,
      Pendidikan: penduduk.pendidikan,
      Status_Keluarga: penduduk.status_keluarga,
      Status_Perkawinan: penduduk.status_perkawinan,
      Tanggal_Perkawinan: formatTanggal(penduduk.tanggal_perkawinan),
      Tanggal_Surat: formatTanggal(new Date()),
      Tahun_Surat: new Date().getFullYear(),
    };

    // 4. Baca template dan proses dokumen
    const templatePath = path.join(process.cwd(), "templates", pathFile);
    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    doc.setData(dataToRender);
    doc.render();

    const buffer = doc.getZip().generate({ type: "nodebuffer" });

    // 5. Kirim response file docx
    const safePersonName = (penduduk.nama_lengkap || "penduduk")
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    const outputFilename = `${tipe}_${safePersonName}.docx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${outputFilename}"`,
      },
    });
  } catch (err: unknown) {
    console.error("Gagal generate surat untuk admin:", err);
    let errorMessage = "Gagal generate surat";
    if (err instanceof Error) {
      errorMessage = `Server error: ${err.message}`;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
