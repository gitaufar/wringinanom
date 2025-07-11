"use client";

import { useEffect, useState } from "react";

type Permohonan = {
  id: string;
  no_resi: string;
  jenis_surat: string;
  penduduk: {
    nama_lengkap: string;
  };
  riwayat: {
    status: string;
  };
};

export const TabelPermohonan = () => {
  const [data, setData] = useState<Permohonan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const adminId = 1; // sementara hardcoded

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/permohonan");
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal mengambil data");
      setData(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (no_resi: string, status_baru: string) => {
    try {
      const res = await fetch("/api/permohonan/status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          no_resi,
          admin_id: adminId,
          status_baru,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal mengubah status");

      alert(`✅ Status diubah menjadi "${status_baru}"`);
      fetchData(); // Refresh data
    } catch (err: any) {
      alert("❌ Gagal: " + err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Tabel Permohonan Surat</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && data.length === 0 && <p>Tidak ada data ditemukan.</p>}

      {!loading && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">No Resi</th>
                <th className="border px-4 py-2">Nama Pelapor</th>
                <th className="border px-4 py-2">Jenis Surat</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Ubah Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{item.no_resi}</td>
                  <td className="border px-4 py-2">{item.penduduk?.nama_lengkap ?? "-"}</td>
                  <td className="border px-4 py-2">{item.jenis_surat}</td>
                  <td className="border px-4 py-2">{item.riwayat?.status ?? "-"}</td>
                  <td className="border px-4 py-2 space-x-1">
                    <button
                      onClick={() => handleStatusChange(item.no_resi, "Selesai")}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.no_resi, "Ditolak")}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
