// src/app/api/penduduk/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.penduduk.findMany({
        skip,
        take: limit,
        orderBy: { nama_lengkap: "asc" }, // optional: urutkan berdasarkan nama
      }),
      prisma.penduduk.count(),
    ]);

    return NextResponse.json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalData: total,
      data,
    });
  } catch (error) {
    console.error("Failed to fetch penduduk with pagination:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
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
      agama,
      pendidikan,
      pekerjaan,
      golongan_darah,
      status_perkawinan,
      tanggal_perkawinan,
      status_keluarga,
      alamat,
      rt,
      rw,
    } = data;

    if (
      !nik ||
      !no_kk ||
      !nama_lengkap ||
      !jenis_kelamin ||
      !tempat_lahir ||
      !tanggal_lahir ||
      !agama ||
      !pendidikan ||
      !status_keluarga ||
      !status_perkawinan ||
      !alamat ||
      !rt ||
      !rw ||
      !golongan_darah
    ) {
      return NextResponse.json(
        { error: "Data wajib tidak lengkap" },
        { status: 400 }
      );
    }

    const existing = await prisma.penduduk.findUnique({
      where: { nik },
    });

    if (existing) {
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
          agama,
          pendidikan,
          pekerjaan,
          golongan_darah,
          status_perkawinan,
          tanggal_perkawinan: tanggal_perkawinan
            ? new Date(tanggal_perkawinan)
            : null,
          status_keluarga,
          alamat,
          rt: parseInt(rt),
          rw: parseInt(rw),
        },
      });

      return NextResponse.json({
        message: "✅ Data penduduk diperbarui",
        penduduk: updated,
      });
    } else {
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
          agama,
          pendidikan,
          pekerjaan,
          golongan_darah,
          status_perkawinan,
          tanggal_perkawinan: tanggal_perkawinan
            ? new Date(tanggal_perkawinan)
            : null,
          status_keluarga,
          alamat,
          rt: parseInt(rt),
          rw: parseInt(rw),
        },
      });

      return NextResponse.json({
        message: "✅ Penduduk berhasil ditambahkan",
        penduduk: created,
      });
    }
  } catch (error: any) {
    console.error("❌ Error tambah/update penduduk:", error);
    return NextResponse.json(
      { error: "Gagal menambah atau memperbarui penduduk" },
      { status: 500 }
    );
  }
}
