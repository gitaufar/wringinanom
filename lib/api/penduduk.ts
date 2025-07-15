export async function getPendudukByNik(nik: string) {
  try {
    const res = await fetch(`/api/penduduk/${nik}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Gagal mengambil data penduduk");
    }

    return data;
  } catch (error) {
    console.error("Fetch penduduk error:", error);
    throw error;
  }
}

export async function getPenduduk() {
  try {
    const res = await fetch("/api/penduduk");

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Gagal mengambil data penduduk");
    }

    return data;
  } catch (error) {
    console.error("Fetch penduduk error:", error);
    throw error;
  }
}