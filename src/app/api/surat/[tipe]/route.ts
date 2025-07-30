// src/app/api/surat/[tipe]/route.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { terbilang } from "angka-menjadi-terbilang";

interface DocxTemplaterErrorProperties {
  explanation: string;
}

interface DocxTemplaterError extends Error {
  properties?: {
    errors?: DocxTemplaterErrorProperties[];
  };
}
/**
 * Defines the shape of the route's parameters for Next.js 15
 * In Next.js 15, params is a Promise that needs to be awaited
 */
interface RouteProps {
  params: Promise<{
    tipe: string;
  }>;
}

/**
 * A comprehensive interface for all possible fields in the request body.
 * All fields are optional ('?') because their presence depends on the letter type ('tipe').
 * This is the key change to prevent TypeScript errors related to the 'any' type from `req.json()`.
 */
interface SuratData {
  nama?: string;
  namaAnak?: string;
  kotaAnak?: string;
  tanggalLahirAnak?: string;
  alamatAnak?: string;
  namaIbu?: string;
  kotaIbu?: string;
  tanggalLahirIbu?: string;
  pekerjaanIbu?: string;
  alamatIbu?: string;
  angkaNum?: number;
  angkaNum2?: number;
  namaAyah?: string;
  kotaAyah?: string;
  tanggalLahirAyah?: string;
  pekerjaanAyah?: string;
  alamatAyah?: string;
  namaSekarang?: string;
  kota?: string;
  tanggalLahir?: string;
  jenisKelamin?: string;
  negara?: string;
  agama?: string;
  pekerjaan?: string;
  nik?: string;
  alamat?: string;
  namaLama?: string;
  noKK?: string;
  kewarganegaraan?: string;
  golDarah?: string;
  statusPerkawinan?: string;
  pendidikan?: string;
  statusKeluarga?: string;
  nikIbu?: string;
  nikAyah?: string;
  alamatLama?: string;
  alamatBaru?: string;
  noPaspor?: string;
  tglBerakhirPaspor?: string;
  noAktaKelahiran?: string;
  noAktaPerkawinan?: string;
  tglPerkawinan?: string;
  noAktaPerceraian?: string;
  tglPerceraian?: string;
  status?: string;
  tujuan?: string;
  nama1?: string;
  umur1?: number;
  pekerjaan1?: string;
  alamat1?: string;
  statusPasangan2?: string;
  nama2?: string;
  umur2?: number;
  pekerjaan2?: string;
  alamat2?: string;
  lamaTahun?: number;
  lamaBulan?: number;
  namaDok1?: string;
  dok1?: string;
  dok2?: string;
  namaDok2?: string;
  namaOrangTua?: string;
  hari?: string;
  tanggalKematian?: string;
  waktuKematian?: string;
  tempatKematian?: string;
  penyebabKematian?: string;
  alamatKematian?: string;
  namaOrangtua?: string;
  namaIstriSiri?: string;
  namaOrangtuaIstriSiri?: string;
  umur?: number;
  tanggalHilang?: string;
  bulanHilang?: string;
  tahunHilang?: string;
  namaKepalaKeluarga?: string;
  namaAnggota?: string;
  kotaAnggota?: string;
  tanggalLahirAnggota?: string;
  hubunganDalamKeluarga?: string;
  alamatAnggota?: string;
  jam?: string;
  kotaLahirAyah?: string;
  kotaLahirIbu?: string;
  nomorKK?: string;
  nikAnak?: string;
  jenisKelaminAnak?: string;
  statusPerkawinanAnak?: string;
  pekerjaanAnak?: string;
  agamaAnak?: string;
  alamatTujuan?: string;
  orangtua?: string;
  pendidikanTerakhir?: string;
  namaBarang?: string;
  lokasiKehilangan?: string;
  tanggalKehilangan?: string;
  jamKehilangan?: string;
  pengajuan?: string;
  dusun?: string;
  hubunganKeluarga?: string;
  kelaminMempelai?: string;
  kelasRomawi?: string;
  kelasHuruf?: string;
  sekolah?: string;
  namaPemberi?: string;
  kotaPemberi?: string;
  tanggalLahirPemberi?: string;
  pekerjaanPemberi?: string;
  nikPemberi?: string;
  alamatPemberi?: string;
  namaPenerima?: string;
  kotaPenerima?: string;
  tanggalLahirPenerima?: string;
  pekerjaanPenerima?: string;
  nikPenerima?: string;
  alamatPenerima?: string;
  hubungan?: string;
  keperluan?: string;
  namaWajibPajak?: string;
  nop?: string;
  alamatObjekPajak?: string;
  alamatWajibPajak?: string;
  luas?: number;
  njop?: number;
  totalNJOP?: number;
  tahunDataPBB?: number;
  tahunBelumTerbit?: number;
  tujuanPengajuan?: string;
  namaDusun?: string;
  penghasilan?: number;
}

