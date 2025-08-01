import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Type definition for the request body
type PendudukUpdateData = {
  nik?: string;
  no_kk?: string;
  nama_lengkap?: string;
  nama_ibu?: string;
  nama_ayah?: string;
  jenis_kelamin?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  agama?: string;
  pendidikan?: string;
  pekerjaan?: string;
  status_perkawinan?: string;
  tanggal_perkawinan?: string;
  status_keluarga?: string;
  alamat?: string;
  rt?: string | number;
  rw?: string | number;
};

// Type guard to validate request body
const isPendudukUpdateData = (data: unknown): data is PendudukUpdateData => {
  return typeof data === "object" && data !== null;
};

// Helper function to safely parse date
const parseDate = (dateString: unknown): Date | undefined => {
  if (typeof dateString === "string" && dateString.trim() !== "") {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? undefined : date;
  }
  return undefined;
};

// Helper function to safely parse integer
const parseInteger = (value: unknown): number | undefined => {
  if (typeof value === "number") return Math.floor(value);
  if (typeof value === "string") {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
};

// GET penduduk by NIK
export async function GET(
  req: NextRequest,
  props: { params: Promise<{ nik: string }> }
): Promise<NextResponse> {
  try {
    const params = await props.params;
    const { nik } = params;

    if (!nik || typeof nik !== "string") {
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

// PUT penduduk by NIK
export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ nik: string }> }
): Promise<NextResponse> {
  try {
    const params = await props.params;
    const { nik } = params;

    // Parse and validate request body
    const rawBody: unknown = await req.json();

    if (!isPendudukUpdateData(rawBody)) {
      return NextResponse.json(
        { error: "Invalid request body format" },
        { status: 400 }
      );
    }

    const body: PendudukUpdateData = rawBody;

    if (!nik || typeof nik !== "string") {
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

    // Safely parse dates and numbers
    const tanggalLahir = parseDate(body.tanggal_lahir);
    const tanggalPerkawinan = body.tanggal_perkawinan
      ? parseDate(body.tanggal_perkawinan)
      : null;
    const rt = parseInteger(body.rt);
    const rw = parseInteger(body.rw);

    // Build update data with proper types
    const updateData: Record<string, unknown> = {
      ...body,
      ...(tanggalLahir && { tanggal_lahir: tanggalLahir }),
      tanggal_perkawinan: tanggalPerkawinan,
      ...(rt !== undefined && { rt }),
      ...(rw !== undefined && { rw }),
    };

    const updated = await prisma.penduduk.update({
      where: { nik },
      data: updateData,
    });

    return NextResponse.json({
      message: "✅ Data penduduk berhasil diperbarui",
      penduduk: updated,
    });
  } catch (error) {
    console.error("Gagal memperbarui data penduduk:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memperbarui data" },
      { status: 500 }
    );
  }
}

// DELETE penduduk by NIK
export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ nik: string }> }
): Promise<NextResponse> {
  try {
    const params = await props.params;
    const { nik } = params;

    if (!nik || typeof nik !== "string") {
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
      success: true,
    });
  } catch (error) {
    console.error("Gagal menghapus penduduk:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
