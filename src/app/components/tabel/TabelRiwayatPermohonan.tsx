"use client";

import { JSX, useEffect, useState } from "react";
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

const TabelRiwayatPermohonan = ({
  change,
}: TabelRiwayatPermohonanProps): JSX.Element => {
  const [dataRiwayat, setDataRiwayat] = useState<DataRiwayat[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedResi, setSelectedResi] = useState<string | null>(null);

  useEffect(() => {
    const fetchRiwayat = async (): Promise<void> => {
      try {
        const res = await fetch("/api/layanan");
        const json: unknown = await res.json();

        if (Array.isArray(json)) {
          const filtered = json.filter(
            (item): item is DataRiwayat =>
              typeof item === "object" &&
              item !== null &&
              (item as DataRiwayat).status?.toLowerCase() !== "menunggu"
          );

          const mappedData: DataRiwayat[] = filtered.map((item) => ({
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

    void fetchRiwayat();
  }, [change]);

  const handleDeleteConfirm = (noResi: string): void => {
    setSelectedResi(noResi);
    setShowConfirmModal(true);
  };

  const handleDelete = async (): Promise<void> => {
    if (!selectedResi) return;

    try {
      const res = await fetch(`/api/layanan/${selectedResi}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err: unknown = await res.json();
        const message =
          typeof err === "object" && err !== null && "error" in err
            ? String((err as { error: unknown }).error)
            : "Gagal menghapus riwayat";
        throw new Error(message);
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
      <div className="bg-white rounded-xl shadow-sm mt-4 overflow-x-auto">
        {dataRiwayat.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Belum ada riwayat permohonan surat.
          </p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-[#F9FAFB] text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-4 text-left font-medium">NO RESI</th>
                <th className="px-6 py-4 text-left font-medium">NAMA</th>
                <th className="px-6 py-4 text-left font-medium">TANGGAL PERMINTAAN</th>
                <th className="px-6 py-4 text-left font-medium">JENIS SURAT</th>
                <th className="px-6 py-4 text-left font-medium">ACTION</th>
                <th className="px-6 py-4 text-left font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dataRiwayat.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{row.no_resi}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.penduduk.nama_lengkap}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(row.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.tipe}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusCard status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 ">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Konfirmasi Hapus
            </h2>
            <p className="text-sm mb-4 text-center">
              Apakah Anda yakin ingin menghapus riwayat dengan nomor resi: <span className="font-medium">{selectedResi}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={() => void handleDelete()}
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