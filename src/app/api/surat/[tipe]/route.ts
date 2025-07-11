import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Path ke template .docx
    const templatePath = path.join(process.cwd(), "templates", "surat_keterangan_beda_identitas.docx");
    const content = fs.readFileSync(templatePath, "binary");

    // Load DOCX ke PizZip dan Docxtemplater
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    // Data dari user (nama, alamat, dll)
    doc.setData({
      Nama: body.nama,
      Kota_Tanggal: body.kotaTanggal,
      Jenis_Kelamin: body.jenisKelamin,
      Negara: body.negara,
      Agama: body.agama,
      Pekerjaan: body.pekerjaan,
      NIK: body.nik,
      Alamat: body.alamat,
      Nama_Dipakai: body.namaDipakai,
      Nama_Alias: body.namaAlias,
      Tanggal: body.tanggal,
      Nama_Kepala_Desa: body.kepalaDesa,
    });

    // Render isi dokumen
    doc.render();

    // Convert ke buffer file
    const buffer = doc.getZip().generate({ type: "nodebuffer" });

    // Return file ke frontend untuk didownload
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=Surat_Keterangan_Beda_Identitas.docx`,
      },
    });
  } catch (err) {
    console.error("Gagal generate surat:", err);
    return NextResponse.json({ error: "Gagal generate surat" }, { status: 500 });
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