"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import PilihSuratModal from "../modal/PilihSuratModal";
import { usePenduduk } from "../context/PendudukContext";

export default function TabelKependudukan() {
  const router = useRouter();
  const { data, loading, totalPages, totalData, page, setPage, refetch } =
    usePenduduk();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNik, setSelectedNik] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((d) =>
      [d.nik, d.nama_lengkap, d.alamat].some((val) =>
        val?.toLowerCase().includes(q)
      )
    );
  }, [data, search]);

  const handleDelete = async (nik: string): Promise<void> => {
    const confirmDelete = confirm("Yakin ingin menghapus?");
    if (!confirmDelete) return;

    try {
      await fetch(`/api/penduduk/${nik}`, { method: "DELETE" });
      refetch();
    } catch (err) {
      console.error("Gagal menghapus data:", err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Cari NIK / Nama / Alamat"
          className="border px-3 py-2 rounded w-full max-w-sm text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="min-w-[800px] bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "NIK",
                "Nama",
                "Jenis Kelamin",
                "Tanggal Lahir",
                "Alamat",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  Data tidak ditemukan
                </td>
              </tr>
            ) : (
              filteredData.map((d) => (
                <tr key={d.nik} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-700">{d.nik}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {d.nama_lengkap}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {d.jenis_kelamin}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {d.tanggal_lahir
                      ? format(new Date(d.tanggal_lahir), "dd-MM-yyyy")
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {d.alamat}
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() =>
                        router.push(`/admin/kependudukan/edit/${d.nik}`)
                      }
                      className="p-2 rounded hover:bg-gray-100"
                      title="Edit"
                    >
                      <FiEdit className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => void handleDelete(d.nik)}
                      className="p-2 rounded hover:bg-red-50"
                      title="Hapus"
                    >
                      <FiTrash2 className="text-red-500" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedNik(d.nik);
                        setModalOpen(true);
                      }}
                      className="p-2 rounded hover:bg-blue-50"
                      title="Buat Surat"
                    >
                      <FiPlus className="text-blue-600" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {!loading && data.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              Menampilkan {(page - 1) * 10 + 1}–{(page - 1) * 10 + data.length}{" "}
              dari {totalData}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(Math.max(page - 1, 1))}
                disabled={page === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                <FiChevronLeft />
              </button>
              <span>
                Halaman <strong>{page}</strong> / {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {modalOpen && selectedNik && (
        <PilihSuratModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSelect={(jenis) => {
            // Replace this with actual route to create a letter
            router.push(`/admin/surat/baru?nik=${selectedNik}&jenis=${jenis}`);
          }}
        />
      )}
    </div>
  );
}
