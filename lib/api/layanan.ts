// Define interfaces for API responses
interface RiwayatLayanan {
  no_resi: string;
  nik: string;
  keterangan: string;
  tanggal_dibuat: string;
  status?: string;
}

interface TambahRiwayatResponse {
  success: boolean;
  message?: string;
  riwayat: RiwayatLayanan;
}

interface ErrorResponse {
  error: string;
  message?: string;
}

export const tambahRiwayatLayanan = async (
  nik: string, 
  keterangan: string
): Promise<TambahRiwayatResponse> => {
  try {
    const res = await fetch("/api/layanan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nik, keterangan }),
    });

    const data = await res.json() as TambahRiwayatResponse | ErrorResponse;

    if (!res.ok) {
      const errorData = data as ErrorResponse;
      throw new Error(errorData.error || "Gagal menambahkan riwayat");
    }

    return data as TambahRiwayatResponse; // biasanya berisi { riwayat: { no_resi, ... } }
  } catch (err: unknown) {
    console.error("Error saat POST:", err);

    if (err instanceof Error) {
      throw new Error(err.message || "Terjadi kesalahan");
    }

    throw new Error("Terjadi kesalahan tak dikenal");
  }
};