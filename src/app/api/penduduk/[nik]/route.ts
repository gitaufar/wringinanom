import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest, 
  props: { params: Promise<{ nik: string }> }
): Promise<NextResponse> {
  try {
    const params = await props.params;
    const { nik } = params;

    // Validate NIK parameter
    if (!nik || typeof nik !== 'string') {
      return NextResponse.json(
        { error: "NIK parameter is required and must be a string" }, 
        { status: 400 }
      );
    }

    const penduduk = await prisma.penduduk.findUnique({
      where: { nik },
    });

    if (!penduduk) {
      return NextResponse.json(
        { error: "Penduduk tidak ditemukan" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(penduduk);
  } catch (error) {
    console.error("Gagal mengambil data penduduk:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest, 
  props: { params: Promise<{ nik: string }> }
): Promise<NextResponse> {
  try {
    const params = await props.params;
    const { nik } = params;

    // Validate NIK parameter
    if (!nik || typeof nik !== 'string') {
      return NextResponse.json(
        { error: "NIK parameter is required and must be a string" }, 
        { status: 400 }
      );
    }

    const existing = await prisma.penduduk.findUnique({
      where: { nik },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Penduduk tidak ditemukan" }, 
        { status: 404 }
      );
    }

    await prisma.penduduk.delete({
      where: { nik },
    });

    return NextResponse.json({ 
      message: "Penduduk berhasil dihapus",
      success: true 
    });
  } catch (error) {
    console.error("Gagal menghapus penduduk:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" }, 
      { status: 500 }
    );
  }
}