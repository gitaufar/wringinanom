// src/app/api/surat/[tipe]/route.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { useParams } from "next/navigation";
import { terbilang } from "angka-menjadi-terbilang";

export async function POST(req: NextRequest) {
  const { tipe } = useParams();
  let pathFile = "";
  switch (tipe) {
    case "anak_kandung":
      pathFile = "A.01.01_Surat_Keterangan_Anak_Kandung_(FINAL).docx";
      break;
    case "beda_identitas":
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
      pathFile = "A.01.08_Surat_Keterangan_Duda_Janda_{FINAL}.docx";
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
    case "usaha":
      pathFile = "C.01.05_Surat_Keterangan_Usaha.docx";
      break;
    default:
      console.log("❌ Tipe surat tidak dikenali");
  }

  try {
    const body = await req.json();

    // Path ke template .docx
    const templatePath = path.join(process.cwd(), "templates", pathFile);
    const content = fs.readFileSync(templatePath, "binary");

    // Load DOCX ke PizZip dan Docxtemplater
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    switch (tipe) {
      case "anak_kandung":
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
          Angka_Str: terbilang(body.angkaNum),
          Nama_Ayah: body.namaAyah,
          Kota_Ayah: body.kotaAyah,
          Tanggal_Lahir_Ayah: body.tanggalLahirAyah,
          Pekerjaan_Ayah: body.pekerjaanAyah,
          Alamat_Ayah: body.alamatAyah,
        });
        break;
      case "beda_identitas":
        doc.setData({
          Nama_Sekarang: body.nama,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          Jenis_Kelamin: body.jenisKelamin,
          Negara: body.negara,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          NIK: body.nik,
          Alamat: body.alamat,
          Nama_Lama: body.namaLama,
        });
        break;
      case "belum_nikah":
        doc.setData({
          Nama: body.nama,
          Kota: body.kota,
          Tanggal_Lahir: body.tanggalLahir,
          No_KK: body.noKK,
          Agama: body.agama,
          NIK: body.nik,
          Alamat: body.alamat,
          Negara: body.kepalaDesa,
          Jenis_Kelamin: body.jenisKelamin,
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
        });
        break;
      case "ditinggal_pasangan":
        doc.setData({
          Nama_1: body.nama1,
          Umur_1: body.umur1,
          Pekerjaan_1: body.pekerjaan1,
          Alamat_1: body.alamat1,
          Status_Pasangan_1: body.statusPasangan1,
          Nama_2: body.nama2,
          Umur_2: body.umur2,
          Pekerjaan_2: body.pekerjaan2,
          Alamat_2: body.alamat2,
          Status_Pasangan_2: body.statusPasangan1,
          Lama_Tahun: body.lamaTahun,
          Lama_Bulan: body.lamaBulan,
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
          Status_Perkawinan: body.statusPerkawinan,
          Negara: body.negara,
          Status: body.status,
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
          Nama_Dok2: body.namaDok2,
        });
        break;
      case "kematian":
        doc.setData({
          Nama: body.nama,
          Nama_OrangTua: body.namaOrangTua,
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
        });
        break;
      case "pindah_tempat":
        doc.setData({
          Nama:body.nama,
          Nama_Orangtua:body.namaOrangtua,
          
        });
        break;
      case "status":
        doc.setData({});
        break;
      case "tidak_diketahui":
        doc.setData({});
        break;
      case "penambahan_anggota":
        doc.setData({});
        break;
      case "pernyataan_kelahiran":
        doc.setData({});
        break;
      case "panggilan":
        doc.setData({});
        break;
      case "tidak_keberatan":
        doc.setData({});
        break;
      case "catatan_kepolisian":
        doc.setData({});
        break;
      case "kehilangan_kepolisian":
        doc.setData({});
        break;
      case "pengantar":
        doc.setData({});
        break;
      case "tidak_mampu":
        doc.setData({});
        break;
      case "wali_nikah":
        doc.setData({});
        break;
      case "wali_murid":
        doc.setData({});
        break;
      case "domisili":
        doc.setData({});
        break;
      case "kuasa":
        doc.setData({});
        break;
      case "objek":
        doc.setData({});
        break;
      case "penghasilan":
        doc.setData({});
        break;
      case "usaha":
        doc.setData({});
        break;
      default:
        console.log("❌ Tipe surat tidak dikenali");
    }

    // Render isi dokumen
    doc.render();

    // Convert ke buffer file
    const buffer = doc.getZip().generate({ type: "nodebuffer" });

    // Return file ke frontend untuk didownload
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=Surat_Keterangan_Beda_Identitas_${body.nama}.docx`,
      },
    });
  } catch (err) {
    console.error("Gagal generate surat:", err);
    return NextResponse.json(
      { error: "Gagal generate surat" },
      { status: 500 }
    );
  }
}

/* contoh pemakaian 
const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/surat/beda_identitas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gagal mengunduh surat.");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "Surat_Keterangan_Beda_Identitas.docx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
*/
