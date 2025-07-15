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
          Kota_Tanggal: body.kotaTanggal,
          Jenis_Kelamin: body.jenisKelamin,
          Negara: body.negara,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          NIK: body.nik,
          Alamat: body.alamat,
          Nama_Lama: body.namaLama,
          Tanggal: body.tanggal,
          Nama_Kepala_Desa: body.kepalaDesa,
        });
        break;
      case "belum_nikah":
        doc.setData({
          Nama_Sekarang: body.nama,
          Kota_Tanggal: body.kotaTanggal,
          Jenis_Kelamin: body.jenisKelamin,
          Negara: body.negara,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          NIK: body.nik,
          Alamat: body.alamat,
          Nama_Lama: body.namaLama,
          Tanggal: body.tanggal,
          Nama_Kepala_Desa: body.kepalaDesa,
        });
        break;
      case "biodata_penduduk":
        doc.setData({
          Nama_Sekarang: body.nama,
          Kota_Tanggal: body.kotaTanggal,
          Jenis_Kelamin: body.jenisKelamin,
          Negara: body.negara,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          NIK: body.nik,
          Alamat: body.alamat,
          Nama_Lama: body.namaLama,
          Tanggal: body.tanggal,
          Nama_Kepala_Desa: body.kepalaDesa,
        });
        break;
      case "cerai_mati":
        doc.setData({
          Nama_Sekarang: body.nama,
          Kota_Tanggal: body.kotaTanggal,
          Jenis_Kelamin: body.jenisKelamin,
          Negara: body.negara,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          NIK: body.nik,
          Alamat: body.alamat,
          Nama_Lama: body.namaLama,
          Tanggal: body.tanggal,
          Nama_Kepala_Desa: body.kepalaDesa,
        });
        break;
      case "ditinggal_pasangan":
        doc.setData({
          Nama_Sekarang: body.nama,
          Kota_Tanggal: body.kotaTanggal,
          Jenis_Kelamin: body.jenisKelamin,
          Negara: body.negara,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          NIK: body.nik,
          Alamat: body.alamat,
          Nama_Lama: body.namaLama,
          Tanggal: body.tanggal,
          Nama_Kepala_Desa: body.kepalaDesa,
        });
        break;
      case "duda_janda":
        doc.setData({
          Nama_Sekarang: body.nama,
          Kota_Tanggal: body.kotaTanggal,
          Jenis_Kelamin: body.jenisKelamin,
          Negara: body.negara,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          NIK: body.nik,
          Alamat: body.alamat,
          Nama_Lama: body.namaLama,
          Tanggal: body.tanggal,
          Nama_Kepala_Desa: body.kepalaDesa,
        });
        break;
      case "identitas":
        doc.setData({
          Nama_Sekarang: body.nama,
          Kota_Tanggal: body.kotaTanggal,
          Jenis_Kelamin: body.jenisKelamin,
          Negara: body.negara,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          NIK: body.nik,
          Alamat: body.alamat,
          Nama_Lama: body.namaLama,
          Tanggal: body.tanggal,
          Nama_Kepala_Desa: body.kepalaDesa,
        });
        break;
      case "kematian":
        doc.setData({
          Nama_Sekarang: body.nama,
          Kota_Tanggal: body.kotaTanggal,
          Jenis_Kelamin: body.jenisKelamin,
          Negara: body.negara,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          NIK: body.nik,
          Alamat: body.alamat,
          Nama_Lama: body.namaLama,
          Tanggal: body.tanggal,
          Nama_Kepala_Desa: body.kepalaDesa,
        });
        break;
      case "pindah_tempat":
        doc.setData({
          Nama_Sekarang: body.nama,
          Kota_Tanggal: body.kotaTanggal,
          Jenis_Kelamin: body.jenisKelamin,
          Negara: body.negara,
          Agama: body.agama,
          Pekerjaan: body.pekerjaan,
          NIK: body.nik,
          Alamat: body.alamat,
          Nama_Lama: body.namaLama,
          Tanggal: body.tanggal,
          Nama_Kepala_Desa: body.kepalaDesa,
        });
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
        pathFile =
          "A.04.02_Surat_Keterangan_Kehilangan_Kepolisian_(FINAL).docx";
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
