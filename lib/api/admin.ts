// Define proper interfaces for API responses
interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

interface ErrorResponse {
  error: string;
  message?: string;
}

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

interface LogoutResponse {
  success: boolean;
  message?: string;
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text(); // baca sebagai text terlebih dahulu

  if (!res.ok) {
    // cek apakah text tidak kosong, baru parse
    const data: ErrorResponse = text
      ? (JSON.parse(text) as ErrorResponse)
      : { error: "Login gagal" };
    throw new Error(data.error || "Login gagal");
  }

  return text ? (JSON.parse(text) as LoginResponse) : { success: false }; // response sukses, pastikan ada isi juga
}

export async function fetchPenduduk(): Promise<PendudukData[]> {
  const res = await fetch("/api/penduduk");

  if (!res.ok) {
    const data = (await res.json()) as ErrorResponse;
    throw new Error(data.error || "Gagal mengambil data penduduk");
  }

  return res.json() as Promise<PendudukData[]>;
}

export async function fetchPendudukByNik(nik: string): Promise<PendudukData> {
  const res = await fetch(`/api/penduduk/${nik}`);

  if (!res.ok) {
    const data = (await res.json()) as ErrorResponse;
    throw new Error(data.error || "Gagal mengambil data penduduk");
  }

  return res.json() as Promise<PendudukData>;
}

export async function logoutAdmin(): Promise<LogoutResponse> {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!res.ok) {
    const data = (await res.json()) as ErrorResponse;
    throw new Error(data.error || "Logout gagal");
  }

  return res.json() as Promise<LogoutResponse>;
}
