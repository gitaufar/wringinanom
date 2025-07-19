export async function loginAdmin(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text(); // baca sebagai text terlebih dahulu

  if (!res.ok) {
    // cek apakah text tidak kosong, baru parse
    const data = text ? JSON.parse(text) : null;
    throw new Error(data?.error || "Login gagal");
  }

  return text ? JSON.parse(text) : {}; // response sukses, pastikan ada isi juga
}

export async function fetchPenduduk() {
  const res = await fetch("/api/penduduk");

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Gagal mengambil data penduduk");
  }

  return res.json();
}

export async function fetchPendudukByNik(nik: string) {
  const res = await fetch(`/api/penduduk/${nik}`);

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Gagal mengambil data penduduk");
  }

  return res.json();
}

export async function logoutAdmin() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Logout gagal");
  }

  return res.json();
}


