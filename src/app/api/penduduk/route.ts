// src/app/api/penduduk/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const penduduk = await prisma.penduduk.findMany();
    return NextResponse.json(penduduk);
  } catch (error) {
    console.error("Failed to fetch penduduk:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      nik,
      no_kk,
      nama_lengkap,
      nama_ibu,
      nama_ayah,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      alamat,
      rt,
      rw,
      pekerjaan,
      agama,
    } = data;

    if (!nik || !no_kk || !nama_lengkap || !jenis_kelamin || !tempat_lahir || !tanggal_lahir || !alamat || !rt || !rw) {
      return NextResponse.json({ error: "Data wajib tidak lengkap" }, { status: 400 });
    }

    const existing = await prisma.penduduk.findUnique({
      where: { nik },
    });

    if (existing) {
      // 🔄 Update existing penduduk
      const updated = await prisma.penduduk.update({
        where: { nik },
        data: {
          no_kk,
          nama_lengkap,
          nama_ibu,
          nama_ayah,
          jenis_kelamin,
          tempat_lahir,
          tanggal_lahir: new Date(tanggal_lahir),
          alamat,
          rt,
          rw,
          pekerjaan,
          agama,
        },
      });

      return NextResponse.json({ message: "✅ Data penduduk diperbarui", penduduk: updated });
    } else {
      // ➕ Tambah penduduk baru
      const created = await prisma.penduduk.create({
        data: {
          nik,
          no_kk,
          nama_lengkap,
          nama_ibu,
          nama_ayah,
          jenis_kelamin,
          tempat_lahir,
          tanggal_lahir: new Date(tanggal_lahir),
          alamat,
          rt,
          rw,
          pekerjaan,
          agama,
        },
      });

      return NextResponse.json({ message: "✅ Penduduk berhasil ditambahkan", penduduk: created });
    }
  } catch (error: any) {
    console.error("❌ Error tambah/update penduduk:", error);
    return NextResponse.json({ error: "Gagal menambah atau memperbarui penduduk" }, { status: 500 });
  }
}
