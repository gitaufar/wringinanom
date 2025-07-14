"use client";
import { useEffect, useState } from "react";
import ButtonAction from "../button/ButtonAction";
import { format } from "date-fns";
import { Penduduk } from "@prisma/client";
import { useRouter } from "next/navigation";

const LIMIT = 10;

const TabelKependudukan = () => {
  const router = useRouter();

  const [dataPenduduk, setDataPenduduk] = useState<Penduduk[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const fetchPenduduk = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/penduduk?page=${page}&limit=${LIMIT}`);
      const json = await res.json();
      setDataPenduduk(json.data);
      setTotalPages(json.totalPages);
      setTotalData(json.totalData);
    } catch (err) {
      console.error("Gagal fetch penduduk:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (nik: string) => {
    const confirmed = window.confirm("Yakin ingin menghapus penduduk ini?");
    if (!confirmed) return;

    try {
      await fetch(`/api/penduduk/${nik}`, { method: "DELETE" });
      fetchPenduduk(page);
    } catch (err) {
      console.error("Gagal menghapus penduduk:", err);
    }
  };

  useEffect(() => {
    fetchPenduduk(page);
  }, [page]);

  return (
    <div className="bg-white rounded-xl border px-5 py-4 mt-0">
      <table className="w-full text-sm text-left">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-3 px-4">NIK</th>
            <th className="py-3 px-4">NAMA</th>
            <th className="py-3 px-4">JENIS KELAMIN</th>
            <th className="py-3 px-4">TANGGAL LAHIR</th>
            <th className="py-3 px-4">ALAMAT</th>
            <th className="py-3 px-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="py-4 px-4 text-center">
                Loading...
              </td>
            </tr>
          ) : dataPenduduk.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-4 px-4 text-center">
                Tidak ada data penduduk
              </td>
            </tr>
          ) : (
            dataPenduduk.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-4 align-middle">{item.nik}</td>
                <td className="py-4 px-4 align-middle">{item.nama_lengkap}</td>
                <td className="py-4 px-4 align-middle">{item.jenis_kelamin}</td>
                <td className="py-4 px-4 align-middle">
                  {format(new Date(item.tanggal_lahir), "dd-MM-yyyy")}
                </td>
                <td className="py-4 px-4 align-middle">{item.alamat}</td>
                <td className="py-4 px-4 align-middle">
                  <ButtonAction
                    editData={() => {
                      router.push(`/admin/kependudukan/edit/${item.nik}`);
                    }}
                    deleteData={() => handleDelete(item.nik)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Info jumlah dan navigasi halaman */}
      {!loading && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div>
            Menampilkan {(page - 1) * LIMIT + 1} -{" "}
            {(page - 1) * LIMIT + dataPenduduk.length} dari {totalData}
          </div>

          <div className="space-x-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              ⬅️ Sebelumnya
            </button>
            <span>
              Halaman {page} dari {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Berikutnya ➡️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabelKependudukan;
