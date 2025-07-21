"use client";

import { useEffect, useState } from "react";
import StatusCard from "../../components/card/StatusCard";
import { FaEye, FaTrashAlt } from "react-icons/fa";

type DataRiwayat = {
  no_resi: string;
  date: string;
  tipe: string;
  keterangan: string;
  status: "Menunggu" | "Selesai" | "Dibatalkan";
  penduduk: {
    nama_lengkap: string;
  };
};

type TabelRiwayatPermohonanProps = {
  change: boolean;
};

const TabelRiwayatPermohonan = ({ change }: TabelRiwayatPermohonanProps) => {
  const [dataRiwayat, setDataRiwayat] = useState<DataRiwayat[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedResi, setSelectedResi] = useState<string | null>(null);

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const res = await fetch("/api/layanan");
        const json = await res.json();

        if (Array.isArray(json)) {
          const filtered = json.filter(
            (item: any) => item.status?.toLowerCase() !== "menunggu"
          );

          const mappedData: DataRiwayat[] = filtered.map((item: any) => ({
            no_resi: item.no_resi,
            date: item.date,
            tipe: item.tipe,
            keterangan: item.keterangan,
            status: item.status,
            penduduk: {
              nama_lengkap: item.penduduk?.nama_lengkap ?? "Tidak diketahui",
            },
          }));

          setDataRiwayat(mappedData);
        } else {
          console.error("Response bukan array:", json);
        }
      } catch (error) {
        console.error("Gagal fetch data dari /api/layanan:", error);
      }
    };

    fetchRiwayat();
  }, [change]);

  const handleDeleteConfirm = (noResi: string) => {
    setSelectedResi(noResi);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!selectedResi) return;

    try {
      const res = await fetch(`/api/layanan/${selectedResi}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal menghapus riwayat");
      }

      setDataRiwayat((prev) =>
        prev.filter((item) => item.no_resi !== selectedResi)
      );
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus riwayat.");
      console.error("Gagal hapus riwayat:", error);
    } finally {
      setShowConfirmModal(false);
      setSelectedResi(null);
    }
  };

  return (
    <div className="relative">
      {/* TABEL */}
      <div className="bg-white rounded-xl shadow-sm mt-4 overflow-x-auto">
        {dataRiwayat.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Belum ada riwayat permohonan surat.
          </p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="text-left bg-[#F9FAFB] border-b">
              <tr>
                <th className="px-6 py-3 font-semibold">NO RESI</th>
                <th className="px-6 py-3 font-semibold">NAMA</th>
                <th className="px-6 py-3 font-semibold">TANGGAL PERMINTAAN</th>
                <th className="px-6 py-3 font-semibold">JENIS SURAT</th>
                <th className="px-6 py-3 font-semibold">ACTION</th>
                <th className="px-6 py-3 font-semibold">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {dataRiwayat.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{row.no_resi}</td>
                  <td className="px-6 py-4">{row.penduduk?.nama_lengkap}</td>
                  <td className="px-6 py-4">
                    {new Date(row.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">{row.tipe}</td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button className="hover:text-blue-700">
                      <FaEye size={16} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteConfirm(row.no_resi)}
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <StatusCard status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 ">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Konfirmasi Hapus
            </h2>
            <p className="text-sm mb-4 text-center">
              Apakah Anda yakin ingin menghapus riwayat dengan nomor resi:{" "}
              <span className="font-medium">{selectedResi}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabelRiwayatPermohonan;
