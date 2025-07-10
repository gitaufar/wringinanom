export const tambahRiwayatLayanan = async (nik: string, keterangan: string) => {
  try {
    const res = await fetch("/api/layanan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nik, keterangan }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Gagal menambahkan riwayat");
    }

    return data; // biasanya berisi { riwayat: { no_resi, ... } }
  } catch (err: any) {
    console.error("Error saat POST:", err);
    throw new Error(err.message || "Terjadi kesalahan");
  }
};