function isDocxTemplaterError(error: unknown): error is DocxTemplaterError {
  return (
    error instanceof Error &&
    typeof (error as DocxTemplaterError).properties === "object" &&
    (error as DocxTemplaterError).properties !== null &&
    Array.isArray((error as DocxTemplaterError).properties?.errors)
  );
}

export async function POST(
  _req: NextRequest,
  props: RouteProps // Use the strongly-typed props
): Promise<NextResponse> {
  // Await the params since they're now a Promise in Next.js 15
  const { tipe } = await props.params;
  let pathFile = "";

  // This switch determines the DOCX template file based on the 'tipe' parameter.
  switch (tipe) {
    case "SK Anak Kandung":
      pathFile = "A.01.01_Surat_Keterangan_Anak_Kandung_(FINAL).docx";
      break;
    case "Beda Identitas":
      pathFile = "A.01.03_Surat_Keterangan_Beda_Identitas_Formal_(FINAL).docx";
      break;
    case "belum_nikah":
      pathFile = "A.01.04_Surat_Keterangan_Belum_Nikah_(FINAL).docx";
      break;
    case "biodata_penduduk":
      pathFile = "A.01.05_Surat_Keterangan_Biodata_Penduduk_(FINAL).docx";
      break;
    case "cerai_mati":
      pathFile = "A.01.06_Surat_Keterangan_Cerai_Mati_(FINAL).docx";
      break;
    case "ditinggal_pasangan":
      pathFile =
        "A.01.07_Surat_Keterangan_Ditinggal_Suami_Atau_Istri_(FINAL).docx";
      break;
    case "duda_janda":
      pathFile = "A.01.08_Surat_Keterangan_Duda_Janda_(FINAL).docx"; // Corrected filename
      break;
    case "identitas":
      pathFile = "A.01.09_Surat_Keterangan_Identitas_(FINAL).docx";
      break;
    case "kematian":
      pathFile = "A.01.11_Surat_Keterangan_Kematian_(FINAL).docx";
      break;
    case "pindah_tempat":
      pathFile = "A.01.12_Surat_Keterangan_Pindah_Tempat_(FINAL).docx";
      break;
    case "status":
      pathFile = "A.01.13_Surat_Keterangan_Status_(FINAL).docx";
      break;
    case "tidak_diketahui":
      pathFile =
        "A.01.14_Surat_Keterangan_Tidak_Diketahui_Keberadaannya_(FINAL).docx";
      break;
    case "penambahan_anggota":
      pathFile = "A.01.15_Surat_Penambahan_Anggota_Keluarga_(FINAL).docx";
      break;
    case "pernyataan_kelahiran":
      pathFile = "A.01.16_Surat_Pernyataan_Kelahiran_(FINAL).docx";
      break;
    case "panggilan":
      pathFile = "A.03.01_Surat_Keterangan_Panggilan_(FINAL).docx";
      break;
    case "tidak_keberatan":
      pathFile = "A.03.02_Surat_Keterangan_Tidak_Keberatan_(FINAL).docx";
      break;
    case "catatan_kepolisian":
      pathFile = "A.04.01_Surat_Keterangan_Catatan_Kepolisian_(FINAL).docx";
      break;
    case "kehilangan_kepolisian":
      pathFile = "A.04.02_Surat_Keterangan_Kehilangan_Kepolisian_(FINAL).docx";
      break;
    case "pengantar":
      pathFile = "A.04.03_Surat_Pengantar_(FINAL).docx";
      break;
    case "tidak_mampu":
      pathFile = "B.01.01_Surat_Keterangan_Tidak_Mampu_(A4)_(FINAL).docx";
      break;
    case "wali_nikah":
      pathFile = "B.02.01_Surat_Keterangan_Wali_Nikah_(A4)_(FINAL).docx";
      break;
    case "wali_murid":
      pathFile = "B.03.03_Surat_Keterangan_Wali_Murid_(A4)_(FINAL).docx";
      break;
    case "domisili":
      pathFile = "C.01.01_Surat_Keterangan_Domisili.docx";
      break;
    case "kuasa":
      pathFile = "C.01.02_Surat_Keterangan_Kuasa.docx";
      break;
    case "objek":
      pathFile = "C.01.03_Surat_Keterangan_Objek.docx";
      break;
    case "penghasilan":
      pathFile = "C.01.04_Surat_Keterangan_Penghasilan.docx";
      break;
    case "Surat Keterangan Usaha":
      pathFile = "C.01.05_Surat_Keterangan_Usaha.docx";
      break;
    default:
      console.log("❌ Tipe surat tidak dikenali:", tipe);
      return NextResponse.json(
        { error: "Tipe surat tidak dikenali" },
        { status: 400 }
      );
  }

  try {
    // Cast the request body to the 'SuratData' interface to ensure type safety.
    const body = (await _req.json()) as SuratData;

    const templatePath = path.join(process.cwd(), "templates", pathFile);
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const tanggalSurat = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    // Set data for the template. All data from 'body' is now type-safe.
    // The nullish coalescing operator (??) provides default values for optional fields.
    switch (tipe) {
      case "SK Anak Kandung":
        doc.setData({
          Nama_Anak: body.namaAnak,
          Kota_Anak: body.kotaAnak,
          Tanggal_Lahir_Anak: body.tanggalLahirAnak,
          Alamat_Anak: body.alamatAnak,
          Nama_Ibu: body.namaIbu,
          Kota_Ibu: body.kotaIbu,
          Tanggal_Lahir_Ibu: body.tanggalLahirIbu,
          Pekerjaan_Ibu: body.pekerjaanIbu,
          Alamat_Ibu: body.alamatIbu,
          Angka_Num: body.angkaNum,
          Angka_Str: body.angkaNum,
          Angka_Num2: body.angkaNum2,
          Angka_Str2: body.angkaNum2,
          Nama_Ayah: body.namaAyah,
          Kota_Ayah: body.kotaAyah,
          Tanggal_Lahir_Ayah: body.tanggalLahirAyah,
          Pekerjaan_Ayah: body.pekerjaanAyah,
          Alamat_Ayah: body.alamatAyah,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "Beda Identitas":
        doc.setData({
          Nama_Sekarang: body.namaSekarang,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Jenis_Kelamin: body.jenisKelamin,
          Negara: body.negara,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          NIK: body.nik,
          Alamat: body.alamat,
          Nama_Lama: body.namaLama,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "belum_nikah":
        doc.setData({
          Nama: body.nama,
          NIK: body.nik,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          No_KK: body.noKK,
          Agama: body.agama,
          Alamat: body.alamat,
          Negara: body.kewarganegaraan,
          Jenis_Kelamin: body.jenisKelamin,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "biodata_penduduk":
        doc.setData({
          Nama: body.nama,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Jenis_Kelamin: body.jenisKelamin,
          Gol_Darah: body.golDarah,
          Agama: body.agama,
          Status_Perkawinan: body.statusPerkawinan,
          Pekerjaan: body.pekerjaan,
          Pendidikan: body.pendidikan,
          Status_Keluarga: body.statusKeluarga,
          NIK_Ibu: body.nikIbu,
          Nama_Ibu: body.namaIbu,
          NIK_Ayah: body.nikAyah,
          Nama_Ayah: body.namaAyah,
          Alamat_Lama: body.alamatLama,
          Alamat_Baru: body.alamatBaru,
          No_KK: body.noKK,
          No_Paspor: body.noPaspor ?? "-",
          Tgl_Berakhir_Paspor: body.tglBerakhirPaspor ?? "-",
          No_Akta_Kelahiran: body.noAktaKelahiran,
          No_Akta_Perkawinan: body.noAktaPerkawinan ?? "-",
          Tgl_Perkawinan: body.tglPerkawinan ?? "-",
          No_Akta_Perceraian: body.noAktaPerceraian ?? "-",
          Tgl_Perceraian: body.tglPerceraian ?? "-",
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "cerai_mati":
        doc.setData({
          Nama: body.nama,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Jenis_Kelamin: body.jenisKelamin,
          Agama: body.agama,
          NIK: body.nik,
          Alamat: body.alamat,
          Status: body.jenisKelamin === "Laki-laki" ? "Duda" : "Janda",
          Tujuan: body.tujuan,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "ditinggal_pasangan":
        doc.setData({
          Nama_1: body.nama1,
          Umur_1: body.umur1,
          Pekerjaan_1: body.pekerjaan1,
          Alamat_1: body.alamat1,
          Status_Pasangan_1:
            body.statusPasangan2 === "Istri" ? "Suami" : "Istri",
          Nama_2: body.nama2,
          Umur_2: body.umur2,
          Pekerjaan_2: body.pekerjaan2,
          Alamat_2: body.alamat2,
          Status_Pasangan_2: body.statusPasangan2,
          Lama_Tahun: body.lamaTahun,
          Lama_Bulan: body.lamaBulan,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "duda_janda":
        doc.setData({
          Nama_Ibu: body.nama,
          Kota_Ibu: body.kota,
          Tanggal_Lahir_Ibu: body.tanggalLahir,
          NIK: body.nik,
          No_KK: body.noKK,
          Jenis_Kelamin: body.jenisKelamin,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          Alamat: body.alamat,
          Negara: body.negara,
          Status_Perkawinan: body.status,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "identitas":
        doc.setData({
          Nama_Dok1: body.namaDok1,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Jenis_Kelamin: body.jenisKelamin,
          Agama: body.agama,
          NIK: body.nik,
          No_KK: body.noKK,
          Alamat: body.alamat,
          Dok_1: body.dok1,
          Dok_2: body.dok2,
          Status: body.status,
          Nama_Dok2: body.namaDok2,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "kematian":
        doc.setData({
          Nama: body.nama,
          Nama_OrangTua: body.namaOrangTua,
          NIK: body.nik,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Jenis_Kelamin: body.jenisKelamin,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          Alamat: body.alamat,
          Hari: body.hari,
          Tanggal_Kematian: body.tanggalKematian,
          Waktu_Kematian: body.waktuKematian,
          Tempat_Kematian: body.tempatKematian,
          Penyebab_Kematian: body.penyebabKematian,
          Alamat_Kematian: body.alamatKematian,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "pindah_tempat":
        doc.setData({
          //pindah tempat skip dulu
          Nama: body.nama,
          Nama_Orangtua: body.namaOrangtua,
        });
        break;
      case "status":
        doc.setData({
          Nama: body.nama,
          Nama_Orangtua: body.namaOrangtua,
          NIK: body.nik,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Jenis_Kelamin: body.jenisKelamin,
          Status_Perkawinan: body.statusPerkawinan,
          Pekerjaan: body.pekerjaan,
          Agama: body.agama,
          Alamat: body.alamat,
          Nama_Istri_Siri: body.namaIstriSiri,
          Nama_Orangtua_Istri_Siri: body.namaOrangtuaIstriSiri,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "tidak_diketahui":
        doc.setData({
          Nama: body.nama,
          NIK: body.nik,
          NO_KK: body.noKK,
          Jenis_Kelamin: body.jenisKelamin,
          Umur: body.umur,
          Pekerjaan: body.pekerjaan,
          Alamat: body.alamat,
          Tanggal: body.tanggalHilang,
          Bulan: body.bulanHilang,
          Tahun: body.tahunHilang,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "penambahan_anggota":
        doc.setData({
          Nama_Kepala_Keluarga: body.namaKepalaKeluarga,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          Alamat: body.alamat,
          Nama_Anggota: body.namaAnggota,
          Kota_Anggota: body.kotaAnggota,
          Tanggal_Lahir_Anggota: body.tanggalLahirAnggota,
          Jenis_Kelamin: body.jenisKelamin,
          Status_Perkawinan: body.statusPerkawinan,
          Nama_Ayah: body.namaAyah,
          Nama_Ibu: body.namaIbu,
          Hubungan_Dalam_Keluarga: body.hubunganDalamKeluarga,
          Alamat_Anggota: body.alamatAnggota,
          Nama_Pembuat_Pernyataan: body.namaKepalaKeluarga,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "pernyataan_kelahiran":
        doc.setData({
          Nama_Anak: body.namaAnak,
          Jenis_Kelamin: body.jenisKelamin,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Hari: body.hari,
          Jam: body.jam,
          Agama: body.agama,
          Alamat: body.alamat,
          Angka_Num: body.angkaNum,
          Angka_Str: terbilang(body.angkaNum ?? "1"),
          Nama_Ayah: body.namaAyah,
          NIK_Ayah: body.nikAyah,
          Kota_Lahir_Ayah: body.kotaLahirAyah,
          Tanggal_Lahir_Ayah: body.tanggalLahirAyah,
          Pekerjaan_Ayah: body.pekerjaanAyah,
          Alamat_Ayah: body.alamatAyah,
          Nama_Ibu: body.namaIbu,
          NIK_Ibu: body.nikIbu,
          Kota_Lahir_Ibu: body.kotaLahirIbu,
          Tanggal_Lahir_Ibu: body.tanggalLahirIbu,
          Pekerjaan_Ibu: body.pekerjaanIbu,
          Alamat_Ibu: body.alamatIbu,
          Nomor_KK: body.noKK,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "panggilan":
        doc.setData({
          //kosong dulu
        });
        break;
      case "tidak_keberatan":
        doc.setData({
          Nama: body.nama,
          NIK: body.nik,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Jenis_Kelamin: body.jenisKelamin,
          Status_Perkawinan: body.statusPerkawinan,
          Pekerjaan: body.pekerjaan,
          Agama: body.agama,
          Alamat: body.alamat,
          Nama_Anak: body.namaAnak,
          NIK_Anak: body.nikAnak,
          Kota_Anak: body.kotaAnak,
          Tanggal_Lahir_Anak: body.tanggalLahirAnak,
          Jenis_Kelamin_Anak: body.jenisKelaminAnak,
          Status_Perkawinan_Anak: body.statusPerkawinanAnak,
          Pekerjaan_Anak: body.pekerjaanAnak,
          Agama_Anak: body.agamaAnak,
          Alamat_Anak: body.alamatAnak,
          Alamat_Tujuan: body.alamatTujuan,
          Orangtua: body.orangtua,
          Nama_Yang_Bersangkutan: body.nama,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "catatan_kepolisian":
        doc.setData({
          Nama: body.nama,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Jenis_Kelamin: body.jenisKelamin,
          Status_Perkawinan: body.statusPerkawinan,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          Pendidikan_Terakhir: body.pendidikanTerakhir,
          NIK: body.nik,
          No_KK: body.noKK,
          Alamat: body.alamat,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "kehilangan_kepolisian":
        doc.setData({
          Nama: body.nama,
          Kota: body.kota,
          NIK: body.nik,
          No_KK: body.nomorKK,
          Tanggal_Lahir: body.tanggalLahir,
          Jenis_Kelamin: body.jenisKelamin,
          Agama: body.agama,
          Alamat: body.alamat,
          Pekerjaan: body.pekerjaan,
          Nama_Barang: body.namaBarang,
          Lokasi_Kehilangan: body.lokasiKehilangan,
          Tanggal_Kehilangan: body.tanggalKehilangan,
          Jam_Kehilangan: body.jamKehilangan,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "pengantar":
        doc.setData({
          Nama: body.nama,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          NIK: body.nik,
          No_KK: body.noKK,
          Jenis_Kelamin: body.jenisKelamin,
          Agama: body.agama,
          Status_Perkawinan: body.statusPerkawinan,
          Pekerjaan: body.pekerjaan,
          Alamat: body.alamat,
          Pengajuan: body.pengajuan,
          Tujuan: body.tujuan,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "tidak_mampu":
        doc.setData({
          Nama: body.nama,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Jenis_Kelamin: body.jenisKelamin,
          Pekerjaan: body.pekerjaan,
          NIK: body.nik,
          Alamat: body.alamat,
          Dusun: body.dusun,
          Tujuan: body.tujuan,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "wali_nikah":
        doc.setData({
          Nama: body.nama,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Jenis_Kelamin: body.jenisKelamin,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          Alamat: body.alamat,
          Hubungan_Keluarga: body.hubunganKeluarga,
          Status_Keluarga: body.statusKeluarga,
          Kelamin_Mempelai: body.jenisKelamin,
          //skip dulu
        });
        break;
      case "wali_murid":
        doc.setData({
          Nama: body.nama,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Jenis_Kelamin: body.jenisKelamin,
          Pekerjaan: body.pekerjaan,
          Alamat: body.alamat,
          Nama_Anak: body.namaAnak,
          Kota_Anak: body.kotaAnak,
          Tanggal_Lahir_Anak: body.tanggalLahirAnak,
          Jenis_Kelamin_Anak: body.jenisKelaminAnak,
          Kelas_Romawi: body.kelasRomawi,
          Kelas_Huruf: body.kelasHuruf,
          Sekolah: body.sekolah,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "domisili":
        doc.setData({
          Nama: body.nama,
          Jenis_Kelamin: body.jenisKelamin,
          Pekerjaan: body.pekerjaan,
          Alamat: body.alamat,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "kuasa":
        doc.setData({
          Nama_Pemberi: body.namaPemberi,
          Kota_Pemberi: body.kotaPemberi,
          Tanggal_Lahir_Pemberi: body.tanggalLahirPemberi,
          Pekerjaan_Pemberi: body.pekerjaanPemberi,
          NIK_Pemberi: body.nikPemberi,
          Alamat_Pemberi: body.alamatPemberi,
          Nama_Penerima: body.namaPenerima,
          Kota_Penerima: body.kotaPenerima,
          Tanggal_Lahir_Penerima: body.tanggalLahirPenerima,
          Pekerjaan_Penerima: body.pekerjaanPenerima,
          NIK_Penerima: body.nikPenerima,
          Alamat_Penerima: body.alamatPenerima,
          Hubungan: body.hubungan,
          Keperluan: body.keperluan,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "objek":
        doc.setData({
          Nama_Wajib_Pajak: body.namaWajibPajak,
          NOP: body.nop,
          Alamat_Obyek_Pajak: body.alamatObjekPajak,
          Alamat_Wajib_Pajak: body.alamatWajibPajak,
          Luas: body.luas,
          NJOP: body.njop,
          Total_NJOP: `Rp. ${body.totalNJOP}`,
          Tahun_Data_PBB: body.tahunDataPBB,
          Tahun_Belum_Terbit: body.tahunBelumTerbit,
          Tujuan_Pengajuan: body.tujuanPengajuan,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "penghasilan":
        doc.setData({
          Nama: body.nama,
          Kota: body.kota,
          Jenis_Kelamin: body.jenisKelamin,
          Tanggal_Lahir: body.tanggalLahir,
          Pekerjaan: body.pekerjaan,
          NIK: body.nik,
          Alamat: body.alamat,
          Nama_Dusun: body.namaDusun,
          Penghasilan: body.penghasilan,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      case "Surat Keterangan Usaha":
        doc.setData({
          Nama: body.nama,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          NIK: body.nik,
          Jenis_Kelamin: body.jenisKelamin,
          Agama: body.agama,
          Status_Perkawinan: body.statusPerkawinan,
          Alamat: body.alamat,
          Tanggal_Surat: tanggalSurat,
        });
        break;
      default:
        // Fallback for any unhandled cases.
        console.log("Tipe surat tidak memiliki data mapping:", tipe);
    }

    doc.render();

    const buffer = doc.getZip().generate({ type: "nodebuffer" });

    // Dynamically and safely generate the output filename.
    const personName =
      body.nama ||
      body.namaAnak ||
      body.namaSekarang ||
      body.namaPemberi ||
      "dokumen";
    const safePersonName = personName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
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
    console.error("Gagal generate surat:", err);

    let errorMessage = "Gagal generate surat";
    if (err instanceof Error) {
      // Check if it's a docxtemplater error with proper type safety
      if (isDocxTemplaterError(err) && err.properties?.errors) {
        const errorDetails = err.properties.errors
          .map((e: DocxTemplaterErrorProperties) => e.explanation)
          .join(", ");
        errorMessage = `Template error: ${errorDetails}`;
      } else {
        errorMessage = `Server error: ${err.message}`;
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
