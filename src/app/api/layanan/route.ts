// src/app/api/layanan/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

// Type untuk response data dari query

// Type untuk where clause
type WhereClause = {
  date?: {
    gte: Date;
    lt: Date;
  };
  status?:
    | {
        not: string;
      }
    | string;
  OR?: Array<{
    no_resi?: {
      contains: string;
      mode: Prisma.QueryMode;
    };
    penduduk?: {
      nama_lengkap?: {
        contains: string;
        mode: Prisma.QueryMode;
      };
    };
  }>;
};

// First, update your type definitions
// First, update your type definitions
type LayananApiResponse = {
  no_resi: string;
  date: Date;
  tipe: string;
  keterangan: string;
  status: string;
  penduduk: {
    nik: string;
    nama_lengkap: string | null;
    // ... other penduduk fields
  };
  // Optional fields from permohonansurat
  data_dinamis?: JsonValue | null;
  no_wa?: string | null;
  nik?: string | null;
  // Extra fields for backward compatibility
  extra_data_dinamis?: JsonValue | null;
  extra_no_wa?: string | null;
  extra_nik?: string | null;
};

type PaginationResponse = {
  data: LayananApiResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

// Updated API handler
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date"); // Format: YYYY-MM-DD
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const searchParam = searchParams.get("search"); // Untuk pencarian nama/no_resi
    const statusParam = searchParams.get("status"); // Filter status
    const excludeMenunggu = searchParams.get("exclude_menunggu"); // Parameter untuk exclude menunggu

    // Default pagination values
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    const skip = (page - 1) * limit;

    // Validate pagination parameters
    if (page < 1) {
      return NextResponse.json(
        { error: "Page harus lebih besar dari 0" },
        { status: 400 }
      );
    }

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Limit harus antara 1-100" },
        { status: 400 }
      );
    }

    // Build where clause
    const whereClause: WhereClause = {};

    // Filter by date
    if (dateParam) {
      const startDate = new Date(dateParam);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      whereClause.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    // Handle status filtering - exclude "Menunggu" by default for riwayat
    if (
      statusParam &&
      ["Menunggu", "Selesai", "Dibatalkan"].includes(statusParam)
    ) {
      // If specific status is requested, use that
      whereClause.status = statusParam;
    } else if (excludeMenunggu === "true") {
      // If no specific status but exclude_menunggu is true, exclude "Menunggu"
      whereClause.status = {
        not: "Menunggu",
      };
    }

    // Search by nama or no_resi
    if (searchParam) {
      whereClause.OR = [
        {
          no_resi: {
            contains: searchParam,
            mode: "insensitive",
          },
        },
        {
          penduduk: {
            nama_lengkap: {
              contains: searchParam,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    // Get total count for pagination (after filtering)
    const total = await prisma.riwayatlayanan.count({
      where: whereClause,
    });

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // Get paginated data (after filtering)
    const riwayatlayanan = await prisma.riwayatlayanan.findMany({
      where: whereClause,
      include: {
        penduduk: true,
        permohonansurat: {
          select: {
            data_dinamis: true,
            no_wa: true,
            nik: true,
          },
        },
      },
      orderBy: {
        date: "desc", // Order by latest first
      },
      skip,
      take: limit,
    });

    // Transform data with proper type handling
    const transformedData: LayananApiResponse[] = riwayatlayanan.map((item) => {
      const baseData = {
        no_resi: item.no_resi,
        date: item.date,
        tipe: item.tipe,
        keterangan: item.keterangan,
        status: item.status,
        data_dinamis: item.data_dinamis,
        no_wa: item.no_wa,
        penduduk: item.penduduk,
      };

      // Add optional fields with proper null handling
      const optionalFields: Partial<LayananApiResponse> = {};

      if (item.permohonansurat) {
        optionalFields.data_dinamis = item.permohonansurat.data_dinamis;
        optionalFields.no_wa = item.permohonansurat.no_wa;
        optionalFields.nik = item.permohonansurat.nik;

        // Keep extra_ fields for backward compatibility
        optionalFields.extra_data_dinamis = item.permohonansurat.data_dinamis;
        optionalFields.extra_no_wa = item.permohonansurat.no_wa;
        optionalFields.extra_nik = item.permohonansurat.nik;
      }

      return {
        ...baseData,
        ...optionalFields,
      };
    });

    // Check if this is a simple date-based request (like from Dashboard)
    // If no pagination params and has date param, return simple array format
    if (
      dateParam &&
      !pageParam &&
      !limitParam &&
      !searchParam &&
      !excludeMenunggu
    ) {
      // For Dashboard compatibility, return just the data array
      return NextResponse.json(transformedData);
    }

    // Otherwise return full pagination response
    const response: PaginationResponse = {
      data: transformedData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to fetch riwayat layanan:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const noResi = searchParams.get("no_resi");

    if (!noResi) {
      return NextResponse.json(
        { error: "no_resi wajib disertakan" },
        { status: 400 }
      );
    }

    const existing = await prisma.riwayatlayanan.findUnique({
      where: { no_resi: noResi },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    await prisma.riwayatlayanan.delete({
      where: { no_resi: noResi },
    });

    return NextResponse.json({ message: "Riwayat layanan berhasil dihapus" });
  } catch (error) {
    console.error("Gagal hapus riwayat:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghapus data" },
      { status: 500 }
    );
  }
}
