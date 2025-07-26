// Define interfaces for API responses
interface PendudukData {
  nik: string;
  no_kk: string;
  nama_lengkap?: string;
  nama_ibu?: string;
  nama_ayah?: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  agama: string;
  pendidikan: string;
  pekerjaan?: string;
  status_perkawinan: string;
  tanggal_perkawinan?: string;
  status_keluarga: string;
  alamat: string;
  rt: string;
  rw: string;
}

interface ErrorResponse {
  error: string;
  message?: string;
}

export async function getPendudukByNik(nik: string): Promise<PendudukData> {
  try {
    const res = await fetch(`/api/penduduk/${nik}`);

    const data = await res.json() as PendudukData | ErrorResponse;

    if (!res.ok) {
      const errorData = data as ErrorResponse;
      throw new Error(errorData.error || "Gagal mengambil data penduduk");
    }

    return data as PendudukData;
  } catch (error: unknown) {
    console.error("Fetch penduduk error:", error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error("Terjadi kesalahan tak dikenal");
  }
}

export async function getPenduduk(): Promise<PendudukData[]> {
  try {
    const res = await fetch("/api/penduduk");

    const data = await res.json() as PendudukData[] | ErrorResponse;

    if (!res.ok) {
      const errorData = data as ErrorResponse;
      throw new Error(errorData.error || "Gagal mengambil data penduduk");
    }

    return data as PendudukData[];
  } catch (error: unknown) {
    console.error("Fetch penduduk error:", error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error("Terjadi kesalahan tak dikenal");
  }
}